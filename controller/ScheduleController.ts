import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

class ScheduleController {
    async index(req: Request, res: Response) {
        try {
            const schedules = await prisma.schedule.findMany({
                include: {
                    teacher: true,
                    subject: true
                }
            });
            res.json(schedules);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving schedules', error });
        }
    }

    async show(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const schedule = await prisma.schedule.findUnique({
                where: { id: Number(id) },
                include: {
                    teacher: true,
                    subject: true
                }
            });
            if (schedule) {
                res.json(schedule);
            } else {
                res.status(404).json({ message: 'Schedule not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving schedule', error });
        }
    }

    async create(req: Request, res: Response) {
        try {
            const data = req.body;

            // Verificar se há algum conflito de agendamento
            const isConflict = await prisma.schedule.findFirst({
                where: {
                    AND: [
                        { OR: [{ start_time: { lte: data.end_time, gte: data.start_time } }, { end_time: { lte: data.end_time, gte: data.start_time } }] }
                    ]
                }
            });

            if (isConflict) {
                return res.status(400).json({ message: 'Schedule conflict detected' });
            }

            // Criar o agendamento se não houver conflito
            const newSchedule = await prisma.schedule.create({
                data: data,
            });

            res.status(201).json(newSchedule);
        } catch (error) {
            res.status(500).json({ message: 'Error creating schedule', error });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body;

            // Verificar se há algum conflito de agendamento
            const isConflict = await prisma.schedule.findFirst({
                where: {
                    AND: [
                        { id: { not: Number(id) } }, // Excluir o próprio agendamento atual da verificação
                        { OR: [{ start_time: { lte: data.end_time, gte: data.start_time } }, { end_time: { lte: data.end_time, gte: data.start_time } }] }
                    ]
                }
            });

            if (isConflict) {
                return res.status(400).json({ message: 'Schedule conflict detected' });
            }

            // Atualizar o agendamento se não houver conflito
            const updatedSchedule = await prisma.schedule.update({
                where: { id: Number(id) },
                data: data,
            });

            res.json(updatedSchedule);
        } catch (error) {
            res.status(500).json({ message: 'Error updating schedule', error });
        }
    }

    async destroy(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await prisma.schedule.delete({
                where: { id: Number(id) },
            });
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ message: 'Error deleting schedule', error });
        }
    }
}

export default new ScheduleController();
