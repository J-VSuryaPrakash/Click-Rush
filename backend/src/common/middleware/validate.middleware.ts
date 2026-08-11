import type { Request, Response, NextFunction } from "express";
import ApiError from "../utils/ApiError.js";

const validate = (DTOClass: any) => {

    return (req: Request, res: Response, next: NextFunction) => {
        const { data, error } = DTOClass.validate(req.body);
        if (error) {
            throw ApiError.invalidData(error.join(", "));
        }
        req.body = data;
        next();

    }
}

export default validate;