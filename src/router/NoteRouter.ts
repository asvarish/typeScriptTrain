import BaseRouter from "./BaseRouter";
import NoteController from "../Note/controller/NoteController";

class NoteRouter extends BaseRouter{
    public routes() {

        /**
         * @swagger
         * /api/v1/note:
         *   post:
         *     summary: Создание новой заметки.
         *     description: Создает новую заметку на основе данных из тела запроса.
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               content:
         *                 type: string
         *               userId:
         *                 type: integer
         *     responses:
         *       201:
         *         description: Заметка успешно создана.
         *       400:
         *         description: Неправильный запрос.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.post("", NoteController.create)

        /**
         * @swagger
         * /api/v1/note/{id}:
         *   patch:
         *     summary: Обновление записи.
         *     description: Обновляет запись по id на основе данных из тела запроса.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID записи, которую необходимо обновить.
         *         schema:
         *           type: string
         *     requestBody:
         *       required: true
         *       content:
         *         application/json:
         *           schema:
         *             type: object
         *             properties:
         *               name:
         *                 type: string
         *               content:
         *                 type: string
         *     responses:
         *       200:
         *         description: Заметка успешно обновлена.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: запись для обновления не найдена.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.patch("/:id", NoteController.update)
        /**
         * @swagger
         * /api/v1/note/{id}:
         *   delete:
         *     summary: удаление записи.
         *     description: удаляет запись по id.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID записи, которую необходимо удалить.
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: запись успешно оудалена.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: запись для удаления не найдена.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.delete("/:id", NoteController.delete)
        /**
         * @swagger
         * /api/v1/note/{id}:
         *   get:
         *     summary: поиск записи.
         *     description: находит запись по id.
         *     parameters:
         *       - in: path
         *         name: id
         *         required: true
         *         description: ID записи, которую необходимо найти.
         *         schema:
         *           type: string
         *     responses:
         *       200:
         *         description: запись успешно найдена.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Записей не найдено.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.get("", NoteController.findAll)
        /**
         * @swagger
         * /api/v1/note:
         *   get:
         *     summary: поиск всех записей.
         *     description: находит все записи, которые есть.
         *     responses:
         *       200:
         *         description: все записи успешно найдены.
         *       400:
         *         description: Неправильный запрос.
         *       404:
         *         description: Запись не найдена.
         *       500:
         *         description: Внутренняя ошибка сервера.
         */
        this.router.get("/:id", NoteController.findById)
    }
}
export default new NoteRouter().router
