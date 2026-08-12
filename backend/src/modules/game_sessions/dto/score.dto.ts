import z  from 'zod';
import BaseDTO from '../../../common/dto/base.dto.js';


class ScoreDTO extends BaseDTO{

    static schema = z.object({
        score: z.number().min(0),
        startedAt: z.iso.datetime().transform((val) => new Date(val)),
        endedAt: z.iso.datetime().transform((val) => new Date(val))
    })

}


export type ScoreType = z.infer<typeof ScoreDTO.schema>;
export default ScoreDTO;