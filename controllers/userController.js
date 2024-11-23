// import Character from '../models/characterModel.js';
import User from '../models/userModel.js';
import Inventory from '../models/inventoryModel.js';
import Achievement from '../models/achievementModel.js';
import middleware from '../middlewares/itemMid.js';

// Obtener la lista de usuarios (con verificación de token)
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username _id role');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al obtener la lista de usuarios' });
    }
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para buscar: ', id);

    try {
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para eliminar:', id);

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ message: 'Usuario no encontrado' });

        // Eliminar logros y inventario asociados
        await Achievement.deleteMany({ userId: id });
        await Inventory.deleteMany({ userId: id });

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(400).json({ message: error.message });
    }
};

/*
// Funciones para manejar el inventario
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

const deleteItemFromInventory = async (req, res) => {
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
};

// Funciones para manejar logros
const getAchievementsByUserId = async (req, res) => {
    try {
        const achievements = await Achievement.find({ userId: req.params.userId });
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const addAchievementToUser = async (req, res) => {
    const { userId } = req.params;
    const { title, description, dateAchieved, points } = req.body;

    try {
        const newAchievement = new Achievement({ userId, title, description, dateAchieved, points });
        await newAchievement.save();
        res.status(201).json(newAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAchievementOfUser = async (req, res) => {
    const { userId, achievementId } = req.params;
    const { title, description, dateAchieved, points } = req.body;

    try {
        const updatedAchievement = await Achievement.findOneAndUpdate({ _id: achievementId, userId }, { title, description, dateAchieved, points }, { new: true });
        if (!updatedAchievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(updatedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteAchievementOfUser = async (req, res) => {
    const { userId, achievementId } = req.params;

    try {
        const deletedAchievement = await Achievement.findOneAndDelete({ _id: achievementId, userId });
        if (!deletedAchievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(deletedAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

*/

export default {
    getUsers,
    getUserById,
    deleteUser,

    /*
    getInventoryByUserId,
    addItemToInventory,
    updateItemInInventory,
    deleteItemFromInventory,
    getAchievementsByUserId,
    addAchievementToUser,
    updateAchievementOfUser,
    deleteAchievementOfUser
    getCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter */
};

/* const getCharacters = async (req, res) => { try { const characters = await Character.find(); res.status(200).json(characters); } catch (error) { res.status(500).json({ message: error.message }); } }; const getCharacterById = async (req, res) => { try { const character = await Character.findOne({ id: req.params.id }); if (!character) return res.status(404).json({ message: 'Character not found' }); res.status(200).json(character); } catch (error) { res.status(500).json({ message: error.message }); } }; const createCharacter = async (req, res) => { const { name, type, level } = req.body; try { const lastCharacter = await Character.findOne().sort({ id: -1 }); const newId = lastCharacter ? lastCharacter.id + 1 : 1; const newCharacter = new Character({ id: newId, name, type, level }); await newCharacter.save(); res.status(201).json(newCharacter); } catch (error) { res.status(400).json({ message: error.message }); } }; const updateCharacter = async (req, res) => { const { id } = req.params; const { name, type, level } = req.body; console.log('Datos recibidos para actualizar:', { id, name, type, level }); if (!name || !type || !Number.isInteger(level)) { return res.status(400).json({ message: 'Datos inválidos' }); } try { const updatedCharacter = await Character.findOneAndUpdate({ id }, { name, type, level }, { new: true }); if (!updatedCharacter) return res.status(404).json({ message: 'Character not found' }); res.status(200).json(updatedCharacter); } catch (error) { console.error('Error al actualizar el personaje:', error); res.status(400).json({ message: error.message }); } }; */