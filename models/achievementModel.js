import { Schema, model } from 'mongoose';

const achievementSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dateAchieved: {
        type: Date,
        required: false /* Proximamente */
    },
    points: {
        type: Number,
        required: true
    }
});

const Achievement = model('Achievement', achievementSchema);

export default Achievement;