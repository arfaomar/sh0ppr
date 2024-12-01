"use server";

import { articleInShoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";
import { deleteArticleInShoppingListActionSchema } from "@schemas/deleteArticleInShoppingListActionSchema";

export default async function deleteArticleInShoppingListAction(
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

        const parsedData = deleteArticleInShoppingListActionSchema.safeParse({
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

        await articleInShoppingListRepository.deleteArticleInShoppingList(
            parsedData.data.shoppingListId,
            parsedData.data.articleId,
        );

        revalidatePath(`/shoppinglist/${parsedData.data.shoppingListId}`);

        return {
            message: "Article removed from shopping list successfully",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "An error has occurred while removing article from shopping list",
            error: true,
        };
    }
}
