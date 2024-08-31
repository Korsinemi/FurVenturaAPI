import { Schema, model } from 'mongoose';

const eventSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    icon: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    /*
    type: {
        type: String,
        required: true
    }, Deprected > Se eliminara como tal en la siguiente version
    */
    rewards: {
        type: String,
        required: true
    },
    participants: {
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    } // 'active' or 'finished'
});

const Event = model('Event', eventSchema);

export default Event;