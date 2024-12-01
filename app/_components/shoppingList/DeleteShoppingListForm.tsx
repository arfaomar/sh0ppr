"use client";

import { useShoppingListContext } from "@contexts/ShoppingListContext";
import { LoadingFormButton } from "../ui/LoadingFormButton";
import { useFormState } from "react-dom";
import deleteShoppingListAction from "@actions/deleteShoppingListAction";
import { useEffect } from "react";
import { toast } from "sonner";

export default function DeleteShoppingListForm() {
    const {
        deletedShoppingList,
        deleteShoppingListDialogOpen,
        setDeleteShoppingListDialogOpen,
    } = useShoppingListContext();

    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        deleteShoppingListAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (
            state &&
            "success" in state &&
            state.message !== "" &&
            deleteShoppingListDialogOpen
        ) {
            toast.success("Shopping list deleted successfully!");
            setDeleteShoppingListDialogOpen(false);
        }
    }, [state, setDeleteShoppingListDialogOpen, deleteShoppingListDialogOpen]);

    return (
        <form action={formAction}>
            <LoadingFormButton
                variant={"destructive"}
                type={"submit"}
                value={deletedShoppingList ?? ""}
                name="shoppingListId"
                className={"w-full"}
            >
                Delete
            </LoadingFormButton>
        </form>
    );
}
