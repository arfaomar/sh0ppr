export interface Article {
    id: number;
    name: string;
    description: string | null;
}

export interface PartialArticle extends Partial<Omit<Article, "id">> {
    id: number;
}
