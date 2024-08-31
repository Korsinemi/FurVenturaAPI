import Character from '../models/characterModel.js';
import User from '../models/userModel.js';

/* Proximamente
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}, 'username');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor al obtener la lista de usuarios' });
    }
}
*/

const getCharacters = async (req, res) => {
    try {
        const characters = await Character.find();
        res.status(200).json(characters);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCharacterById = async (req, res) => {
    try {
        const character = await Character.findOne({ id: req.params.id });
        if (!character) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json(character);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createCharacter = async (req, res) => {
    const { name, type, level } = req.body;

    try {
        const lastCharacter = await Character.findOne().sort({ id: -1 });
        const newId = lastCharacter ? lastCharacter.id + 1 : 1;

        const newCharacter = new Character({ id: newId, name, type, level });
        await newCharacter.save();
        res.status(201).json(newCharacter);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateCharacter = async (req, res) => {
    const { id } = req.params;
    const { name, type, level } = req.body;

    console.log('Datos recibidos para actualizar:', { id, name, type, level });

    if (!name || !type || !Number.isInteger(level)) {
        return res.status(400).json({ message: 'Datos inválidos' });
    }

    try {
        const updatedCharacter = await Character.findOneAndUpdate({ id }, { name, type, level }, { new: true });
        if (!updatedCharacter) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json(updatedCharacter);
    } catch (error) {
        console.error('Error al actualizar el personaje:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteCharacter = async (req, res) => {
    const { id } = req.params;

    console.log('ID recibido para eliminar:', id);

    try {
        const deletedCharacter = await Character.findOneAndDelete({ id });
        if (!deletedCharacter) return res.status(404).json({ message: 'Character not found' });
        res.status(200).json(deletedCharacter);
    } catch (error) {
        console.error('Error al eliminar el personaje:', error);
        res.status(400).json({ message: error.message });
    }
};

export default { getCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter };