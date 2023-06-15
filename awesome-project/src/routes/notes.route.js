import express from 'express';
import * as notesController from '../controllers/notes.controller';
import { userAuth } from '../middlewares/auth.middleware';
import { RedisGet } from '../middlewares/redis.middleware';
const router = express.Router();

//router to create a note
router.post('', userAuth, notesController.createNote);

//router to get all notes
//router.get('',userAuth,RedisGet,notesController.getAllNotes);

router.get('', userAuth, notesController.getAllNotes);
//router to get  note bu id
router.get('/:_id', userAuth, notesController.getNote);

//route to update a note
router.put('/:_id', userAuth, notesController.updateNote);

//route to delete a note
router.delete('/:_id', userAuth, notesController.deleteNote);

////route to archieve a note
router.put('/:_id/archive', userAuth, notesController.archiveNote);

//route to trash a note
router.put('/:_id/trash', userAuth, notesController.trashNote);

//update color
router.put('/:_id/updateColor', userAuth, notesController.updateNoteColor);

export default router;
