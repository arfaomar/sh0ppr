import {
    shoppingListRepository,
    articleInShoppingListRepository,
    articleRepository,
} from "@lib/data/repositories";
import { GetShoppingListForDisplayDTO } from "@lib/data/useCases/getShoppingListForDisplay/GetShoppingListForDisplayDTO";
import { getImageUrl } from "@lib/getImageUrl";

export default async function getShoppingListForDisplay(
    uuid: string,
): Promise<GetShoppingListForDisplayDTO> {
    try {
        const shoppingList =
            await shoppingListRepository.getShoppingListById(uuid);
        const articlesInShoppingList =
            await articleInShoppingListRepository.getAllArticlesInShoppingList(
                uuid,
            );

        const articlesWithNames = await Promise.all(
            articlesInShoppingList.map(async (articleInList) => {
                const article = await articleRepository.getArticleById(
                    articleInList.articleId,
                );
                const imgData = await getImageUrl(article.name);

                return {
                    shoppingListId: articleInList.shoppingListId,
                    articleId: articleInList.articleId,
                    amount: articleInList.amount,
                    status: articleInList.status,
                    name: article.name,
                    previewImageUrl: imgData.previewUrl,
                };
            }),
        );

        return {
            shoppingList,
            articles: articlesWithNames,
        };
    } catch (error) {
        console.error("Error fetching shopping list for display:", error);
        throw error;
    }
}
