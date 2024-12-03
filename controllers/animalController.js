import Animal from '../models/animalModel.js';

const getAnimals = async (req, res) => {
    try {
        const animals = await Animal.find();
        res.status(200).json(animals);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAnimalById = async (req, res) => {
    try {
        const animal = await Animal.findOne({ id: req.params.id });
        if (!animal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(animal);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createAnimal = async (req, res) => {
    const { imageUrl, name, species, rarity, class: animalClass } = req.body;

    try {
        const lastAnimal = await Animal.findOne().sort({ id: -1 });
        const newId = lastAnimal ? lastAnimal.id + 1 : 1;

        console.log('Datos recibidos para añadir:', { imageUrl, name, species, rarity, class: animalClass });

        const newAnimal = new Animal({ id: newId, imageUrl, name, species, rarity, class: animalClass });
        await newAnimal.save();
        res.status(201).json(newAnimal);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateAnimal = async (req, res) => {
    const { id } = req.params;
    const { imageUrl, name, species, rarity, class: animalClass } = req.body;

    console.log('Datos recibidos para actualizar:', { id, imageUrl, name, species, rarity, class: animalClass });

    try {
        const updatedAnimal = await Animal.findOneAndUpdate({ id }, { imageUrl, name, species, rarity, class: animalClass }, { new: true });
        if (!updatedAnimal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(updatedAnimal);
    } catch (error) {
        console.error('Error al actualizar el animal:', error);
        res.status(400).json({ message: error.message });
    }
};

const deleteAnimal = async (req, res) => {
    const { id } = req.params;

    console.log('ID recibido para eliminar:', id);

    try {
        const deletedAnimal = await Animal.findOneAndDelete({ id });
        if (!deletedAnimal) return res.status(404).json({ message: 'Animal not found' });
        res.status(200).json(deletedAnimal);
    } catch (error) {
        console.error('Error al eliminar el animal:', error);
        res.status(400).json({ message: error.message });
    }
};

export default { getAnimals, getAnimalById, createAnimal, updateAnimal, deleteAnimal };