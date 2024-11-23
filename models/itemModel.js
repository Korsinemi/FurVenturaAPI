// itemModel.js
import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    rarity: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String, required: true },
    uses: { type: Number, required: true },
    obtetionMethod: { type: String, required: true },
    isTradeable: { type: Boolean, required: true },
    isLimited: { type: Boolean, required: true },
    limitedCopies: { type: Number }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;
