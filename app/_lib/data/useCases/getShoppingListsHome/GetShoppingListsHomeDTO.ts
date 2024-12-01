import { ShoppingList } from "@lib/data/entities";

export interface GetShoppingListsHomeDTO {
    shoppingLists: Array<{
        shoppingList: ShoppingList;
        count: number;
        articleNames: string[];
    }>;
}
