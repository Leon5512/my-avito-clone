// src/App.jsx
import React from 'react';
import Auth from './components/Auth';
import AdForm from './components/AdForm';
import AdList from './components/AdList';
import Chat from './components/Chat'; // Пока не интегрирован полностью, но готов к использованию

function App() {
    // В реальном приложении здесь будет роутинг (react-router-dom)
    // и состояние для отображения разных страниц.
    // Например, можно использовать useState для переключения между компонентами.

    const [selectedAdForChat, setSelectedAdForChat] = React.useState(null); // Для демонстрации чата

    return (
        <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '900px', margin: '20px auto', padding: '20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.05)' }}>
            <h1>Моя Avito-копия</h1>

            <Auth /> {/* Компонент для регистрации/входа */}

            {/* Если пользователь вошел, показываем форму для объявлений */}
            {auth.currentUser && <AdForm />}

            <AdList /> {/* Список всех объявлений */}

            {/* Пример использования чата:
          В реальном приложении кнопка "Написать продавцу" в AdList
          будет устанавливать selectedAdForChat и показывать компонент Chat.
          Здесь я просто показываю его как отдельный блок.
      */}
            {/* <button onClick={() => setSelectedAdForChat({ id: 'someAdId', ownerId: 'someOwnerId' })}>
        Открыть чат (пример)
      </button> */}
            {/* {selectedAdForChat && (
        <Chat adId={selectedAdForChat.id} adOwnerId={selectedAdForChat.ownerId} />
      )} */}

            {/* Чтобы протестировать чат, тебе нужно будет:
          1. Зарегистрировать двух пользователей.
          2. От одного пользователя разместить объявление.
          3. От другого пользователя "открыть" чат с владельцем этого объявления.
          Это потребует более сложной логики в AdList для передачи adId и adOwnerId в Chat.
      */}
        </div>
    );
}

export default App;