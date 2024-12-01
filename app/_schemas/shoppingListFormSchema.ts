import * as z from "zod";

export const shoppingListFormSchema = z.object({
    shoppingListName: z
        .string()
        .trim()
        .min(1, "Name is required")
        .max(15, "Name must be at most 15 characters"),
    shoppingListDescription: z
        .string()
        .trim()
        .max(120, "Description must be at most 120 characters")
        .optional(),
});