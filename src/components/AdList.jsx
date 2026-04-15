// src/components/AdList.jsx
import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';

const AdList = () => {
    const [ads, setAds] = useState([]);

    useEffect(() => {
        const q = query(collection(db, 'ads'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const adsData = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setAds(adsData);
        });
        return () => unsubscribe();
    }, []);

    return (
        <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <h2>Все объявления</h2>
            {ads.length === 0 ? (
                <p>Пока нет объявлений.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                    {ads.map((ad) => (
                        <div key={ad.id} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
                            <h3>{ad.title}</h3>
                            <p>{ad.description}</p>
                            <p><strong>Цена: {ad.price} ₽</strong></p>
                            <p style={{ fontSize: '0.9em', color: '#666' }}>Продавец: {ad.userEmail}</p>
                            {/* Здесь можно добавить кнопку "Написать продавцу" для чата */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AdList;