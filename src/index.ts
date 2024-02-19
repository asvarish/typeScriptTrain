import express, {Application} from "express";
import Database from "./config/database";
import UserRouter from "./router/UserRouter";
import specs from "./config/swagger";
import swaggerUi from "swagger-ui-express";
import NoteRouter from "./router/NoteRouter";

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

