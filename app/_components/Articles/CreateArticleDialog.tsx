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
import CreateArticleDialogForm from "@components/Articles/CreateArticleDialogForm";
import { useArticleContext } from "@contexts/ArticleContext";

export default function CreateArticleDialog() {
    const { createArticleDialogOpen, setCreateArticleDialogOpen } =
        useArticleContext();
    const isDesktop = useMediaQuery("(min-width: 768px)");

    if (isDesktop) {
        return (
            <Dialog
                open={createArticleDialogOpen}
                onOpenChange={setCreateArticleDialogOpen}
            >
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>New Article</DialogTitle>
                        <DialogDescription>
                            Create a new article. Click next to add it to the
                            list.
                        </DialogDescription>
                    </DialogHeader>
                    <CreateArticleDialogForm />
                </DialogContent>
            </Dialog>
        );
    }

    return (
        <Drawer
            open={createArticleDialogOpen}
            onOpenChange={setCreateArticleDialogOpen}
        >
            <DrawerContent>
                <DrawerHeader className="text-left">
                    <DrawerTitle>New Article</DrawerTitle>
                    <DrawerDescription>
                        Create a new article. Click next to add it to the list.
                    </DrawerDescription>
                </DrawerHeader>
                <CreateArticleDialogForm />
                <DrawerFooter className="pt-2">
                    <DrawerClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
}
