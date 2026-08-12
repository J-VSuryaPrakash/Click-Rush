import { z } from 'zod';

export const loginSchema = z.object({
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});


export const registerSchema = z.object({
    name: z.string().trim().min(3, { message: 'Name must be at least 3 characters long' }),
    email: z.email({ message: 'Invalid email address' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

export  type LoginFromData = z.infer<typeof loginSchema>;
export  type RegisterFromData = z.infer<typeof registerSchema>;