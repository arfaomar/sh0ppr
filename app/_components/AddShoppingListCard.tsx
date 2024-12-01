"use client";

import { Card, CardContent } from "@components/ui/Card";
import { CirclePlus } from "lucide-react";
import { useShoppingListContext } from "@contexts/ShoppingListContext";

export default function AddShoppingListCard() {
    const { setCreateShoppingListDialogOpen } = useShoppingListContext();
    return (
        <Card
            className={
                "w-full h-full flex hover:text-accent-foreground text-muted-foreground hover:bg-accent cursor-pointer"
            }
            onClick={() => setCreateShoppingListDialogOpen(true)}
        >
            <CardContent className={"p-0 h-fit w-fit mx-auto my-auto"}>
                <CirclePlus
                    width={"48"}
                    height={"48"}
                    className={" mx-auto my-2"}
                />
                <p className={"font-semibold"}>Add List</p>
            </CardContent>
        </Card>
    );
}
