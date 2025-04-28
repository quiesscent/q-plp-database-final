import express from 'express';
import { create } from '../controllers/tasks';
import { isAuthenticated } from "../auth.middlware";
const router = express.Router()

router.use('/create', isAuthenticated ,create);
// router.use('/view-task', view-task);

export default router;