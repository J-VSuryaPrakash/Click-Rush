import z from 'zod';
import BaseDTO from '../../../common/dto/base.dto.js';
class RegisterDTO extends BaseDTO {
    static schema = z.object({
        name: z
            .string()
            .trim()
            .toLowerCase()
            .min(3, { error: "Name should be at least 3 characters" })
            .max(50, { error: "Name should be at most 50 characters" }),

        email: z
            .email({ error: "Invalid email address" }),

        password: z
            .string()
            .min(8, { error: "Password should be at least 8 characters" })
    });
}

export type RegisterSchema = z.infer<typeof RegisterDTO.schema>;

export default RegisterDTO;