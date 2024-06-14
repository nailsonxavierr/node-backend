import { z } from 'zod';

// Esquema de validação para os dados de login
const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

export default loginSchema;