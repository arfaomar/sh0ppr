"use client";

import { Card, CardContent } from "@components/ui/Card";
import { CirclePlus } from "lucide-react";
import { useArticleContext } from "@contexts/ArticleContext";

export default function AddArticleCard() {
    const { setCreateArticleDialogOpen } = useArticleContext();
    return (
        <Card
            className={
                "w-full h-full flex hover:text-accent-foreground text-muted-foreground hover:bg-accent cursor-pointer"
            }
            onClick={() => setCreateArticleDialogOpen(true)}
        >
            <CardContent className={"p-0 h-fit w-fit mx-auto my-auto"}>
                <CirclePlus
                    width={"48"}
                    height={"48"}
                    className={" mx-auto my-2"}
                />
                <p className={"font-semibold"}>Add Article</p>
            </CardContent>
        </Card>
    );
}
