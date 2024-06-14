import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class SubjectController {
    async index(req: Request, res: Response) {
        try {
            const subjects = await prisma.subject.findMany();
            res.json(subjects);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving subjects', error });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const subject = await prisma.subject.findUnique({
                where: { id: Number(id) },
            });
            if (subject) {
                res.json(subject);
            } else {
                res.status(404).json({ message: 'Subject not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving subject', error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const newSubject = await prisma.subject.create({
                data: data,
            });
            res.status(201).json(newSubject);
        } catch (error) {
            res.status(500).json({ message: 'Error creating subject', error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updatedSubject = await prisma.subject.update({
                where: { id: Number(id) },
                data: data,
            });
            res.json(updatedSubject);
        } catch (error) {
            res.status(500).json({ message: 'Error updating subject', error });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.subject.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting subject', error });
        }
    }
}


export default new SubjectController();
