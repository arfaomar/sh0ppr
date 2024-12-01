"use server";

import { editArticleFormSchema } from "@schemas/editArticleFormSchema";
import { articleRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";

export default async function editArticleAction(
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
        const parsedData = editArticleFormSchema.safeParse({
            articleId: articleId,
            articleName: formData.get("articleName"),
            articleDescription: formData.get("articleDescription"),
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

        await articleRepository.updateArticle({
            id: parsedData.data.articleId,
            name: parsedData.data.articleName,
            description: parsedData.data.articleDescription,
        });
        revalidatePath("/articles/");

        return {
            message: "Article updated successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while updating the article",
            error: true,
        };
    }
}
