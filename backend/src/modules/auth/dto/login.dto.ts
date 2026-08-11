import z from 'zod'
import BaseDTO from '../../../common/dto/base.dto.js';


class LoginDTO extends BaseDTO{

    static schema = z.object({
        email: z.email().toLowerCase(),
        password: z.string().min(8)
    })

}

export type LoginSchema = z.infer<typeof LoginDTO.schema>;

export default LoginDTO;