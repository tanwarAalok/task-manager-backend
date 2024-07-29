import mongoose, { Document, Schema } from 'mongoose';
import {TaskPriority, TaskStatus} from "../utils/enums";

interface Task extends Document {
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    deadline: Date;
    createdAt: Date;
}

const taskSchema: Schema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    status: {
        type: String,
        enum: Object.values(TaskStatus),
        required: true
    },
    priority: {
        type: String,
        enum: Object.values(TaskPriority),
    },
    deadline: { type: Date, required: true },
    createdAt: { type: Date, default: Date.now },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

const TaskModel = mongoose.model<Task>('Task', taskSchema);

export default TaskModel;
