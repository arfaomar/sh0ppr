import * as z from "zod";

export const deleteArticleFormSchema = z.object({
    articleId: z
        .number()
        .int("Invalid article ID")
        .positive("Invalid article ID")
        .finite("Invalid article ID"),
});
