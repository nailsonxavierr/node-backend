import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class TeacherController {
  async index(req: Request, res: Response) {
    try {
      const teachers = await prisma.teacher.findMany();
      res.json(teachers);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving teachers', error });
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const teacher = await prisma.teacher.findUnique({
        where: { id: Number(id) },
      });
      if (teacher) {
        res.json(teacher);
      } else {
        res.status(404).json({ message: 'Teacher not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving teacher', error });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = req.body;
      const newTeacher = await prisma.teacher.create({
        data: data,
      });
      res.status(201).json(newTeacher);
    } catch (error) {
      res.status(500).json({ message: 'Error creating teacher', error });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedTeacher = await prisma.teacher.update({
        where: { id: Number(id) },
        data: data,
      });
      res.json(updatedTeacher);
    } catch (error) {
      res.status(500).json({ message: 'Error updating teacher', error });
    }
  }

  async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await prisma.teacher.delete({
        where: { id: Number(id) },
      });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: 'Error deleting teacher', error });
    }
  }
}

export default new TeacherController();
