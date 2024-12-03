import { Router } from 'express';
import { register, login } from '../controllers/authController.js'
import { authMiddleware, authenticateRole } from '../middlewares/authMid.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ mensaje: 'Accediste a una ruta protegida', user: req.user });
});

router.get('/admin', authMiddleware, authenticateRole('admin'), (req, res) => {
    res.status(200).json({ mensaje: 'Accediste como administrador', user: req.user });
});

export default router;