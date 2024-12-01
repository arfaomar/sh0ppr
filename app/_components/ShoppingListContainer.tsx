"use client";

import ShoppingListContextProvider from "@contexts/ShoppingListContext";
import AddShoppingListCard from "@components/AddShoppingListCard";
import CreateShoppingListDialog from "@components/shoppingList/CreateShoppingListDialog";
import EditShoppingListDialog from "@components/shoppingList/EditShoppingListDialog";
import DeleteShoppingListDialog from "@components/shoppingList/DeleteShoppingListDialog";
import ShoppingListCard from "@components/ShoppingListCard";
import { GetShoppingListsHomeDTO } from "@lib/data/useCases/getShoppingListsHome";
import { useState } from "react";
import { Input } from "@components/ui/Input";
import { Search } from "lucide-react";

interface ShoppingListContainerProps {
    shoppingListData: GetShoppingListsHomeDTO;
}

export default function ShoppingListContainer({
    shoppingListData,
}: ShoppingListContainerProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const filteredShoppingLists = shoppingListData.shoppingLists.filter(
        (list) =>
            list.shoppingList.name
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            list.shoppingList.description
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            list.articleNames.some((articleName) =>
                articleName.toLowerCase().includes(searchTerm.toLowerCase()),
            ),
    );

    return (
        <>
            <ShoppingListContextProvider>
                <section className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    <div
                        className={
                            "flex flex-row items-center md:w-1/2 lg:w-1/3 xl:w-1/4 mb-8 mx-auto col-span-1 md:col-span-2 lg:col-span-3 xl:col-span-4"
                        }
                    >
                        <Search className={"mr-2"} />
                        <Input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search shopping lists by Name, Description or Article..."
                        />
                    </div>
                    <AddShoppingListCard />
                    <CreateShoppingListDialog />
                    {filteredShoppingLists.length > 0 ? (
                        filteredShoppingLists.map((list) => (
                            <ShoppingListCard
                                key={list.shoppingList.id}
                                shoppingList={list.shoppingList}
                                articleCount={list.count}
                            />
                        ))
                    ) : (
                        <p
                            className={
                                "text-xl text-muted-foreground text-center m-12"
                            }
                        >
                            No results found based on the input
                        </p>
                    )}

                    <EditShoppingListDialog />
                    <DeleteShoppingListDialog />
                </section>
            </ShoppingListContextProvider>
        </>
    );
}
