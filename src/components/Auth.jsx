// src/components/Auth.jsx
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../firebase';

const Auth = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(true); // Для переключения между регистрацией и входом
    const [user, setUser] = useState(null); // Для хранения текущего пользователя

    // Отслеживаем состояние аутентификации
    React.useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    const handleAuth = async () => {
        try {
            if (isRegistering) {
                await createUserWithEmailAndPassword(auth, email, password);
                alert('Регистрация успешна!');
            } else {
                await signInWithEmailAndPassword(auth, email, password);
                alert('Вход успешен!');
            }
        } catch (error) {
            alert(`Ошибка: ${error.message}`);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert('Вы вышли из аккаунта.');
        } catch (error) {
            alert(`Ошибка выхода: ${error.message}`);
        }
    };

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginBottom: '20px' }}>
            <h2>{isRegistering ? 'Регистрация' : 'Вход'}</h2>
            {user ? (
                <div>
                    <p>Привет, {user.email}!</p>
                    <button onClick={handleLogout}>Выйти</button>
                </div>
            ) : (
                <div>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
                    />
                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ display: 'block', marginBottom: '10px', padding: '8px' }}
                    />
                    <button onClick={handleAuth} style={{ marginRight: '10px', padding: '8px 15px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px' }}>
                        {isRegistering ? 'Зарегистрироваться' : 'Войти'}
                    </button>
                    <button onClick={() => setIsRegistering(!isRegistering)} style={{ padding: '8px 15px', backgroundColor: '#6c757d', color: 'white', border: 'none', borderRadius: '4px' }}>
                        {isRegistering ? 'Уже есть аккаунт? Войти' : 'Нет аккаунта? Зарегистрироваться'}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Auth;