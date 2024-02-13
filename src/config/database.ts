import {Sequelize} from "sequelize-typescript";
import * as dotenv from "dotenv";
import Note from "../Note/model/Note";
import User from "../user/model/User";
dotenv.config();

class Database {
    public sequelize: Sequelize | undefined;
    private POSTGRES_DB = process.env.POSTGRES_DB as string;
    private POSTGRES_USER = process.env.POSTGRES_USER as string;
    private POSTGRES_HOST = process.env.POSTGRES_HOST as string;
    private POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT!) as number;
    private POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD as string;


    constructor() {
        this.connectToPG();

    }

    private async connectToPG() {
        this.sequelize = new Sequelize({
                database: this.POSTGRES_DB,
                username: this.POSTGRES_USER,
                host: this.POSTGRES_HOST,
                password: this.POSTGRES_PASSWORD,
                port: this.POSTGRES_PORT,
                dialect: "postgres",
                models: [Note,User]
            }
        );

        this.sequelize
            .authenticate()
            .then(() => console.log("DB connected"))
            .catch((error: Error) => {
                console.log(error + "DB isn't connected(")
            })
    }

}
export default Database;