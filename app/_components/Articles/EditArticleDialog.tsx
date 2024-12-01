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
import EditArticleDialogForm from "@components/Articles/EditArticleDialogForm";
import { useArticleContext } from "@contexts/ArticleContext";

export default function EditArticleDialog() {
    const { editArticleDialogOpen, setEditArticleDialogOpen } =
        useArticleContext();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={editArticleDialogOpen}
                onOpenChange={setEditArticleDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit Article</DialogTitle>
                        <DialogDescription>
                            Make changes to your article. Click save when you
                            are done.
                        </DialogDescription>
                    </DialogHeader>
                    <EditArticleDialogForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={editArticleDialogOpen}
            onOpenChange={setEditArticleDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Edit Article</DrawerTitle>
                    <DrawerDescription>
                        Make changes to your article. Click save when you are
                        done.
                    </DrawerDescription>
                </DrawerHeader>
                <EditArticleDialogForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
