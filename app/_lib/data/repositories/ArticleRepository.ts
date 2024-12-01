import { db, articleTable } from "../../../../db";
import { eq } from "drizzle-orm";
import { Article, PartialArticle } from "@lib/data/entities";
import { IArticleRepository } from "@lib/data/interfaces";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { NotFoundError } from "@lib/errors/NotFoundError";

export class ArticleRepository implements IArticleRepository {
    async getAllArticles(): Promise<Article[]> {
        try {
            const result = await db.select().from(articleTable);
            return result;
        } catch (error) {
            if (error instanceof NotFoundError) {
                return Promise.reject(error);
            }
            return Promise.reject(new DatabaseError("Failed to get articles"));
        }
    }

    async getArticleById(id: number): Promise<Article> {
        try {
            const result = await db
                .select()
                .from(articleTable)
                .where(eq(articleTable.id, id));
            if (result.length === 0) {
                throw new NotFoundError("Article not found");
            }
            return result[0];
        } catch (error) {
            if (error instanceof NotFoundError) {
                return Promise.reject(error);
            }
            return Promise.reject(new DatabaseError("Failed to get article"));
        }
    }

    async createArticle(name: string, description?: string): Promise<number> {
        try {
            const [articleId] = await db
                .insert(articleTable)
                .values({
                    name,
                    description: description ? description : null,
                })
                .returning({ articleId: articleTable.id });
            return articleId.articleId;
        } catch {
            return Promise.reject(
                new DatabaseError("Failed to create article"),
            );
        }
    }

    async deleteArticle(id: number): Promise<void> {
        try {
            await db.delete(articleTable).where(eq(articleTable.id, id));
        } catch {
            return Promise.reject(
                new DatabaseError("Failed to delete article"),
            );
        }
    }

    async updateArticle(updatedArticle: PartialArticle): Promise<void> {
        try {
            await db
                .update(articleTable)
                .set(updatedArticle)
                .where(eq(articleTable.id, updatedArticle.id));
        } catch {
            return Promise.reject(
                new DatabaseError("Failed to update article"),
            );
        }
    }
}
