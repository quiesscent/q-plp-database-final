import express from 'express';

import MessageResponse from '../interfaces/MessageResponse';
import authRoutes from './auth';
import taskRoutes from './task';

const router = express.Router();

router.get<{}, MessageResponse>('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏',
  });
});


router.use("/auth", authRoutes);
router.use('/tasks', taskRoutes);
export default router;
