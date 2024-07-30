import { Router } from 'express';
import {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTaskById,
    getTaskByStatus, updateTaskStatus, getBoardByUserId
} from '../controllers/taskController';

const router: Router = Router();

router.get('/get/all', getTasks);
router.get('/get/board/:userId', getBoardByUserId);
router.post('/create', createTask);
router.get('/status/:status', getTaskByStatus);
router.get('/get/:id', getTaskById);
router.put('/update/:id', updateTask);
router.put('/update/status/:id', updateTaskStatus);
router.delete('/delete/:id', deleteTask);

export default router;
