import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';
import {TaskPriority, TaskStatus} from "../utils/enums";

export const getTasks = async (req: Request, res: Response) => {
    const {userId} = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'UserId not found' });
    }

    try {
        const tasks = await TaskModel.find({createdBy: userId});
        res.status(200).json({message: "All tasks", data: tasks});
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

export const getTaskByStatus = async (req: Request, res: Response) => {
    const {userId} = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'UserId not found' });
    }

    try {
        const tasks = await TaskModel.find({status: req.params.status, createdBy: userId});
        res.status(200).json({message: "All tasks by status", data: tasks});
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.status(200).json({message: "Task by ID", data: task});
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, priority, deadline } = req.body;

    const {userId} = req.query;

    if (!userId) {
        return res.status(400).json({ error: 'UserId not found' });
    }

    if (!Object.values(TaskStatus).includes(status)) {
        return res.status(400).json({ error: 'Invalid status' });
    }

    if (!Object.values(TaskPriority).includes(priority)) {
        return res.status(400).json({ error: 'Invalid priority' });
    }

    try {
        const newTask = new TaskModel({
            title,
            description,
            status,
            priority,
            deadline,
            createdAt: new Date(),
            createdBy: userId
        });

        await newTask.save();
        res.status(201).json({message: "New Task created", data: newTask});
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, priority, deadline } = req.body;

    try {
        const updatedTask = await TaskModel.findOneAndUpdate(
            { _id: id },
            { title, description, status, priority, deadline },
            { new: true }
        );


        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({message: "Task Updated", task: updatedTask});
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({ error: err.message });
        } else {
            res.status(400).json({ error: 'Unknown error occurred' });
        }
    }
};

export const deleteTask = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;

        const task = await TaskModel.findOneAndDelete({ _id: taskId });

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};

export const updateTaskStatus = async (req: Request, res: Response) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;

        if (!status) {
            return res.status(400).json({ message: 'Status is required' });
        }

        const task = await TaskModel.findOneAndUpdate(
            { id: taskId },
            { status },
            { new: true }
        );

        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({message: "Task status updated", data: task});
    } catch (err) {
        if(err instanceof Error) {
            res.status(500).json({message: "Error occurred", error: err.message});
        }
        res.status(500).json({error: 'Server error' });
    }
};