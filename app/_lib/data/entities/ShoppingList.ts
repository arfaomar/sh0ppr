export interface ShoppingList {
    id: string;
    name: string;
    description: string | null;
    creationDate: Date;
}

export interface PartialShoppingList extends Partial<Omit<ShoppingList, "id">> {
    id: string;
}
