import { z } from 'zod';


export const TokenSchema = z.object({
    id: z.uuid(),
    email: z.email()
});

export type TokenPayload = z.infer<typeof TokenSchema>;