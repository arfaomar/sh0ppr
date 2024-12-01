import * as z from "zod";

export const deleteShoppingListActionSchema = z.object({
    shoppingListId: z.string().uuid("Invalid shopping list ID").trim(),
});
