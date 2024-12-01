import GetShoppingListsHome from "@lib/data/useCases/getShoppingListsHome/getShoppingListsHome";
import { GetShoppingListsHomeDTO } from "@lib/data/useCases/getShoppingListsHome/GetShoppingListsHomeDTO";
import {
    shoppingListRepository,
    articleInShoppingListRepository,
    articleRepository,
} from "@lib/data/repositories";

const getShoppingListsHome = new GetShoppingListsHome(
    shoppingListRepository,
    articleInShoppingListRepository,
    articleRepository,
);

export { getShoppingListsHome };
export type { GetShoppingListsHomeDTO };
