import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { getToken } from '../service/authService';

const prisma = new PrismaClient();

class AuthController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    if(!(email == "marcacaosala@gmail.com" && password == "I7$t-6z_594'{ZQ]6f_")){
      res.status(404).json({ message: 'credenciais invalidas' });
    }

    try {
      const token = await getToken(email);
      if (!token) {
        return res.status(401).json({ message: 'Email or password is incorrect' });
      }

      res.json({ token });
    } catch (error) {
      console.error('Error logging in:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async register(req: Request, res: Response) {
    try {
      const data = req.body;
    } catch (error) {
    }
  }
}

export default new AuthController();
