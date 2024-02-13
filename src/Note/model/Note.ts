import {Column, ForeignKey, BelongsTo, DataType, Model, Table} from "sequelize-typescript";
import {User} from "../../user/model/User";
@Table({tableName: Note.NOTE_TABLE_NAME})
export class Note extends Model{
    public static NOTE_TABLE_NAME = "note" as string;
    public static NOTE_ID = "id" as string;
    public static NOTE_NAME = "name" as string;
    public static NOTE_CONTENT = "content" as string;
    public static NOTE_USER_ID = "userId" as string;

    @Column({
        type: DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: Note.NOTE_ID
    })
    id!:number;

    @Column({
        type: DataType.TEXT,
        field: Note.NOTE_NAME
    })
    name!:string;

    @Column({
        type: DataType.TEXT,
        field: Note.NOTE_CONTENT
    })
    content!:string;

    @ForeignKey(() => User)
    @Column({
        field: Note.NOTE_USER_ID,
        allowNull: false
    })
    userId!: number;

    @BelongsTo(() => User)
    user!: User;

}
export default Note;