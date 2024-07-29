import { Request, Response } from 'express';
import TaskModel from '../models/taskModel';
import {TaskPriority, TaskStatus} from "../utils/enums";

export const getTasks = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find();
        res.status(200).json({message: "All tasks", tasks: tasks});
    } catch (err) {
        res.status(500).json({message: "Error occurred"});
    }
};

export const getTaskByStatus = async (req: Request, res: Response) => {
    try {
        const tasks = await TaskModel.find({status: req.params.status});
        res.json(tasks);
    } catch (err) {
        res.status(500).json({message: "Error occurred"});
    }
};

export const getTaskById = async (req: Request, res: Response) => {
    try {
        const task = await TaskModel.findById(req.params.id);
        res.json(task);
    } catch (err) {
        res.status(500).json({message: "Error occurred"});
    }
};

export const createTask = async (req: Request, res: Response) => {
    const { title, description, status, priority, deadline } = req.body;

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
        });

        await newTask.save();
        res.status(201).json(newTask);
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: 'Server error' });
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
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
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
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ message: 'Error deleting task', error });
    }
};

