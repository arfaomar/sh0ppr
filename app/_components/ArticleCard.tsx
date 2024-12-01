"use client";
import Image from "next/image";
import {
    Card,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/Card";
import { Button } from "@components/ui/Button";
import { SquarePen, Trash2 } from "lucide-react";
import { useArticleContext } from "@contexts/ArticleContext";

interface ArticleCardProps {
    list: {
        id: number;
        name: string;
        description: string | null;
        previewUrl: string;
        url: string;
    };
}

export default function ArticleCard({ list }: ArticleCardProps) {
    const {
        setDeletedArticle,
        setDeleteArticleDialogOpen,
        setEditArticleDialogOpen,
        setEditedArticle,
    } = useArticleContext();

    const handleEditClick = () => {
        setEditArticleDialogOpen(true);
        setEditedArticle(list.id);
    };

    const handleDeleteClick = () => {
        setDeleteArticleDialogOpen(true);
        setDeletedArticle(list.id);
    };

    return (
        <Card>
            <Image
                src={list.url}
                alt={list.name}
                width={256}
                height={256}
                priority
                className={
                    "rounded-t-lg h-32 w-full center mx-auto object-cover"
                }
            />
            <CardHeader>
                <CardTitle
                    className={"line-clamp-1 overflow-ellipsis text-wrap"}
                >
                    {list.name}
                </CardTitle>
                <CardDescription>
                    {list.description ? list.description : "No Description."}
                </CardDescription>
            </CardHeader>
            <CardFooter className={"w-full"}>
                {" "}
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleEditClick}
                >
                    <SquarePen />
                </Button>{" "}
                <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={handleDeleteClick}
                >
                    <Trash2 />
                </Button>{" "}
            </CardFooter>
        </Card>
    );
}
