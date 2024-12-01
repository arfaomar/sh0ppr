"use client";

import { useArticleContext } from "@contexts/ArticleContext";
import { LoadingFormButton } from "../ui/LoadingFormButton";
import { useFormState } from "react-dom";
import { useEffect } from "react";
import { toast } from "sonner";
import deleteArticleAction from "@actions/deleteArticleAction";

export default function DeleteArticleDialogForm() {
    const {
        deletedArticle,
        deleteArticleDialogOpen,
        setDeleteArticleDialogOpen,
    } = useArticleContext();

    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(deleteArticleAction, initialState);

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (
            state &&
            "success" in state &&
            state.message !== "" &&
            deleteArticleDialogOpen
        ) {
            toast.success("Article deleted successfully!");
            setDeleteArticleDialogOpen(false);
        }
    }, [state, setDeleteArticleDialogOpen, deleteArticleDialogOpen]);

    return (
        <form action={formAction}>
            <LoadingFormButton
                variant={"destructive"}
                type={"submit"}
                value={deletedArticle ?? ""}
                name="articleId"
                className={"w-full"}
            >
                Delete
            </LoadingFormButton>
        </form>
    );
}
