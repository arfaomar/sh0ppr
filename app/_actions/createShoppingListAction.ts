"use server";

import { shoppingListFormSchema } from "@schemas/shoppingListFormSchema";
import { shoppingListRepository } from "@lib/data/repositories";
import { revalidatePath } from "next/cache";

export default async function createShoppingListAction(
    prevState: {
        message: string;
        success?: boolean;
        error?: boolean;
    },
    formData: FormData,
) {
    try {
        const parsedData = shoppingListFormSchema.safeParse({
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

        await shoppingListRepository.createShoppingList(
            parsedData.data.shoppingListName,
            parsedData.data.shoppingListDescription,
        );

        revalidatePath("/");

        return {
            message: "Shopping list created successfully!",
            success: true,
        };
    } catch (error) {
        console.error(error);
        return {
            message: "An error has occurred while creating the shopping list",
            error: true,
        };
    }
}
