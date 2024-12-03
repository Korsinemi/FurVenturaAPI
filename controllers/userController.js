import User from '../models/userModel.js';
import Inventory from '../models/inventoryModel.js';
import Achievement from '../models/achievementModel.js';
import bcrypt from 'bcryptjs';
import joi from 'joi';
import jwt from 'jsonwebtoken';

const getUsers = async (req, res) => {
    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null; // Elimina el prefijo "Bearer " si existe

    let fieldsToSelect = 'username _id'; // Campos por defecto

    try {
        if (token) {
            const decoded = jwt.verify(token, 'your_jwt_secret');
            const user = await User.findById(decoded.userId);
            if (user && user.role === 'admin') {
                fieldsToSelect = 'username _id role email'; // Campos adicionales para admin
            }
        }

        const users = await User.find({}, fieldsToSelect);
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al obtener la lista de usuarios' });
        console.log(error);
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;
    console.log('ID recibido para buscar: ', id);

    const authHeader = req.header('Authorization');
    const token = authHeader ? authHeader.replace('Bearer ', '') : null; // Elimina el prefijo "Bearer " si existe

    let fieldsToSelect = 'username _id'; // Campos por defecto

    try {
        let decoded, user;
        if (token) {
            decoded = jwt.verify(token, 'your_jwt_secret');
            user = await User.findById(decoded.userId);
            if (!user) return res.status(401).json({ error: 'Token inválido' });

            // Verificar si el usuario es admin o si está buscando sus propios datos
            if (user.role === 'admin' || user._id.toString() === id) {
                fieldsToSelect = 'username _id email password';
            }
        }

        const foundUser = await User.findById(id).select(fieldsToSelect);
        if (!foundUser) return res.status(404).json({ message: 'Usuario no encontrado' });

        res.status(200).json(foundUser);
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
        // await Achievement.deleteMany({ userId: id });
        // await Inventory.deleteMany({ userId: id });

        res.status(200).json(deletedUser);
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(400).json({ message: error.message });
    }
};

const updateUserSchema = joi.object({
    username: joi.string().min(3).max(50),
    email: joi.string().email().required(),
    password: joi.string().min(6).allow(null, '')
});

const updateUser = async (req, res) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    const token = authHeader.replace('Bearer ', '');

    const { error } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updates = req.body;

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ error: 'Token inválido' });

        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        let updatedUser;
        if (user.role === 'admin') {
            // El administrador puede actualizar cualquier usuario
            updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
        } else if (user.role === 'user' && user._id.toString() === req.params.id) {
            // Los usuarios solo pueden actualizar sus propios datos
            updatedUser = await User.findByIdAndUpdate(user._id, updates, { new: true });
        } else {
            return res.status(403).json({ error: 'No tienes permiso para actualizar este usuario' });
        }

        if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.status(200).json({ msg: 'Datos del usuario actualizados exitosamente', updatedUser });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
        console.log(error);
    }
}


export default {
    getUsers,
    getUserById,
    deleteUser,
    updateUser
};

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

/* const getCharacters = async (req, res) => { try { const characters = await Character.find(); res.status(200).json(characters); } catch (error) { res.status(500).json({ message: error.message }); } }; const getCharacterById = async (req, res) => { try { const character = await Character.findOne({ id: req.params.id }); if (!character) return res.status(404).json({ message: 'Character not found' }); res.status(200).json(character); } catch (error) { res.status(500).json({ message: error.message }); } }; const createCharacter = async (req, res) => { const { name, type, level } = req.body; try { const lastCharacter = await Character.findOne().sort({ id: -1 }); const newId = lastCharacter ? lastCharacter.id + 1 : 1; const newCharacter = new Character({ id: newId, name, type, level }); await newCharacter.save(); res.status(201).json(newCharacter); } catch (error) { res.status(400).json({ message: error.message }); } }; const updateCharacter = async (req, res) => { const { id } = req.params; const { name, type, level } = req.body; console.log('Datos recibidos para actualizar:', { id, name, type, level }); if (!name || !type || !Number.isInteger(level)) { return res.status(400).json({ message: 'Datos inválidos' }); } try { const updatedCharacter = await Character.findOneAndUpdate({ id }, { name, type, level }, { new: true }); if (!updatedCharacter) return res.status(404).json({ message: 'Character not found' }); res.status(200).json(updatedCharacter); } catch (error) { console.error('Error al actualizar el personaje:', error); res.status(400).json({ message: error.message }); } }; */

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