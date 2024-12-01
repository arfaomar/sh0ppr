import {
    ArticleInShoppingList,
    PartialArticleInShoppingList,
} from "@lib/data/entities";

export interface IArticleInShoppingListRepository {
    getArticleInShoppingListById(
        shoppingListId: string,
        articleId: number,
    ): Promise<ArticleInShoppingList>;
    getAllArticlesInShoppingList(
        shoppingListId: string,
    ): Promise<ArticleInShoppingList[]>;
    addArticleToShoppingList(
        shoppingListId: string,
        articleId: number,
        amount: number,
    ): Promise<{ articleId: number; shoppingListId: string }>;
    deleteArticleInShoppingList(
        shoppingListId: string,
        articleId: number,
    ): Promise<void>;
    updateArticleInShoppingList(
        updatedArticleInShoppingList: PartialArticleInShoppingList,
    ): Promise<void>;
}
