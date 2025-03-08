import { Request, Response, NextFunction } from "express";
import { AnyObjectSchema, ValidationError } from "yup";

const validate =
    (schema: AnyObjectSchema) =>
        async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
            try {
                console.log("body is ", req.body)

                req.body = await schema.validate(req.body, { abortEarly: false, stripUnknown: true });
                next();
            } catch (error) {
                if (error instanceof ValidationError) {
                    return res.status(400).json({ errors: error.errors });
                }
                return res.status(500).json({ message: "Internal Server Error" });
            }
        };

export default validate;
