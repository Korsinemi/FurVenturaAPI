import { Router } from 'express';
import characterController from '../controllers/characterController.js';
const router = Router();

router.get('/', characterController.getCharacters);
router.get('/:id', characterController.getCharacterById);
router.post('/', characterController.createCharacter);
router.put('/:id', characterController.updateCharacter);
router.delete('/:id', characterController.deleteCharacter);

export default router;