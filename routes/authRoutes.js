import { Router } from 'express';
import { register, login, updateUser } from '../controllers/authController.js'
import authMiddleware from '../middlewares/authMid.js';
const router = Router();

router.post('/register', register);
router.post('/login', login);

router.get('/protected', authMiddleware, (req, res) => {
    res.status(200).json({ mensaje: 'Accediste a una ruta protegida', user: req.user });
});

router.put('/update', authMiddleware, updateUser);

export default router;