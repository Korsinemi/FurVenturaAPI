import Inventory from '../models/inventoryModel.js';
import middleware from '../middlewares/itemMid.js';

const getInventories = async (req, res) => {
    try {
        const inventories = await Inventory.find().populate('items.item');
        res.status(200).json(inventories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getInventoryByUserId = async (req, res) => {
    try {
        const inventory = await Inventory.findOne({ userId: req.params.userId }).populate('items.item');
        if (!inventory) return res.status(404).json({ message: 'Inventory not found' });
        res.status(200).json(inventory);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addItemToInventory = [
    middleware.checkItemExists,
    async (req, res) => {
        const { userId } = req.params;
        const { quantity, limitedCopyNumber } = req.body;

        try {
            const inventory = await Inventory.findOne({ userId });
            const itemId = req.item._id;

            if (!inventory) {
                const newInventory = new Inventory({
                    userId,
                    items: [{ item: itemId, quantity, limitedCopyNumber }]
                });
                await newInventory.save();
                return res.status(201).json(newInventory);
            }

            const existingItemIndex = inventory.items.findIndex(i => i.item.equals(itemId));
            if (existingItemIndex !== -1) {
                inventory.items[existingItemIndex].quantity += quantity;
            } else {
                inventory.items.push({ item: itemId, quantity, limitedCopyNumber });
            }

            await inventory.save();
            res.status(201).json(inventory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

const updateItemInInventory = [
    middleware.checkItemExists,
    async (req, res) => {
        const { userId, itemId } = req.params;
        const { quantity, limitedCopyNumber } = req.body;

        try {
            const inventory = await Inventory.findOne({ userId });
            if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

            const item = inventory.items.id(itemId);
            if (!item) return res.status(404).json({ message: 'Item not found' });

            item.quantity = quantity;
            item.limitedCopyNumber = limitedCopyNumber;
            await inventory.save();

            res.status(200).json(inventory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

const deleteItemFromInventory = [
    async (req, res) => {
        const { userId, itemId } = req.params;

        try {
            const inventory = await Inventory.findOne({ userId });
            if (!inventory) return res.status(404).json({ message: 'Inventory not found' });

            const item = inventory.items.id(itemId);
            if (!item) return res.status(404).json({ message: 'Item not found' });

            item.remove();
            await inventory.save();

            res.status(200).json(inventory);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
];

export default { getInventories, getInventoryByUserId, addItemToInventory, updateItemInInventory, deleteItemFromInventory };
