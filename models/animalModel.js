import { Schema, model } from 'mongoose';

const animalSchema = new Schema({
    imageUrl: {
        type: String,
        required: true
    },
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        required: true
    },
    rarity: {
        type: String,
        required: true
    },
    class: {
        type: String,
        required: true
    }
});

const Animal = model('Animal', animalSchema);

export default Animal;