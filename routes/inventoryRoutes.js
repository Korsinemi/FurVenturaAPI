import { Router } from 'express';
import inventoryController from '../controllers/inventoryController.js';
import { authMiddleware } from '../middlewares/authMid.js';
import itemMiddleware from '../middlewares/itemMid.js';

const router = Router();

router.get('/', inventoryController.getInventories);
router.get('/:userId', inventoryController.getInventoryByUserId);
router.post('/:userId', authMiddleware, itemMiddleware.checkItemExists, inventoryController.addItemToInventory);
router.put('/:userId/:itemId', authMiddleware, itemMiddleware.checkItemExists, inventoryController.updateItemInInventory);
router.delete('/:userId/:itemId', authMiddleware, inventoryController.deleteItemFromInventory);

export default router;
