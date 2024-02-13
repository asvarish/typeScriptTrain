import {Column, HasMany, DataType, Model, Table} from "sequelize-typescript";
import {combineTableNames} from "sequelize/types/utils";
import Note from "../../Note/model/Note";





@Table({tableName : User.USER_TABLE_NAME})
export class User extends Model{
    public static USER_TABLE_NAME  = "user" as string;
    public static USER_ID = "id" as string;
    public static USER_USERNAME = "userName" as string;


    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: User.USER_ID
    })
    id!:number;

    @Column({
        type: DataType.TEXT,
        field: User.USER_USERNAME,
        allowNull: false,
        unique: true
    })
    username!:string;

    @HasMany(()=>Note, {onDelete: "null", onUpdate: "cascade"})
    notes!: Note[]

}
export default User;