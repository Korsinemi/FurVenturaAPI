import { Router } from 'express';
import eventController from '../controllers/eventController.js';
import authMiddleware from '../middlewares/authMid.js';
const router = Router();

router.get('/', eventController.getEvents);
router.post('/', eventController.createEvent);
router.put('/:id', eventController.updateEvent);
router.delete('/:id', eventController.deleteEvent);

export default router;