import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';

// Sign up controller
export const signUp = async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body;

    try {
        const user = new UserModel({ fullname, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Login controller
export const logIn = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET || 'your_jwt_secret', {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};
