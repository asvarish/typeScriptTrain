import user from "../model/User";
import {Request, Response} from 'express';
import {HTTP_STATUS, RESPONSE_MESSAGES} from "../../constants";
import UserRepo from "../repository/UserRepo";

class UserController {

    private static instance:UserController;

    public static getInstance():UserController{
        if (!UserController.instance){
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }
    async create(req: Request, res: Response) {
        try {
            if (!req.body.username) {
                res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const new_user = new user();
            new_user.id = req.body.id;
            new_user.username = req.body.username;
            console.log(req.body.username)
            await UserRepo.save(new_user)
            res.status(HTTP_STATUS.CREATED).json(RESPONSE_MESSAGES.SUCCESSFULLY_CREATED("user"))
        } catch (error) {
            console.log(error);
            res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async findNotesByUser(req: Request, res: Response) {
        try {
            if (!req.params["id"]) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const data = await UserRepo.findNotesByUser(parseInt(req.params["id"]))
            res.status(HTTP_STATUS.OK).json({...RESPONSE_MESSAGES.SUCCESSFULLY_FOUND("all notes by user"), username: data[0].name, data: data})
        } catch (error :any) {
            if (error.message == "User doesn't have any notes"){
                return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("Note"))
            }
            console.log(error);
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({...RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR, error: Error.name})
        }
    }

    async delete(req: Request, res: Response) {
        try {
            if (!req.params["id"]) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            await UserRepo.delete(parseInt(req.params["id"]))
            res.status(HTTP_STATUS.OK).json(RESPONSE_MESSAGES.SUCCESSFULLY_DELETED("user"))
        } catch (error: any) {
            if (error.message == "user not found"){
                return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("user to delete"))
            }
            return res.status(500).json({
                status: "Internal Server Error!",
                message: "Internal Server Error!"
            })
        }
    }

    async update(req: Request, res: Response) {
        try {

            if ( !req.body.username) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json(RESPONSE_MESSAGES.BAD_REQUEST)
            }
            const new_user = new user();
            new_user.username = req.body.username;
            new_user.id = parseInt(req.params["id"]);
            await UserRepo.update(new_user)
            return res.status(HTTP_STATUS.OK).json(RESPONSE_MESSAGES.SUCCESSFULLY_UPDATED("user"))
        } catch (error: any) {
            if (error.message =="user not found"){
                return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("user to update"))
            }
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }

    async getAll(req: Request, res: Response){
        try{
            const data = await UserRepo.getAll()
            return res.status(HTTP_STATUS.OK).json({...RESPONSE_MESSAGES.SUCCESSFULLY_FOUND("Users"), data:data})
        }   catch (error: any) {
            if (error.message =="no users found"){
               return res.status(HTTP_STATUS.NOT_FOUND).json(RESPONSE_MESSAGES.NOT_FOUND("users"))
            }
            return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json(RESPONSE_MESSAGES.INTERNAL_SERVER_ERROR)
        }
    }
}
export default UserController.getInstance();