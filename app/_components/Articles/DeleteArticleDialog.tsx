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
import DeleteArticleDialogForm from "@components/Articles/DeleteArticleDialogForm";
import { useArticleContext } from "@contexts/ArticleContext";

export default function DeleteArticleDialog() {
    const { deleteArticleDialogOpen, setDeleteArticleDialogOpen } =
        useArticleContext();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={deleteArticleDialogOpen}
                onOpenChange={setDeleteArticleDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Are you sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently
                            delete your article.
                        </DialogDescription>
                    </DialogHeader>
                    <DeleteArticleDialogForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={deleteArticleDialogOpen}
            onOpenChange={setDeleteArticleDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>Are you sure?</DrawerTitle>
                    <DrawerDescription>
                        This action cannot be undone. This will permanently
                        delete your article.
                    </DrawerDescription>
                </DrawerHeader>
                <DeleteArticleDialogForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
