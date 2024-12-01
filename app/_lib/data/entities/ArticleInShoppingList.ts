export interface ArticleInShoppingList {
    shoppingListId: string;
    articleId: number;
    amount: number;
    status: boolean;
}

export interface PartialArticleInShoppingList
    extends Partial<
        Omit<ArticleInShoppingList, "shoppingListId" | "articleId">
    > {
    shoppingListId: string;
    articleId: number;
}
