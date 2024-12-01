import { ShoppingList } from "@lib/data/entities";
export interface GetShoppingListForDisplayDTO {
    shoppingList: ShoppingList;
    articles: {
        shoppingListId: string;
        articleId: number;
        amount: number;
        status: boolean;
        name: string;
        previewImageUrl: string;
    }[];
}
