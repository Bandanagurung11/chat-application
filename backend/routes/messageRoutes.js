import express from 'express';
const router = express.Router();
import {messageCreate, messageGet, messageGetById, messageUpdate,messageDelete} from "../controllers/messageController.js"
router.post('/', messageCreate);
router.get('/', messageGet);
router.get('/:id', messageGetById);
router.patch('/:id', messageUpdate);
router.delete('/:id', messageDelete);

export default router;