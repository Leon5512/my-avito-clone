// src/components/AdForm.jsx
import React, { useState } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

const AdForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!auth.currentUser) {
            alert('Для размещения объявления необходимо войти в аккаунт.');
            return;
        }

        try {
            await addDoc(collection(db, 'ads'), {
                title,
                description,
                price: parseFloat(price),
                userId: auth.currentUser.uid,
                userEmail: auth.currentUser.email,
                createdAt: serverTimestamp(),
            });
            alert('Объявление успешно размещено!');
            setTitle('');
            setDescription('');
            setPrice('');
        } catch (error) {
            alert(`Ошибка при размещении объявления: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
            <h2>Разместить объявление</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Заголовок"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                />
                <textarea
                    placeholder="Описание"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%', minHeight: '80px' }}
                ></textarea>
                <input
                    type="number"
                    placeholder="Цена"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    required
                    style={{ display: 'block', marginBottom: '10px', padding: '8px', width: '100%' }}
                />
                <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px' }}>
                    Разместить
                </button>
            </form>
        </div>
    );
};

export default AdForm;