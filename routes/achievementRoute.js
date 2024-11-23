import { Router } from 'express';
import achievementController from '../controllers/achievementController.js';
const router = Router();

router.get('/', achievementController.getAchievements);
router.get('/:id', achievementController.getAchievementById);
router.post('/', achievementController.createAchievement);
router.put('/:id', achievementController.updateAchievement);
router.delete('/:id', achievementController.deleteAchievement);

export default router;
