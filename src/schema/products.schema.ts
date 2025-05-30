import z from "zod";

export const InsertProductSchema = z.object({
    body: z.object({
        name: z.string().min(5, "Name is required"),
        description: z.string().min(1, "Description is required"),
        image: z.string(),
        price: z.number().positive("Price must be a positive number"),
        quantity: z.number().int().nonnegative("Quantity must be a non-negative integer"),
    })
})


// export const UpdateProductSchema = InsertProductSchema.partial()
export const UpdateProductSchema = z.object({
    body: z.object({
        id:z.number().int().nonnegative("ID must be a non-negative integer"),
        uuid: z.string().optional(),
        name: z.string().min(1, "Name is required").optional(),
        description: z.string().min(1, "Description is required").optional(),
        image: z.string().optional(),
        price: z.number().positive("Price must be a positive number").optional(),
        quantity: z.number().int().nonnegative("Quantity must be a non-negative integer").optional(),
    })
})
