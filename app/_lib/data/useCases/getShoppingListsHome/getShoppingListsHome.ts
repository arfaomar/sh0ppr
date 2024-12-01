import { ShoppingListRepository } from "@lib/data/repositories/ShoppingListRepository";
import { ArticleInShoppingListRepository } from "@lib/data/repositories/ArticleInShoppingListRepository";
import { ArticleRepository } from "@lib/data/repositories/ArticleRepository";
import { ShoppingList } from "@lib/data/entities";
import { GetShoppingListsHomeDTO } from "./GetShoppingListsHomeDTO";

export default class GetShoppingListsHome {
    constructor(
        private shoppingListRepository: ShoppingListRepository,
        private articleInShoppingListRepository: ArticleInShoppingListRepository,
        private articleRepository: ArticleRepository,
    ) {}

    async execute(): Promise<GetShoppingListsHomeDTO> {
        const shoppingLists =
            await this.shoppingListRepository.getAllShoppingLists();
        const shoppingListsData: Array<{
            shoppingList: ShoppingList;
            count: number;
            articleNames: string[];
        }> = [];

        for (const list of shoppingLists) {
            const articlesInList =
                await this.articleInShoppingListRepository.getAllArticlesInShoppingList(
                    list.id,
                );

            let count = 0;
            const articleNames: string[] = [];
            const articlePromises = articlesInList.map(
                async (articleInList) => {
                    count += articleInList.amount;
                    const article = await this.articleRepository.getArticleById(
                        articleInList.articleId,
                    );
                    if (article) {
                        articleNames.push(article.name);
                    }
                },
            );

            await Promise.all(articlePromises);

            shoppingListsData.push({
                shoppingList: list,
                count: count,
                articleNames: articleNames,
            });
        }

        return { shoppingLists: shoppingListsData };
    }
}
