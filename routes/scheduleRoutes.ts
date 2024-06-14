import express, { Request, Response, NextFunction } from 'express';
import ScheduleController  from '../controller/ScheduleController';
import createSchema from '../validate/schedule/createSchema';
import updateSchema from '../validate/schedule/updateSchema';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.use(authMiddleware);

// Middleware de validação para a rota de criação
const validateCreate = (req: Request, res: Response, next: NextFunction) => {
  try {
    createSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors });
  }
};

// Middleware de validação para a rota de atualização
const validateUpdate = (req: Request, res: Response, next: NextFunction) => {
  try {
    updateSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors });
  }
};

router.get('/', ScheduleController.index);
router.get('/:id', ScheduleController.show);
router.post('/', validateCreate, ScheduleController.create);
router.put('/:id', validateUpdate, ScheduleController.update);
router.delete('/:id', ScheduleController.destroy);

export default router;