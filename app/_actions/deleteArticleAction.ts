"use server";

import { articleRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";
import { deleteArticleFormSchema } from "@schemas/deleteArticleFormSchema";

export default async function deleteArticleAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const articleIdValue = formData.get("articleId");
        const articleId = articleIdValue
            ? parseInt(String(articleIdValue))
            : null;
        const parsedData = deleteArticleFormSchema.safeParse({
            articleId: articleId,
        });

        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(
                (error) => error.message,
            );
            return {
                message: errorMessages.join(", "),
                error: true,
            };
        }

        await articleRepository.deleteArticle(parsedData.data.articleId);

        revalidatePath("/articles/");

        return {
            message: "Article deleted successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while deleting the article",
            error: true,
        };
    }
}
