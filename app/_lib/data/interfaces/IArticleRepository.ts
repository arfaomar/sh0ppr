import { Article, PartialArticle } from "@lib/data/entities";

export interface IArticleRepository {
    getAllArticles(): Promise<Article[]>;
    getArticleById(id: number): Promise<Article>;
    createArticle(name: string, description?: string): Promise<number>;
    deleteArticle(id: number): Promise<void>;
    updateArticle(updatedArticle: PartialArticle): Promise<void>;
}
