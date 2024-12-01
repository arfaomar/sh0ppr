"use server";

import { articleRepository } from "@lib/data/repositories";
import { Article } from "@lib/data/entities";
import { getImageUrl } from "@lib/getImageUrl";
import ArticleCard from "@components/ArticleCard";
import ArticleContextProvider from "@contexts/ArticleContext";
import EditArticleDialog from "@components/Articles/EditArticleDialog";
import DeleteArticleDialog from "@components/Articles/DeleteArticleDialog";
import AddArticleCard from "@components/AddArticleCard";
import CreateArticleDialog from "@components/Articles/CreateArticleDialog";
export default async function ArticlesPage() {
    const articleList = await articleRepository.getAllArticles();

    const articleListWithURLs = await Promise.all(
        articleList.map(async (list: Article) => {
            const imgData = await getImageUrl(list.name);
            return {
                id: list.id,
                name: list.name,
                description: list.description,
                previewUrl: imgData.previewUrl,
                url: imgData.url,
            };
        }),
    );

    return articleListWithURLs.length > 0 ? (
        <section className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            <ArticleContextProvider>
                <AddArticleCard />
                {articleListWithURLs.map((list) => (
                    <ArticleCard list={list} key={list.id} />
                ))}
                <CreateArticleDialog />
                <EditArticleDialog />
                <DeleteArticleDialog />
            </ArticleContextProvider>
        </section>
    ) : (
        <ArticleContextProvider>
            <p className={"text-xl text-muted-foreground text-center m-12"}>
                No articles found. Create your first article to get started!
            </p>
            <div className="p-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 h-64">
                <AddArticleCard />
                <CreateArticleDialog />
            </div>
        </ArticleContextProvider>
    );
}
