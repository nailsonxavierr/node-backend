import { z } from 'zod';

// Esquema de validação para os dados da tabela de eventos
const createSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export default createSchema;