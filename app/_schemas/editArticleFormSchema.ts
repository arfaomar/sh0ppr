import * as z from "zod";

export const editArticleFormSchema = z.object({
    articleId: z
        .number()
        .int("Invalid article ID")
        .positive("Invalid article ID")
        .finite("Invalid article ID"),
    articleName: z.string().min(1, "Article name is required"),
    articleDescription: z.string().optional(),
});
