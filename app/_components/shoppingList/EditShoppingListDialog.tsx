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
import EditShoppingListForm from "@components/shoppingList/EditShoppingListForm";

import { useShoppingListContext } from "@contexts/ShoppingListContext";

export default function EditShoppingListDialog() {
    const { editShoppingListDialogOpen, setEditShoppingListDialogOpen } =
        useShoppingListContext();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={editShoppingListDialogOpen}
                onOpenChange={setEditShoppingListDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Shopping List</DialogTitle>
                        <DialogDescription>
                            Make changes to your Shopping List. Click save when
                            you are done.
                        </DialogDescription>
                    </DialogHeader>
                    <EditShoppingListForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={editShoppingListDialogOpen}
            onOpenChange={setEditShoppingListDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Shopping List</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your Shopping List here. Click save when
                        you are done.
                    </DrawerDescription>
                </DrawerHeader>
                <EditShoppingListForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
