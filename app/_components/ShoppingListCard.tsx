"use client";

import {
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
    Card,
} from "@components/ui/Card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@components/ui/DropdownMenu";
import type { ShoppingList } from "@lib/data/entities/ShoppingList";
import { Clock, Ellipsis, ShoppingCart, SquarePen, Trash2 } from "lucide-react";
import { useShoppingListContext } from "@contexts/ShoppingListContext";
import NextLink from "next/link";

interface ShoppingListProps {
    shoppingList: ShoppingList;
    articleCount: number;
}

export default function ShoppingListCard({
    shoppingList,
    articleCount,
}: ShoppingListProps) {
    const {
        setEditShoppingListDialogOpen,
        setEditedShoppingList,
        setDeleteShoppingListDialogOpen,
        setDeletedShoppingList,
    } = useShoppingListContext();

    const handleEditClick = () => {
        setEditedShoppingList(shoppingList.id);
        setEditShoppingListDialogOpen(true);
    };

    const handleDeleteClick = () => {
        setDeletedShoppingList(shoppingList.id);
        setDeleteShoppingListDialogOpen(true);
    };

    return (
        <Card
            className={
                "relative hover:text-accent-foreground hover:bg-accent cursor-pointer"
            }
        >
            <DropdownMenu>
                <DropdownMenuTrigger
                    className={
                        "my-2 mx-3 absolute right-0 hover:bg-accent hover:text-accent-foreground h-6 w-6 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0"
                    }
                >
                    <Ellipsis className={"text-muted-foreground"} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className={"absolute -right-6"}>
                    <DropdownMenuItem onClick={handleEditClick}>
                        <SquarePen /> Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleDeleteClick}>
                        <Trash2 /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            <NextLink href={`/shoppinglist/${shoppingList.id}`}>
                <CardHeader>
                    <CardTitle
                        className={
                            "text-center border-b border-b-muted-foreground pb-2 mb-2"
                        }
                    >
                        {shoppingList.name}
                    </CardTitle>
                    <CardDescription
                        className={
                            "flex flex-row nowrap justify-between items-center"
                        }
                    >
                        <p
                            className={
                                "flex flex-row nowrap items-center gap-x-1"
                            }
                        >
                            <ShoppingCart height={"20"} />
                            {articleCount > 0 ? articleCount : "Empty"}
                        </p>
                        <p
                            className={
                                "flex flex-row nowrap items-center gap-x-1"
                            }
                        >
                            <Clock height={"20"} />
                            {shoppingList.creationDate.getDate() ===
                            new Date().getDate()
                                ? "Today"
                                : shoppingList.creationDate.toLocaleDateString()}
                        </p>
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {shoppingList.description ? (
                        <fieldset
                            className={
                                "border border-muted-foreground p-2 rounded-lg h-fit"
                            }
                        >
                            <legend
                                className={"text-muted-foreground px-2 text-sm"}
                            >
                                Description
                            </legend>
                            <p
                                className={
                                    "m-2 mt-1 max-h-24 text-xs overflow-y-hidden overflow-ellipsis line-clamp-3"
                                }
                            >
                                {shoppingList.description}
                            </p>
                        </fieldset>
                    ) : (
                        <p
                            className={
                                "m-2 mt-1 text-center text-muted-foreground"
                            }
                        >
                            No description
                        </p>
                    )}
                </CardContent>
            </NextLink>
        </Card>
    );
}
