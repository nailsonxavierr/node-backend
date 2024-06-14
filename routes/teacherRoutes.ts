import express, { Request, Response, NextFunction } from 'express';
import TeacherController  from '../controller/TeacherController';
import createSchema from '../validate/teacher/createSchema';
import updateSchema from '../validate/teacher/updateSchema';
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

router.get('/', TeacherController.index);
router.get('/:id', TeacherController.show);
router.post('/', validateCreate, TeacherController.create);
router.put('/:id', validateUpdate, TeacherController.update);
router.delete('/:id', TeacherController.destroy);

export default router;