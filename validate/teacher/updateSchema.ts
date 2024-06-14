import { z } from 'zod';

// Esquema de validação para os dados da tabela de eventos
const updateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    employee_id: z.string().min(1, "Employee ID is required"),
    email: z.string().email("Invalid email address"),
});

export default updateSchema;