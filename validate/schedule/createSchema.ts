import { z } from 'zod';

// Esquema de validação para os dados da tabela de eventos
const createSchema = z.object({
    teacher_id: z.number().int().positive("Teacher ID must be a positive integer"),
    subject_id: z.number().int().positive("Subject ID must be a positive integer"),
    start_time: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid start time"),
    end_time: z.string().refine(val => !isNaN(Date.parse(val)), "Invalid end time")
});

export default createSchema;