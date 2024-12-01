"use server";

import { deleteShoppingListActionSchema } from "@schemas/deleteShoppingListActionSchema";
import { shoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";

export default async function deleteShoppingListAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const parsedData = deleteShoppingListActionSchema.safeParse({
            shoppingListId: formData.get("shoppingListId"),
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

        await shoppingListRepository.deleteShoppingList(
            parsedData.data.shoppingListId,
        );
        revalidatePath("/");

        return {
            message: "Shopping list deleted successfully",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while deleting the shopping list",
            error: true,
        };
    }
}
