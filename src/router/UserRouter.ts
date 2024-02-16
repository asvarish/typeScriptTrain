import BaseRouter from "./BaseRouter";
import UserController from "../user/controller/UserController";

class UserRouter extends BaseRouter{

    public routes(){
        /**
         * @swagger
         * /api/v1/user:
         *   post:
         *     summary: Создание нового пользователя.
         *     description: Создает нового пользователя на основние данных из тела запроса.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string

         *     responses:
         *       201:
         *         description: Пользователь успешно создан.
         *       400:
         *         description: Неправильный запрос.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.post("", UserController.create);
        /**
         * @swagger
         * /api/v1/user/{id}:
         *   patch:
         *     summary: Обновление пользователя.
         *     description: Обновляет пользоваетля по id на основание данных из тела запроса.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID пользователя, которого необходимо обновить.
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               username:
         *                 type: string
         *     responses:
         *       200:
         *         description: Пользователь успешно обновлен.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Пользователь для обновления не найден.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.patch("/:id", UserController.update);
        /**
         * @swagger
         * /api/v1/user/{id}:
         *   delete:
         *     summary: Удаление пользователя.
         *     description: Удаляет пользователя по id.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID пользователя, которого необходимо удалить.
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Пользователь успешно удален.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Пользователь для удаления не найден.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.delete("/:id", UserController.delete);
        /**
         * @swagger
         * /api/v1/user/{id}:
         *   get:
         *     summary: Поиск записей пользователя.
         *     description: Находит записи пользователя по id.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID пользователя для поиска пользователя.
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: Записи пользователя успешно найдены.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Записей пользователя не найдено.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.get("/:id", UserController.findNotesByUser);
        /**
         * @swagger
         * /api/v1/user:
         *   get:
         *     summary: Поиск всех пользователей.
         *     description: Находит всех пользователей, которые есть.
         *     responses:
         *       200:
         *         description: Все пользователи успешно найдены.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Пользователи не найдены.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.get("",UserController.getAll);
}
}

export default new UserRouter().router;