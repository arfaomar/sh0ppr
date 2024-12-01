"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useRef } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import editShoppingListAction from "@actions/editShoppingListAction";
import { useShoppingListContext } from "@contexts/ShoppingListContext";
import { shoppingListFormSchema } from "@schemas/shoppingListFormSchema";
import { Textarea } from "@components/ui/Textarea";
import { LoadingFormButton } from "@components/ui/LoadingFormButton";

export default function EditShoppingListForm() {
    const {
        editedShoppingList,
        setEditShoppingListDialogOpen,
        editShoppingListDialogOpen,
    } = useShoppingListContext();

    const form = useForm<z.infer<typeof shoppingListFormSchema>>({
        resolver: zodResolver(shoppingListFormSchema),
    });

    const initialState: {
        message: string;
        success?: boolean;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(
        editShoppingListAction,
        initialState,
    );

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (
            state &&
            "success" in state &&
            state.message !== "" &&
            editShoppingListDialogOpen
        ) {
            toast.success("Shopping list updated successfully!");
            setEditShoppingListDialogOpen(false);
        }
    }, [state, setEditShoppingListDialogOpen, editShoppingListDialogOpen]);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <FormField
                    control={form.control}
                    name="shoppingListName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Insert Shopping List name"
                                    type="text"
                                    id={"shoppingListName"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Name of your Shopping List
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="shoppingListDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Insert Description"
                                    id={"shoppingListDescription"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Edit the description of your Shopping List
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <LoadingFormButton
                    value={editedShoppingList ?? ""}
                    name="shoppingListId"
                    type="submit"
                    className={"w-full"}
                >
                    Save
                </LoadingFormButton>
            </form>
        </Form>
    );
}
