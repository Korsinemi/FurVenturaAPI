import Item from '../models/itemModel.js';
import Inventory from '../models/inventoryModel.js';

const checkItemExists = async (req, res, next) => {
    const { itemName } = req.body;

    try {
        const item = await Item.findOne({ name: itemName });
        if (!item) return res.status(400).json({ message: 'Item does not exist in the list' });

        req.item = item; // Guardar el item para usarlo en la siguiente función
        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const checkAndRemoveDeletedItem = async (req, res, next) => {
    const { id } = req.params;

    try {
        const item = await Item.findById(id);
        if (item) return next(); // Si el item existe, continuar con el borrado

        await Inventory.updateMany(
            { 'items.itemName': itemName },
            { $pull: { items: { itemName } } }
        );

        next();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export default { checkItemExists, checkAndRemoveDeletedItem };
