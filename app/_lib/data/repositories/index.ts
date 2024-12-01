import { ArticleRepository } from "@lib/data/repositories/ArticleRepository";
import { ShoppingListRepository } from "@lib/data/repositories/ShoppingListRepository";
import { ArticleInShoppingListRepository } from "@lib/data/repositories/ArticleInShoppingListRepository";

export const articleRepository = new ArticleRepository();
export const shoppingListRepository = new ShoppingListRepository();
export const articleInShoppingListRepository =
    new ArticleInShoppingListRepository();
