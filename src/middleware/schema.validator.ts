import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError, z } from "zod";

// Schema can now validate body, query, params, etc., in one object
interface ValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  headers?: AnyZodObject;
}

// Options now accept the full schema
interface ValidationOptions {
  schema: ValidationSchema;
  onError?: (error: ZodError, req: Request) => void;
}

export const asyncValidate =
  (options: ValidationOptions) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const { schema, onError } = options;
    try {
      // Validate each part of the request (body, query, params, etc.)
      if (schema.body) {
        req.body = await schema.body.parseAsync(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parseAsync(req.query);
      }
      if (schema.params) {
        req.params = await schema.params.parseAsync(req.params);
      }
      if (schema.headers) {
        req.headers = await schema.headers.parseAsync(req.headers);
      }

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        if (onError) onError(error, req);

        return res.status(400).json({
          success: false,
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
