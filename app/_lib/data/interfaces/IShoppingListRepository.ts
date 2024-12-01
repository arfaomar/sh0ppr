import { ShoppingList, PartialShoppingList } from "@lib/data/entities";

export interface IShoppingListRepository {
    getAllShoppingLists(): Promise<ShoppingList[]>;
    getShoppingListById(id: string): Promise<ShoppingList>;
    createShoppingList(name: string, description?: string): Promise<string>;
    deleteShoppingList(id: string): Promise<void>;
    updateShoppingList(updatedShoppingList: PartialShoppingList): Promise<void>;
}
