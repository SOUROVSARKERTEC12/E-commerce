import httpStatus from 'http-status-codes';
import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

interface ValidationSchema {
  body?: AnyZodObject;
  query?: AnyZodObject;
  params?: AnyZodObject;
  headers?: AnyZodObject;
}

interface ValidationOptions {
  schema: ValidationSchema;
  onError?: (error: ZodError, req: Request) => void;
}


export const asyncValidate =
  ({ schema, onError }: ValidationOptions) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      // Helper function to handle nested validation
      const validateNested = async (
        part: "body" | "query" | "params" | "headers",
        data: any
      ) => {
        if (!schema[part]) return data;

        const partSchema = schema[part] as AnyZodObject;
        // Check if schema has its own property matching the part name (nested)
        if (part in partSchema.shape) {
          const result = await partSchema.parseAsync({ [part]: data });
          return result[part];
        }
        return await partSchema.parseAsync(data);
      };

    
      req.body = await validateNested("body", req.body);

      // For read-only properties, create new objects instead of direct assignment
      const validatedQuery = await validateNested("query", req.query);
      const validatedParams = await validateNested("params", req.params);
      const validatedHeaders = await validateNested("headers", req.headers);

      // Merge validated values into request without direct assignment
      Object.assign(req.query, validatedQuery);
      Object.assign(req.params, validatedParams);
      Object.assign(req.headers, validatedHeaders);

      next();
    } catch (error) {
      console.error('Validation error:', error);
      if (error instanceof ZodError) {
        if (onError) onError(error, req);
        const errorDetails = error.errors.map((err) => {
          // Determine location and clean path
          const locations = ["body", "query", "params", "headers"] as const;
          const location =
            locations.find((loc) => schema[loc] && err.path.includes(loc)) ||
            "body";

          // Remove location prefix if it exists
          let cleanPath = err.path.join(".");
          if (err.path[0] === location) {
            cleanPath = err.path.slice(1).join(".") || "(root)";
          }

          // Handle double-nested case (e.g., body.body)
          if (
            err.path.length >= 2 &&
            err.path[0] === location &&
            err.path[1] === location
          ) {
            cleanPath = err.path.slice(2).join(".") || "(root)";
          }

          return {
            location,
            field: cleanPath,
            message: err.message,
            code: err.code,
          };
        });

        res.status(400).json({
          success: false,
          message: "Validation failed",
          errors: errorDetails,
          validated: {
            body: !!schema.body,
            query: !!schema.query,
            params: !!schema.params,
            headers: !!schema.headers,
          },
        });
        return;
      }

      res.status(httpStatus.CONFLICT).json({
        success: false,
        reason: "Validation Error",
      });
      next(error);
    }
  };
