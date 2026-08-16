import z  from 'zod';
import BaseDTO from '../../../common/dto/base.dto.js';


class ScoreDTO extends BaseDTO{

    static schema = z.object({
        score: z.number().int().min(0),
    })

}


export type ScoreType = z.infer<typeof ScoreDTO.schema>;
export default ScoreDTO;