import { z } from 'zod';

class BaseDTO {

    static schema = z.object({});
    static validate(data: any) {

        const response = this.schema.safeParse(data);
        if (!response.success) {
            const error = response.error.format();
            const errors: string[] = []
            Object.values(error).forEach((err) => {
                if (
                    typeof err === "object" &&
                    err !== null &&
                    "_errors" in err &&
                    Array.isArray(err._errors)
                ) {
                    errors.push(...err._errors);
                }
            });

            return { data: null, error: errors };
        }
        return { data: response.data, error: null };
    }
}


export default BaseDTO;