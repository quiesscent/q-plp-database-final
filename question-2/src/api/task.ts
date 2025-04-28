import express from 'express';
import { completeTask, create, deleteTask, view } from '../controllers/tasks';

const router = express.Router()

router.use('/create', create);
router.use('/view/:id', view);
router.use('/delete/:id', deleteTask);
router.use('/update/:id', completeTask);
// router.use('/view-task', view-task);

export default router;