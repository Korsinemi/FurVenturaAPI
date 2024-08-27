import { Schema, model } from 'mongoose';

const animalSchema = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    species: { type: String, required: true },
    rarity: { type: String, required: true },
    class: { type: String, required: true },
    imageUrl: { type: String, required: true }
});

const Animal = model('Animal', animalSchema);

export default Animal;