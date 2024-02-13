import user from "../model/User";
import {UserRepo} from "../repository/UserRepo";
import express, { Request, Response} from 'express';
import {NoteRepo} from "../../Note/repository/NoteRepo";
import {number} from "zod";

class UserController {
    async create(req: Request, res: Response) {
        try {
            if (!req.body.username) {
                res.status(400).json({
                    status: "bad request",
                    message: "problem with username"
                })
            }
            const new_user = new user();
            new_user.id = req.body.id;
            new_user.username = req.body.username;
            console.log(req.body.username)
            await new UserRepo().save(new_user)
            res.status(200).json({
                status: "created!",
                message: "Successfully created user"
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async findNotesByUser(req: Request, res: Response) {
        try {
            if (!req.params["id"]) {
                res.status(400).json({
                    status: "bad request",
                    message: "problem with userID"
                })
            }
            const data = await new UserRepo().findNotesByUser(parseInt(req.params["id"]))
            res.status(200).json({
                status: "created!",
                message: "notes found",
                data: data
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.params["id"]) {
                res.status(400).json({
                    status: "bad request",
                    message: "problem with userID"
                })
            }
            await new UserRepo().delete(parseInt(req.params["id"]))
            res.status(200).json({
                status: "deleted!",
                message: "user has been deleted",
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async update(req: Request, res: Response) {
        try {

            if ( !req.body.username) {
                res.status(400).json({
                    status: "bad request",
                    message: "problem with userID or userName"
                })
            }
            const new_user = new user();
            new_user.username = req.body.username;
            new_user.id = parseInt(req.params["id"]);
            await new UserRepo().update(new_user)
            res.status(200).json({
                status: "updated!",
                message: "user has been updated",
            })
        } catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async getAll(req: Request, res: Response){
        try{
            const data = await new UserRepo().getAll()
            if (data.length == 0){
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "0 users"
                })
            }
            res.status(200).json({
                status: "found",
                message: "all users found",
                data: data
            })
        }   catch (error) {
            console.log(error);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
}
export default new UserController()