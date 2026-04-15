// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, query, where, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';

// Этот компонент принимает adId (ID объявления) и adOwnerId (ID владельца объявления)
const Chat = ({ adId, adOwnerId }) => {
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const currentUser = auth.currentUser;

    useEffect(() => {
        if (!adId || !currentUser) return;

        // Создаем уникальный ID для чата между текущим пользователем и владельцем объявления
        // В реальном приложении это должно быть более надежно (например, сортировка ID пользователей)
        const chatId = [currentUser.uid, adOwnerId].sort().join('_');

        const q = query(
            collection(db, 'chats', chatId, 'messages'),
            orderBy('createdAt', 'asc')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const msgs = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setMessages(msgs);
        });

        return () => unsubscribe();
    }, [adId, adOwnerId, currentUser]);

    const sendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || !currentUser || !adId || !adOwnerId) return;

        const chatId = [currentUser.uid, adOwnerId].sort().join('_');

        try {
            await addDoc(collection(db, 'chats', chatId, 'messages'), {
                text: newMessage,
                senderId: currentUser.uid,
                senderEmail: currentUser.email,
                createdAt: serverTimestamp(),
            });
            setNewMessage('');
        } catch (error) {
            alert(`Ошибка отправки сообщения: ${error.message}`);
        }
    };

    if (!currentUser) {
        return <p>Войдите, чтобы начать чат.</p>;
    }
    if (!adId) {
        return <p>Выберите объявление, чтобы начать чат.</p>;
    }

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
            <h3>Чат по объявлению</h3>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #eee', padding: '10px', marginBottom: '10px' }}>
                {messages.map((msg) => (
                    <div key={msg.id} style={{ marginBottom: '5px', textAlign: msg.senderId === currentUser.uid ? 'right' : 'left' }}>
                        <span style={{ fontWeight: 'bold', color: msg.senderId === currentUser.uid ? '#007bff' : '#28a745' }}>
                            {msg.senderId === currentUser.uid ? 'Вы' : msg.senderEmail}:
                        </span> {msg.text}
                        <span style={{ fontSize: '0.8em', color: '#888', marginLeft: '5px' }}>
                            {msg.createdAt?.toDate().toLocaleTimeString()}
                        </span>
                    </div>
                ))}
            </div>
            <form onSubmit={sendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Напишите сообщение..."
                    style={{ width: 'calc(100% - 80px)', padding: '8px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Отправить
                </button>
            </form>
        </div>
    );
};

export default Chat;