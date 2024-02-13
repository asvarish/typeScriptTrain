import User from "../model/User";
import Note from "../../Note/model/Note";
import {undefined} from "zod";


interface IUserRepo {
    save(user: User): Promise <void>;
    update(user: User): Promise <void>;
    delete(userID: number): Promise <void>;
    findNotesByUser(userID: number): Promise <Note[]>;
    getAll(): Promise <User[]>
}

export class UserRepo implements IUserRepo {
    async save(user: User): Promise<void> {
        try{
            await User.create({
                username: user.username
            })
        } catch (error){
            throw new Error("COULDN'T MAKE A USER")
        }

    }

    async findNotesByUser(userID: number): Promise<Note[]> {
        try{
            const notes =  await Note.findAll({
                where: {
                    userId: userID
                }
            })
            if (notes.length==0){
                throw new Error("User doesn't have any notes")
            }
            return notes;
        } catch (error){
            throw error;
        }
    }

    async delete(userID: number): Promise<void> {
        try{
            const new_user = await User.findOne({
                where: {
                    id: userID
                }
            })
            if (!new_user){
                throw new Error("user not found")
            }
            await new_user.destroy()
        }   catch (error){
            throw error;
        }
    }

    async update(user: User): Promise<void> {
        try{
            const new_user = await User.findOne({
                where: {
                    id: user.id
                }
            })
            if (!new_user){
                throw new Error("user not found")
            }
            new_user.id = user.id;
            new_user.username = user.username;
        }   catch (error){
                throw error;
        }
    }
    async getAll(): Promise <User[]> {
        try {
            const data = await User.findAll()
            if (data.length == 0) {
                throw new Error("Юзеров нет")
            }
            return data;
        } catch (error) {
            throw error;
        }
    }
}