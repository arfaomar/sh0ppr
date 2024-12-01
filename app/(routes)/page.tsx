"use server";

import { getShoppingListsHome } from "@lib/data/useCases/getShoppingListsHome";
import ShoppingListContextProvider from "@contexts/ShoppingListContext";
import AddShoppingListCard from "@components/AddShoppingListCard";
import CreateShoppingListDialog from "@components/shoppingList/CreateShoppingListDialog";
import ShoppingListContainer from "@components/ShoppingListContainer";

export default async function Home() {
    const shoppingListData = await getShoppingListsHome.execute();

    return shoppingListData.shoppingLists.length > 0 ? (
        <ShoppingListContainer shoppingListData={shoppingListData} />
    ) : (
        <ShoppingListContextProvider>
            <p className={"text-xl text-muted-foreground text-center m-12"}>
                No shopping lists found. Create your first shopping list to get
                started!
            </p>
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-64">
                <AddShoppingListCard />
                <CreateShoppingListDialog />
            </div>
        </ShoppingListContextProvider>
    );
}
