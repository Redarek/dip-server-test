require('dotenv').config(); // модуль для конфига
const express = require('express'); // фреймворк для создания http сервера
const session = require('express-session') // модуль для хранения сессий
const cookieParser = require('cookie-parser'); // модуль для хранения  куки
const router = require('./router/index'); // импорт роутера с эндпоинтами

// конфигурация для создания и хранения сессий на сервере
const sessionConfig = {
    secret: process.env.SESSION_SECRET || 'Radmir Ibragimov IKTZ-05',
    resave: true,
    saveUninitialized: false,
    cookie: { // настройка куки для продакшена
        sameSite: process.env.NODE_ENV === "production" ? 'none' : 'lax', // must be 'none' to enable cross-site delivery
        secure: process.env.NODE_ENV === "production", // must be true if sameSite='none'
    }
}

const app = express(); // создание экземпляра сервера

app.use(session(sessionConfig)); // применение конфига сессии
app.use(express.json()); // задаем формат json для запросов
app.use(cookieParser()); // применение парсера куки
app.use('/api', router); // установили route для запросов к api


// основная функция запуска сервера
const start = async () => {
    try {
        // запуск слушателя на порту
        app.listen(process.env.PORT || 3500, () => {
            console.log(`Server started on port ${process.env.PORT}`); // вывод инфы о запуске и о порте
        });
    } catch (error) {
        console.log('Something went wrong. Please try again', error.message); // обработка ошибок
        process.exit(1); // выход из программы
    }
}

start(); // вызов основной функции для запуска сервера
