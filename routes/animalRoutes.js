import { Router } from 'express';
import animalController from '../controllers/animalController.js';
import authMiddleware from '../middlewares/authMid.js';
const router = Router();

router.get('/', animalController.getAnimals);
router.get('/:id', animalController.getAnimalById);
router.post('/', animalController.createAnimal);
router.put('/:id', animalController.updateAnimal);
router.delete('/:id', animalController.deleteAnimal);

export default router;