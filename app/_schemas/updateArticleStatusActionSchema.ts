import { z } from "zod";

export const updateArticleStatusActionSchema = z.object({
    shoppingListId: z.string().uuid("Invalid shopping list ID").trim(),
    articleId: z
        .number()
        .int("Invalid article ID")
        .positive("Invalid article ID")
        .finite("Invalid article ID"),
    status: z.boolean(),
});
