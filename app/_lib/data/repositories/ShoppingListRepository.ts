import { IShoppingListRepository } from "@lib/data/interfaces";
import { PartialShoppingList, ShoppingList } from "@lib/data/entities";
import { db, shoppingListTable } from "../../../../db";
import { eq } from "drizzle-orm";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { ValidationError } from "@lib/errors/ValidationError";
import isUUIDv4 from "@lib/isUUIDv4";

export class ShoppingListRepository implements IShoppingListRepository {
    async getAllShoppingLists(): Promise<ShoppingList[]> {
        try {
            const result = await db.select().from(shoppingListTable);
            return result;
        } catch (error) {
            if (error instanceof NotFoundError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to get shopping lists"),
            );
        }
    }

    async getShoppingListById(id: string): Promise<ShoppingList> {
        try {
            if (!isUUIDv4(id)) {
                throw new ValidationError("Invalid shopping list UUID");
            }

            const result = await db
                .select()
                .from(shoppingListTable)
                .where(eq(shoppingListTable.id, id));

            if (result.length === 0) {
                throw new NotFoundError("Shopping list not found");
            }
            return result[0];
        } catch (error) {
            if (
                error instanceof NotFoundError ||
                error instanceof ValidationError
            ) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to get shopping list"),
            );
        }
    }

    async createShoppingList(
        name: string,
        description?: string,
    ): Promise<string> {
        try {
            const [id] = await db
                .insert(shoppingListTable)
                .values({
                    name,
                    description: description ? description : null,
                    creationDate: new Date(),
                })
                .returning({ id: shoppingListTable.id });
            return id.id;
        } catch {
            return Promise.reject(
                new DatabaseError("Failed to create shopping list"),
            );
        }
    }

    async deleteShoppingList(id: string): Promise<void> {
        try {
            if (!isUUIDv4(id)) {
                throw new ValidationError("Invalid shopping list UUID");
            }
            await db
                .delete(shoppingListTable)
                .where(eq(shoppingListTable.id, id));
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to delete shopping list"),
            );
        }
    }

    async updateShoppingList(
        updatedShoppingList: PartialShoppingList,
    ): Promise<void> {
        try {
            if (!isUUIDv4(updatedShoppingList.id)) {
                throw new ValidationError("Invalid shopping list UUID");
            }
            await db
                .update(shoppingListTable)
                .set(updatedShoppingList)
                .where(eq(shoppingListTable.id, updatedShoppingList.id));
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to update shopping list"),
            );
        }
    }
}
