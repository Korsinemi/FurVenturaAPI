import { Router } from 'express';
import { authMiddleware } from '../middlewares/authMid.js';
import userController from '../controllers/userController.js';
const router = Router();

// Rutas generales del usuario
router.get('/', userController.getUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', authMiddleware, userController.deleteUser);

/*
// Rutas para el inventario del usuario
router.get('/:userId/inventory', authMiddleware, userController.getInventoryByUserId);
router.post('/:userId/inventory', authMiddleware, userController.addItemToInventory);
router.put('/:userId/inventory/:itemId', authMiddleware, userController.updateItemInInventory);
router.delete('/:userId/inventory/:itemId', authMiddleware, userController.deleteItemFromInventory);

// Rutas para los logros del usuario
router.get('/:userId/achievements', authMiddleware, userController.getAchievementsByUserId);
router.post('/:userId/achievements', authMiddleware, userController.addAchievementToUser);
router.put('/:userId/achievements/:achievementId', authMiddleware, userController.updateAchievementOfUser);
router.delete('/:userId/achievements/:achievementId', authMiddleware, userController.deleteAchievementOfUser);

/*
router.get('/', userController.getusers);
router.get('/:id', userController.getuserById);
router.post('/', userController.createuser);
router.put('/:id', userController.updateuser);
router.delete('/:id', userController.deleteuser);
*/

export default router;
