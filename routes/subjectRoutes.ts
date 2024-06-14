import express, { Request, Response, NextFunction } from 'express';
import SubjectController  from '../controller/SubjectController';
import createSchema from '../validate/subject/createSchema';
import updateSchema from '../validate/subject/updateSchema';
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

router.get('/', SubjectController.index);
router.get('/:id', SubjectController.show);
router.post('/', validateCreate, SubjectController.create);
router.put('/:id', validateUpdate, SubjectController.update);
router.delete('/:id', SubjectController.destroy);

export default router;