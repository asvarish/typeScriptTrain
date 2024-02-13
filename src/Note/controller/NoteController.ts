import Note from "../model/Note";
import {NoteRepo} from "../repository/NoteRepo";
import express, { Request, Response} from 'express';
import {string} from "zod";

interface IPostParams {
    name: string,
    content: string,
}

class NoteController {

    async create(req: Request, res: Response) {
        try {
            if (!req.body.name || !req.body.content){
                return res.status(400).json({
                    status: "bad request",
                    message: "problem with name or description"
                })
            }
            const new_note = new Note();
            new_note.name = req.body.name;
            new_note.content = req.body.content;
            new_note.userId! = parseInt(req.body.userId);
            console.log(parseInt(req.body.userId));


            await new NoteRepo().save(new_note)

            res.status(200).json({
                status: "created!",
                message: "Successfully created note"
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const new_note = new Note();
            if (!req.body) {
                res.status(400).json({
                    status: "empty",
                    message: "huempty"
                })
            }

            if (req.body.name) {
                new_note.name = req.body.name;
            }

            if (req.body.content) {
                new_note.content = req.body.content;
            }

            if (req.params["id"]) {
                new_note.id = parseInt(req.params["id"]);
            }

            await new NoteRepo().update(new_note)

            res.status(201).json({
                status: "created!",
                message: "Successfully created note"
            })

        } catch (err) {
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
                    status: "empty",
                    message: "huempty"
                })
            }
            await new NoteRepo().delete(parseInt(req.params["id"]));

            res.status(201).json({
                status: "created!",
                message: "Successfully created note"
            })

        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"])
            console.log(req.params["id"])
            if (!id) {
                res.status(400).json({
                    status: "empty",
                    message: "huempty"
                })
            }
            const data = await new NoteRepo().retrieveById(id);
            res.status(201).json({
                status: "created!",
                message: "Successfully created note",
                data: data
            })

        } catch (err) {
            res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const data = await new NoteRepo().retrieveALL();

            res.status(201).json({
                status: "created!",
                message: "Successfully created note",
                data: data
            })

        } catch (err) {
            console.log(err);
            res.status(500).json({
                error: err,
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }
        async createGet(req: Request, res: Response) {
            try {
                const new_note = new Note();
                console.log(req.query.name);

                new_note.name = req.query.name as string;
                new_note.content = req.query.content as string;
                console.log(new_note.name)

                await new NoteRepo().save(new_note)

                res.status(200).json({
                    status: "created!",
                    message: "Successfully created note"
                })

            } catch (err) {
                console.log(err);
                res.status(500).json({
                    status: "Internal Server Error!",
                    message: "Internal Server Error!"
                })
            }
        }
}
export default new NoteController()