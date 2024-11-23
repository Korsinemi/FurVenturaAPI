import Item from '../models/itemModel.js';

const getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getItemById = async (req, res) => {
    try {
        const item = await Item.findOne({ id: Number(req.params.id) });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createItem = async (req, res) => {
    const { name, rarity, type, description, icon, uses, obtetionMethod, isTradeable, isLimited, limitedCopies } = req.body;

    try {
        const lastItem = await Item.findOne().sort({ id: -1 });
        const newId = lastItem ? lastItem.id + 1 : 1;

        const newItem = new Item({ id: newId, name, rarity, type, description, icon, uses, obtetionMethod, isTradeable, isLimited, limitedCopies });
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const updateItem = async (req, res) => {
    const { id } = req.params;
    const { name, rarity, type, description, icon, uses, obtetionMethod, isTradeable, isLimited, limitedCopies } = req.body;

    try {
        const updatedItem = await Item.findOneAndUpdate({ id: Number(id) }, { name, rarity, type, description, icon, uses, obtetionMethod, isTradeable, isLimited, limitedCopies }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const deleteItem = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedItem = await Item.findOneAndDelete({ id: Number(id) });
        if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(deletedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export default { getItems, getItemById, createItem, updateItem, deleteItem };
