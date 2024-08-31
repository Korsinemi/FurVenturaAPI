import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: ['usuario', 'admin', 'mod'],
        default: 'usuario'
    }
    /*,
    connections: {
        discord: { type: String }, // Token de Discord
        google: { type: String }, // Token de Google
    }*/
});

const User = model('User', UserSchema);

export default User;
