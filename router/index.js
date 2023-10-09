const Router = require('express').Router; // импорт роутера из фреймворка express
const LogsController = require('../application/controllers/LogController') // импорт контроллера логов

const router = new Router(); // создание жкземпляра роутера

// объявление эндпоинта для логирования сообщений с клиента
router.post('/logs', LogsController.writeLogs) // когда получаем запрос на /logs, то вызываем метод LogsController.writeLogs и передаем ему в качестве аргумента весь запрос

module.exports = router; // экспорт переменной router
