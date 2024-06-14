// authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import { authenticateUser } from '../service/authService';

export function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.sendStatus(401)
    };

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = authenticateUser(token);
        if(!decodedToken){
            return res.sendStatus(401);  
        }
        next();
    } catch (error) {
        return res.sendStatus(401);
    }
}
