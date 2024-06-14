import express, { Request, Response, NextFunction } from 'express';
import loginSchema from '../validate/auth/loginSchema';
import AuthController from '../controller/AuthController';

const router = express.Router();

// Middleware de validação para a rota de criação
const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  try {
    loginSchema.parse(req.body);
    next();
  } catch (error: any) {
    res.status(400).json({ message: error.errors });
  }
};


router.post('/login', validateLogin, AuthController.login);
// router.post('/', cr, ScheduleController.create);


export default router;