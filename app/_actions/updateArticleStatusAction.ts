"use server";

import { articleInShoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";
import { updateArticleStatusActionSchema } from "@schemas/updateArticleStatusActionSchema";

export default async function updateArticleStatusAction(
    prevState: {
        message: string;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const articleIdValue = formData.get("articleId");
        const articleId = articleIdValue
            ? parseInt(String(articleIdValue))
            : null;
        const parsedData = updateArticleStatusActionSchema.safeParse({
            shoppingListId: formData.get("shoppingListId"),
            articleId: articleId,
            status: formData.get("status") === "true",
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

        await articleInShoppingListRepository.updateArticleInShoppingList({
            shoppingListId: parsedData.data.shoppingListId,
            articleId: parsedData.data.articleId,
            status: parsedData.data.status,
        });

        revalidatePath(`/shoppinglist/${parsedData.data.shoppingListId}`);

        return {
            message: "Article status updated successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while updating the article status",
            error: true,
        };
    }
}
