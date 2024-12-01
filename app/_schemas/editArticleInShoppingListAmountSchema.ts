import * as z from "zod";

export const editArticleInShoppingListAmountSchema = z.object({
    shoppingListId: z.string().uuid("Invalid shopping list ID").trim(),
    articleId: z
        .number()
        .int("Invalid article ID")
        .positive("Invalid article ID")
        .finite("Invalid article ID"),
    amount: z
        .number()
        .int("Invalid amount")
        .finite("Invalid amount")
        .nonnegative("Invalid amount"),
});
