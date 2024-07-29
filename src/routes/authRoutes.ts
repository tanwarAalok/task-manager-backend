import { Router } from 'express';
import { signUp, logIn } from '../controllers/authController';

const router = Router();

// Sign up route
router.post('/signup', signUp);

// Login route
router.post('/login', logIn);

export default router;
