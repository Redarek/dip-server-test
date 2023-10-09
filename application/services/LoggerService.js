const fs = require('fs'); // модуль для работы с файлами и директориями
const path = require('path'); //  модуль для работы с путями к файлам и директориям
const logsDir = path.join(__dirname, '../../logs'); // директория для хранения логов
if (!fs.existsSync(logsDir)) { // если директория для логов не существует
    fs.mkdirSync(logsDir, { recursive: true }); // то создаем ее
}

const pino = require('pino'); // модуль для логирования
const destination = pino.destination('./logs/logs.txt'); // местоположение файла для записи туда логов

// инициализация логгера
const loggerService = pino({
    level: process.env.PINO_LOG_LEVEL || 'trace', // уровень логирования. trace самый низкий
    formatters: {
        level: (label) => {
            return { level: label.toUpperCase() }; // тут приводим численный формат уровня логов к строковому. Например, 30 => INFO
        },
    },
    timestamp: () => `,"time":"${new Date().toISOString()}"` // указываем, что нужны временные метки в логах
}, destination);

module.exports = loggerService; // экспорт созданного логгера для использования в других местах программы