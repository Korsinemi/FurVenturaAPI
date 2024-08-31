import { Schema, model } from 'mongoose';

const characterSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    level: {
        type: Number,
        required: true
    }
});

const Character = model('Character', characterSchema);

export default Character;