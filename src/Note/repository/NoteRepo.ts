import Note from "../model/Note";


interface INoteRepo {

    save(note: Note): Promise<void>;
    update(note: Note): Promise<void>;
    delete(noteid: number): Promise<void>;
    retrieveById(note: number): Promise<Note>;
    retrieveALL(): Promise<Note[]>;
}

class NoteRepo implements INoteRepo {
    private static instance:NoteRepo;

    public static getInstance(){
        if(!NoteRepo.instance){
            NoteRepo.instance = new NoteRepo()
        }
        return NoteRepo.instance
    }
    async save(note: Note): Promise<void> {
        try {
        await Note.create({
            name: note.name,
            content: note.content,
            userId: note.userId
        })
        } catch (error) {
            throw error;
        }
    }

    async update(note: Note): Promise<void> {
        try {
           const new_note =  await Note.findOne({
                where: {
                    id: note.id
                }
            })
            if (!new_note){
                throw new Error("NOTE NOT FOUND ")
            }
            new_note.name = note.name;
            new_note.content = note.content;

            await new_note.save()

        } catch (error){
            throw error;
        }
    }
    async delete(noteId: number): Promise<void> {
        try {
            const new_note =  await Note.findOne({
                where: {
                    id: noteId
                }
            })
            if (!new_note) {
                throw new Error("NOTE NOT FOUND")
            }

            await new_note.destroy()

        } catch (error){
            throw error;
        }
    }
    async retrieveById(noteId: number): Promise<Note>{
        try {
            const new_note =  await Note.findOne({
                where: {
                    id: noteId
                }
            })
            if (!new_note) {
                throw new Error("NOTE NOT FOUND")
            }

            return new_note;

        } catch (error){
            throw error;
        }
    }
    async  retrieveALL(): Promise<Note[]> {
        try {
            const new_note: Note[] =  await Note.findAll()
            if (new_note.length == 0) {
                throw new Error("NOTES NOT FOUND ")
            }

            return new_note;

        } catch (error) {
            throw Error;
        }

    }
}

export default NoteRepo.getInstance()