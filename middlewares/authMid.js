import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

export const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    const token = authHeader.replace('Bearer ', ''); // Elimina el prefijo "Bearer "

    try {
        const verified = jwt.verify(token, 'your_jwt_secret');
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
};

export const authenticateRole = (requiredRole) => async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado, token no proporcionado' });
    }

    const token = authHeader.replace('Bearer ', ''); // Elimina el prefijo "Bearer "

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        const user = await User.findById(decoded.userId);
        if (!user) return res.status(401).json({ error: 'Token inválido' });

        if (user.role !== requiredRole) {
            return res.status(403).json({ error: 'Privilegios insuficientes' });
        }

        req.user = user; // Asigna el usuario verificado a req.user
        next(); // Solo llama a next() después de todas las verificaciones
    } catch (error) {
        res.status(400).json({ error: 'Token no válido' });
    }
};
