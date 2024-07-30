import { Request, Response } from 'express';
import UserModel from '../models/userModel';
import jwt from 'jsonwebtoken';


export const signUp = async (req: Request, res: Response) => {
    const { fullname, email, password } = req.body;

    try {
        const user = new UserModel({ fullname, email, password });
        await user.save();
        res.status(201).json({ message: 'User created successfully', data: user });
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

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

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
            expiresIn: '5d',
        });

        const { fullname, _id } = user;

        res.status(200).json({ message: "User logged in successfully", data: { fullname, email, _id  }, token });
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};
