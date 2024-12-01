import { IArticleInShoppingListRepository } from "@lib/data/interfaces";
import {
    ArticleInShoppingList,
    PartialArticleInShoppingList,
} from "@lib/data/entities";
import { db, articleInShoppingListTable } from "../../../../db";
import { and, eq } from "drizzle-orm";
import isUUIDv4 from "@lib/isUUIDv4";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { ValidationError } from "@lib/errors/ValidationError";
import { NotFoundError } from "@lib/errors/NotFoundError";

export class ArticleInShoppingListRepository
    implements IArticleInShoppingListRepository
{
    async getArticleInShoppingListById(
        shoppingListId: string,
        articleId: number,
    ): Promise<ArticleInShoppingList> {
        try {
            if (!isUUIDv4(shoppingListId)) {
                throw new ValidationError("Invalid shopping list UUID");
            }

            const result = await db
                .select()
                .from(articleInShoppingListTable)
                .where(
                    and(
                        eq(
                            articleInShoppingListTable.shoppingListId,
                            shoppingListId,
                        ),
                        eq(articleInShoppingListTable.articleId, articleId),
                    ),
                );
            if (result.length === 0) {
                throw new NotFoundError("Article not found in shopping list");
            }
            return result[0];
        } catch (error) {
            if (
                error instanceof NotFoundError ||
                error instanceof ValidationError
            ) {
                return Promise.reject(error);
            } // return response or object for nice error msg + look at error boundaries
            return Promise.reject(
                new DatabaseError("Failed to get article in shopping list"),
            );
        }
    }

    async getAllArticlesInShoppingList(
        shoppingListId: string,
    ): Promise<ArticleInShoppingList[]> {
        try {
            if (!isUUIDv4(shoppingListId)) {
                throw new ValidationError("Invalid shopping list UUID");
            }

            const result = await db
                .select()
                .from(articleInShoppingListTable)
                .where(
                    eq(
                        articleInShoppingListTable.shoppingListId,
                        shoppingListId,
                    ),
                );

            return result;
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to get articles in shopping list"),
            );
        }
    }

    async addArticleToShoppingList(
        shoppingListId: string,
        articleId: number,
        amount: number,
    ): Promise<{
        articleId: number;
        shoppingListId: string;
    }> {
        try {
            if (!isUUIDv4(shoppingListId)) {
                throw new ValidationError("Invalid shopping list UUID");
            }

            const existingArticle = await db
                .select()
                .from(articleInShoppingListTable)
                .where(
                    and(
                        eq(
                            articleInShoppingListTable.shoppingListId,
                            shoppingListId,
                        ),
                        eq(articleInShoppingListTable.articleId, articleId),
                    ),
                );

            let result;
            if (existingArticle.length > 0) {
                const newAmount = existingArticle[0].amount + amount;
                if (newAmount <= 0) {
                    result = await db
                        .delete(articleInShoppingListTable)
                        .where(
                            and(
                                eq(
                                    articleInShoppingListTable.shoppingListId,
                                    shoppingListId,
                                ),
                                eq(
                                    articleInShoppingListTable.articleId,
                                    articleId,
                                ),
                            ),
                        )
                        .returning({
                            articleId: articleInShoppingListTable.articleId,
                            shoppingListId:
                                articleInShoppingListTable.shoppingListId,
                        });
                } else {
                    result = await db
                        .update(articleInShoppingListTable)
                        .set({ amount: newAmount })
                        .where(
                            and(
                                eq(
                                    articleInShoppingListTable.shoppingListId,
                                    shoppingListId,
                                ),
                                eq(
                                    articleInShoppingListTable.articleId,
                                    articleId,
                                ),
                            ),
                        )
                        .returning({
                            articleId: articleInShoppingListTable.articleId,
                            shoppingListId:
                                articleInShoppingListTable.shoppingListId,
                        });
                }
            } else {
                result = await db
                    .insert(articleInShoppingListTable)
                    .values({
                        shoppingListId,
                        articleId,
                        amount,
                    })
                    .returning({
                        articleId: articleInShoppingListTable.articleId,
                        shoppingListId:
                            articleInShoppingListTable.shoppingListId,
                    });
            }
            return result[0];
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to add article to shopping list"),
            );
        }
    }

    async deleteArticleInShoppingList(
        shoppingListId: string,
        articleId: number,
    ): Promise<void> {
        try {
            if (!isUUIDv4(shoppingListId)) {
                throw new ValidationError("Invalid shopping list UUID");
            }
            await db
                .delete(articleInShoppingListTable)
                .where(
                    and(
                        eq(articleInShoppingListTable.articleId, articleId),
                        eq(
                            articleInShoppingListTable.shoppingListId,
                            shoppingListId,
                        ),
                    ),
                );
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError(
                    "Failed to delete article from shopping list",
                ),
            );
        }
    }

    async updateArticleInShoppingList(
        updatedArticleInShoppingList: PartialArticleInShoppingList,
    ): Promise<void> {
        try {
            if (!isUUIDv4(updatedArticleInShoppingList.shoppingListId)) {
                throw new ValidationError("Invalid shopping list UUID");
            }
            await db
                .update(articleInShoppingListTable)
                .set(updatedArticleInShoppingList)
                .where(
                    and(
                        eq(
                            articleInShoppingListTable.shoppingListId,
                            updatedArticleInShoppingList.shoppingListId,
                        ),
                        eq(
                            articleInShoppingListTable.articleId,
                            updatedArticleInShoppingList.articleId,
                        ),
                    ),
                );
        } catch (error) {
            if (error instanceof ValidationError) {
                return Promise.reject(error);
            }
            return Promise.reject(
                new DatabaseError("Failed to update article in shopping list"),
            );
        }
    }
}
