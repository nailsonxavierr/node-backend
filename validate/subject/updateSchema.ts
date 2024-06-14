import { z } from 'zod';

// Esquema de validação para os dados da tabela de eventos
const updateSchema = z.object({
    name: z.string().min(1, "Name is required"),
});

export default updateSchema;