"use server";

import { articleInShoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export default async function addArticleToShoppingListAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    const addArticleToShoppingListSchema = z.object({
        shoppingListId: z.string().uuid("Invalid shopping list ID").trim(),
        articleId: z
            .number()
            .int("Invalid article ID")
            .positive("Invalid article ID")
            .finite("Invalid article ID"),
    });

    try {
        const articleIdValue = formData.get("articleId");
        const articleId = articleIdValue
            ? parseInt(String(articleIdValue))
            : null;

        const parsedData = addArticleToShoppingListSchema.safeParse({
            shoppingListId: formData.get("shoppingListId"),
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

        await articleInShoppingListRepository.addArticleToShoppingList(
            parsedData.data.shoppingListId,
            parsedData.data.articleId,
            1,
        );

        revalidatePath(`/shoppinglist/${parsedData.data.shoppingListId}`);

        return {
            message: "Article added to shopping list successfully",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "An error has occurred while adding article to shopping list",
            error: true,
        };
    }
}
