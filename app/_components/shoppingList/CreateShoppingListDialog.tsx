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
import CreateShoppingListForm from "@components/shoppingList/CreateShoppingListForm";

import { useShoppingListContext } from "@contexts/ShoppingListContext";

export default function CreateShoppingListDialog() {
    const { createShoppingListDialogOpen, setCreateShoppingListDialogOpen } =
        useShoppingListContext();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={createShoppingListDialogOpen}
                onOpenChange={setCreateShoppingListDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Shopping List</DialogTitle>
                        <DialogDescription>
                            Make a new Shopping List. Click next to see it and
                            add items.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateShoppingListForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={createShoppingListDialogOpen}
            onOpenChange={setCreateShoppingListDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Shopping List</DrawerTitle>
                    <DrawerDescription>
                        Make a new Shopping List. Click next to see it and add
                        items.
                    </DrawerDescription>
                </DrawerHeader>
                <CreateShoppingListForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
