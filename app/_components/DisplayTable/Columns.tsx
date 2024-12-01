"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { Checkbox } from "@components/ui/Checkbox";
import { LoadingFormButton } from "@components/ui/LoadingFormButton";
import { useFormState } from "react-dom";
import deleteArticleInShoppingListAction from "@actions/deleteArticleInShoppingListAction";
import { useEffect } from "react";
import { toast } from "sonner";
import { Input } from "@components/ui/Input";
import editArticleInShoppingListAmountAction from "@actions/editArticleInShoppingListAmountAction";
import { Row } from "@tanstack/react-table";
import updateArticleStatusAction from "@actions/updateArticleStatusAction";

export type DisplayArticle = {
    shoppingListId: string;
    articleId: number;
    amount: number;
    status: boolean;
    name: string;
    previewImageUrl: string;
};

interface CellProps {
    row: Row<DisplayArticle>;
}

const AmountCell: React.FC<CellProps> = ({ row }) => {
    const amount = row.original.amount;
    const shoppingListId = row.original.shoppingListId;
    const articleId = row.original.articleId;

    const initialState: {
        message: string;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        editArticleInShoppingListAmountAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        }
    }, [state]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newAmount = event.target.value;
        const formData = new FormData();
        formData.append("shoppingListId", shoppingListId);
        formData.append("articleId", String(articleId));
        formData.append("amount", newAmount);
        formAction(formData);
    };

    return (
        <form action={formAction}>
            <Input
                type={"number"}
                value={amount}
                onChange={handleChange}
                min={0}
                required
                className={"w-fit"}
            />
        </form>
    );
};

const RemoveCell: React.FC<CellProps> = ({ row }) => {
    const articleId = row.original.articleId;
    const shoppingListId = row.original.shoppingListId;
    const initialState: {
        message: string;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        deleteArticleInShoppingListAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (state && "success" in state && state.message !== "") {
            toast.success("Article removed from shopping list successfully!");
        }
    }, [state]);

    return (
        <form action={formAction}>
            <input
                type={"hidden"}
                name={"shoppingListId"}
                value={shoppingListId}
            />
            <LoadingFormButton
                variant={"ghost"}
                size={"icon"}
                type={"submit"}
                name={"articleId"}
                value={articleId}
            >
                <Trash2 />
            </LoadingFormButton>
        </form>
    );
};

const SelectCell: React.FC<CellProps> = ({ row }) => {
    const articleId = row.original.articleId;
    const shoppingListId = row.original.shoppingListId;
    const status = row.original.status;

    const initialState: {
        message: string;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        updateArticleStatusAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        }
    }, [state]);

    const handleChange = (value: boolean) => {
        const formData = new FormData();
        formData.append("shoppingListId", shoppingListId);
        formData.append("articleId", String(articleId));
        formData.append("status", String(value));
        formAction(formData);
    };

    return (
        <form action={formAction}>
            <Checkbox
                checked={status}
                onCheckedChange={handleChange}
                aria-label="Select row"
            />
        </form>
    );
};

export const columns: ColumnDef<DisplayArticle>[] = [
    {
        id: "select",
        header: "",
        cell: SelectCell,
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
            const status = row.original.status;
            return (
                <p className={"w-28"}>
                    {status ? "Purchased" : "Not Purchased"}
                </p>
            );
        },
    },
    {
        header: "Image",
        id: "Image",
        cell: ({ row }) => (
            <Image
                src={row.original.previewImageUrl}
                alt={row.original.name}
                width={64}
                height={64}
                priority
                className={"rounded-lg h-16 w-16 object-cover"}
            />
        ),
    },
    {
        accessorKey: "name",
        header: "Name",
    },
    {
        accessorKey: "amount",
        header: "Amount",
        cell: AmountCell,
    },
    {
        header: "Remove",
        id: "remove",
        cell: RemoveCell,
    },
];
