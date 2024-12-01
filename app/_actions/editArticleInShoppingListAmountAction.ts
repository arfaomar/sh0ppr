"use server";

import { articleInShoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";
import { editArticleInShoppingListAmountSchema } from "@schemas/editArticleInShoppingListAmountSchema";

export default async function editArticleInShoppingListAmountAction(
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
        const amountValue = formData.get("amount");
        const amount = amountValue ? parseInt(String(amountValue)) : null;

        const parsedData = editArticleInShoppingListAmountSchema.safeParse({
            shoppingListId: formData.get("shoppingListId"),
            articleId: articleId,
            amount: amount,
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
        if (parsedData.data.amount <= 0) {
            await articleInShoppingListRepository.deleteArticleInShoppingList(
                parsedData.data.shoppingListId,
                parsedData.data.articleId,
            );

            revalidatePath(`/shoppinglist/${parsedData.data.shoppingListId}`);
            return {
                message: "Article in shopping list deleted successfully",
            };
        }

        await articleInShoppingListRepository.updateArticleInShoppingList({
            shoppingListId: parsedData.data.shoppingListId,
            articleId: parsedData.data.articleId,
            amount: parsedData.data.amount,
        });

        revalidatePath(`/shoppinglist/${parsedData.data.shoppingListId}`);

        return {
            message: "Article in shopping list amount updated successfully",
        };
    } catch (error) {
        console.error(error);
        return {
            message:
                "An error has occurred while update article amount in shopping list",
            error: true,
        };
    }
}
