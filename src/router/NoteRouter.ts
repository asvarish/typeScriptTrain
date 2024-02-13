import BaseRouter from "./BaseRouter";
import NoteController from "../Note/controller/NoteController";

class NoteRouter extends BaseRouter{
    public routes() {
        this.router.post("", NoteController.create)
        this.router.patch("/:id", NoteController.update)
        this.router.delete("/:id", NoteController.delete)
        this.router.get("", NoteController.findAll)
        this.router.get("/:id", NoteController.findById)
        this.router.get("/getcreate/", NoteController.createGet)
    }
}
export default new NoteRouter().router
