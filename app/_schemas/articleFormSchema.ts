import * as z from "zod";

export const articleFormSchema = z.object({
    articleName: z.string().min(1, "Article name is required"),
    articleDescription: z.string().optional(),
});
