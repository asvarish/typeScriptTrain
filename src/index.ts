import express, {Application} from "express";
import Database from "./config/database";
import Note from "./Note/model/Note";
import {NoteRepo} from "./Note/repository/NoteRepo";
import NoteRouter from "./router/NoteRouter";
import UserController from "./user/controller/UserController";
import UserRouter from "./router/UserRouter";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from 'swagger-jsdoc';




class App {
    public app : Application;
    constructor() {
        this.app = express();
        this.plugins()
        this.databaseSync();
        this.routes();
    }

    protected plugins():void{
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
    }

    protected databaseSync():void{
        const db = new Database();
        db.sequelize?.sync()
    }
    protected routes():void{
        this.app.route("/").get((req, res)=>{
            res.send("Home")
        })
        const options = {
            failOnErrors: true,
            definition: {
                openapi: '3.0.0',
                info: {
                    title: 'API Documentation',
                    version: '1.0.0',
                    description: 'Documentation for my API',
                },
            },
            apis: ["**/*.ts"] // Путь к вашим файлам маршрутов
        };

        const specs = swaggerJsdoc(options);
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
        this.app.use("/api/v1/note",NoteRouter)
        this.app.use("/api/v1/user",UserRouter)

    }
}

const port = process.env.PORT || 8000
const app = new App().app


app.listen(port,()=>{
    console.log("poexaly")
})

