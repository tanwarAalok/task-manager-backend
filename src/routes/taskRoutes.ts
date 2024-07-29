import { Router } from 'express';
import {
    createTask,
    updateTask,
    deleteTask,
    getTasks,
    getTaskById,
    getTaskByStatus
} from '../controllers/taskController';

const router: Router = Router();

router.get('/get/all', getTasks);
router.post('/create', createTask);
router.get('/status/:status', getTaskByStatus);
router.get('/get/:id', getTaskById);
router.put('/update/:id', updateTask);
router.delete('/delete/:id', deleteTask);

export default router;
