"use server";

import { shoppingListRepository } from "@lib/data/repositories";
import {editShoppingListActionSchema} from "@schemas/editShoppingListActionSchema";
import {revalidatePath} from "next/cache";

export default async function editShoppingListAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {

    try {
        const parsedData = editShoppingListActionSchema.safeParse({
            shoppingListId: formData.get("shoppingListId"),
            shoppingListName: formData.get("shoppingListName"),
            shoppingListDescription: formData.get("shoppingListDescription"),
        });

        if (!parsedData.success) {
            const errorMessages = parsedData.error.errors.map(
                (error) => error.message,
            );
            return {
                message: errorMessages.join(", "),
                error: true,
            };
        }

        await shoppingListRepository.updateShoppingList({
            id: parsedData.data.shoppingListId,
            name: parsedData.data.shoppingListName,
            description: parsedData.data.shoppingListDescription,
        });

        revalidatePath("/");

        return {
            message: "Shopping list edited successfully",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while editing the shopping list",
            error: true,
        };
    }
}
