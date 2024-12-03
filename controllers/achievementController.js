import Achievement from '../models/achievementModel.js';

const getAchievements = async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.status(200).json(achievements);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAchievementById = async (req, res) => {
    try {
        const achievement = await Achievement.findOne({ id: req.params.id });
        if (!achievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(achievement);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAchievement = async (req, res) => {
    const { icon, name, description, dateAchieved, points } = req.body;

    try {
        const lastAchievement = await Achievement.findOne().sort({ id: -1 });
        const newId = lastAchievement ? lastAchievement.id + 1 : 1;

        console.log('Datos recibidos para añadir:', { icon, name, description, dateAchieved, points });

        const newAchievement = new Achievement({ id: newId, icon, name, description, dateAchieved, points });
        await newAchievement.save();
        res.status(201).json(newAchievement);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAchievement = async (req, res) => {
    const { id } = req.params;
    const { icon, name, description, dateAchieved, points } = req.body;

    console.log('Datos recibidos para actualizar:', { id, icon, name, description, dateAchieved, points });

    try {
        const updatedAchievement = await Achievement.findOneAndUpdate({ id }, { name, icon, description, dateAchieved, points }, { new: true });
        if (!updatedAchievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(updatedAchievement);
    } catch (error) {
        console.error('Error al actualizar el logro:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteAchievement = async (req, res) => {
    const { id } = req.params;

    console.log('ID recibido para eliminar:', id);

    try {
        const deletedAchievement = await Achievement.findOneAndDelete({ id });
        if (!deletedAchievement) return res.status(404).json({ message: 'Achievement not found' });
        res.status(200).json(deletedAchievement);
    } catch (error) {
        console.error('Error al eliminar el logro:', error);
        res.status(400).json({ message: error.message });
    }
};

export default { getAchievements, getAchievementById, createAchievement, updateAchievement, deleteAchievement };
