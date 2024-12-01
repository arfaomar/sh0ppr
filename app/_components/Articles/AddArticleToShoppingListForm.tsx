"use client";
import { useEffect } from "react";
import { toast } from "sonner";

import { useFormState } from "react-dom";
import addArticleToShoppingListAction from "@actions/addArticleToShoppingListAction";
import { Article } from "@lib/data/entities";
import { LoadingFormButton } from "@components/ui/LoadingFormButton";

interface AddArticleToShoppingListFormProps {
    shoppingListId: string;
    articles: Article[];
}

export default function AddArticleToShoppingListForm({
    shoppingListId,
    articles,
}: AddArticleToShoppingListFormProps) {
    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        addArticleToShoppingListAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (state && "success" in state && state.message !== "") {
            toast.success(state.message);
        }
    }, [state]);

    return (
        <form action={formAction}>
            <select
                name={"articleId"}
                className={
                    "h-10 items-center px-4 py-2 rounded-md mr-4 border bg-background focus:outline-none border-input focus:ring-ring focus:ring-offset-2 text-sm ring-offset-background"
                }
                required
            >
                <option disabled value={""} selected>
                    Select an article
                </option>
                {articles.map((article) => (
                    <option value={article.id} key={article.id}>
                        {article.name}
                    </option>
                ))}
            </select>
            <LoadingFormButton
                type={"submit"}
                name={"shoppingListId"}
                value={shoppingListId}
            >
                Add
            </LoadingFormButton>
        </form>
    );
}
