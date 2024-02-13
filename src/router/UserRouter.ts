import BaseRouter from "./BaseRouter";
import UserController from "../user/controller/UserController";


class UserRouter extends BaseRouter{

    public routes(){
        this.router.post("", UserController.create);
        this.router.patch("/:id", UserController.update);
        this.router.delete("/:id", UserController.delete);
        this.router.get("/:id", UserController.findNotesByUser);
        this.router.get("",UserController.getAll);
}
}

export default new UserRouter().router;