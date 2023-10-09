logger = require('../services/LoggerService') // импорт экземпляра логгера

// LogController класс обработки запросов к серверу
class LogController {
    // writeLogs метод записи логов в файл
    async writeLogs(req, res, next) {
        try {
            const level = req.body['data']['level'] // получение уровня логирования из тела запроса
            const message = `message: ${req.body['data']['message']}` // получение сообщения из тела запроса
            // switch case для разных уровней логирования
            switch (level) {
                case 'trace':
                    logger.trace(message) // вызов логгера для записи сообщения в файл
                    break
                case 'debug':
                    logger.debug(message) // вызов логгера для записи сообщения в файл
                    break
                case 'info':
                    logger.info(message) // вызов логгера для записи сообщения в файл
                    break
                case 'warn':
                    logger.warn(message) // вызов логгера для записи сообщения в файл
                    break
                case 'error':
                    logger.error(message) // вызов логгера для записи сообщения в файл
                    break
                case 'fatal':
                    logger.fatal(message) // вызов логгера для записи сообщения в файл
                    break
            }
            return res.json({data: null, status: 'success'}); // возвращаем ответ клиенту с успешным статусом
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new LogController();