import { z } from 'zod'


const saveGameSchema = z.object({
    score: z.number(),
    startedAt: z.iso.datetime(),
    endedAt: z.iso.datetime()
})


export type SaveGame = z.infer<typeof saveGameSchema>;

