import express from 'express';
import { completeTask, create, deleteTask, view } from '../controllers/tasks';
import { isAuthenticated } from "../auth.middlware";
const router = express.Router()

router.use('/create', isAuthenticated ,create);
router.use('/view/:id', isAuthenticated ,view);
router.use('/delete/:id', isAuthenticated ,deleteTask, completeTask);
router.use('/update/:id', isAuthenticated ,create);
// router.use('/view-task', view-task);

export default router;