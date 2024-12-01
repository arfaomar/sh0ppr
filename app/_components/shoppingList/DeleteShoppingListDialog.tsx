"use client";

import { Button } from "@components/ui/Button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@components/ui/Dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@components/ui/Drawer";

import { useMediaQuery } from "usehooks-ts";

import { useShoppingListContext } from "@contexts/ShoppingListContext";
import DeleteShoppingListForm from "@components/shoppingList/DeleteShoppingListForm";

export default function DeleteShoppingListDialog() {
    const { deleteShoppingListDialogOpen, setDeleteShoppingListDialogOpen } =
        useShoppingListContext();

    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={deleteShoppingListDialogOpen}
                onOpenChange={setDeleteShoppingListDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your shopping list and remove its data from
                            our servers.
                        </DialogDescription>
                    </DialogHeader>
                    <DeleteShoppingListForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={deleteShoppingListDialogOpen}
            onOpenChange={setDeleteShoppingListDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Are you sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone. This will permanently
                        delete your shopping list and remove its data from our
                        servers.
                    </DrawerDescription>
                </DrawerHeader>
                <div className={"px-4"}>
                    <DeleteShoppingListForm />
                </div>
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
