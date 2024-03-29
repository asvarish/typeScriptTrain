import Note from "../model/Note";
import {Request, Response} from 'express';
import {HTTP_STATUS, RESPONSE_MESSAGES} from "../../constants";
import NoteRepo from "../repository/NoteRepo";

class NoteController {
     public static instance:NoteController

     public static getInstance() {
         if(!NoteController.instance){
             return NoteController.instance = new NoteController()
         }
         return NoteController.instance
     }

    async create(req: Request, res: Response): Promise<void> {
        try {
            if (!req.body.name || !req.body.content){
                 res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const new_note = new Note();
            new_note.name = req.body.name;
            new_note.content = req.body.content;
            new_note.userId! = parseInt(req.body.userId);

            await NoteRepo.save(new_note)//todo singleton

            res.status(HTTP_STATUS.CREATED).json(RESPONSE_MESSAGES.SUCCESSFULLY_CREATED("note"))

        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {

            if (!req.body || !parseInt(req.params["id"])) {
                 res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const new_note = await NoteRepo.retrieveById(parseInt(req.params["id"]));

            if (req.body.name) {
                new_note.name = req.body.name;
            }

            if (req.body.content) {
                new_note.content = req.body.content;
            }

            new_note.id = parseInt(req.params["id"]);

            await NoteRepo.update(new_note)

            res.status(HTTP_STATUS.OK).json(RESPONSE_MESSAGES.SUCCESSFULLY_UPDATED("note"));

        } catch (error: any) {
            if(error.message == "NOTE NOT FOUND") {
                res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("note to update"))
            }
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.params["id"]) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            await NoteRepo.delete(parseInt(req.params["id"]));

            res.status(HTTP_STATUS.OK).json(RESPONSE_MESSAGES.SUCCESSFULLY_DELETED("note"))

        } catch (error: any) {
            if(error.message == "NOTE NOT FOUND") {
                return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("note to delete"))
            }
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

     async findById(req: Request, res: Response) {
        try {
            const id = parseInt(req.params["id"])
            console.log(req.params["id"])
            if (!id) {
               return res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const data = await NoteRepo.retrieveById(id);
            res.status(HTTP_STATUS.OK).json({...RESPONSE_MESSAGES.SUCCESSFULLY_FOUND("note"), data:data})

        } catch (error: any) {
            if(error.message == "NOTE NOT FOUND") {
                return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("note"))
            }
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async findAll(req: Request, res: Response) {
        try {
            const data: Note[] = await NoteRepo.retrieveALL();

            res.status(HTTP_STATUS.OK).json({...RESPONSE_MESSAGES.SUCCESSFULLY_FOUND("notes"), data:data})

        } catch (error: any) {
            if(error.message == "NOTES NOT FOUND") {
               return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("notes"))
            }
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }
}
export default  NoteController.getInstance()