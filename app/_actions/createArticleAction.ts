"use server";

import { articleFormSchema } from "@schemas/articleFormSchema";
import { articleRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";

export default async function createArticleAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const parsedData = articleFormSchema.safeParse({
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

        await articleRepository.createArticle(
            parsedData.data.articleName,
            parsedData.data.articleDescription,
        );

        revalidatePath("/articles/");

        return {
            message: "Article created successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while creating the article",
            error: true,
        };
    }
}
