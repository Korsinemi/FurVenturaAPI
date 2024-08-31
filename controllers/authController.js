import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import joi from 'joi';
import jwt from 'jsonwebtoken';

const registerSchema = joi.object({
    username: joi.string().min(3).max(50).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export async function register(req, res) {
    const { error } = registerSchema.validate(req.body);
    if (error) {
        console.log(error)
        return res.status(400).json({ error: error.details[0].message });
    }

    const { username, email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ error: 'El usuario ya existe' });

        user = new User({
            username,
            email,
            password: await bcrypt.hash(password, 10)
        });

        await user.save();
        res.status(201).json({ msg: 'Usuario registrado exitosamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}

const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
});

export async function login(req, res) {
    const { error } = loginSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: 'Credenciales inválidas' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Credenciales inválidas' });

        const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.status(200).json({ msg: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}


const updateUserSchema = joi.object({
    username: joi.string().min(3).max(50),
    email: joi.string().email(),
    password: joi.string().min(6)
});

export async function updateUser(req, res) {
    const { error } = updateUserSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const updates = req.body;

    try {
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10);
        }

        const user = await User.findByIdAndUpdate(req.user.userId, updates, { new: true });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.status(200).json({ msg: 'Datos del usuario actualizados exitosamente', user });
    } catch (error) {
        res.status(500).json({ error: 'Error del servidor' });
    }
}