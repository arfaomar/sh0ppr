"use server";

import { columns } from "@components/DisplayTable/Columns";
import DataTable from "@components/DisplayTable/DataTable";
import getShoppingListForDisplay from "@lib/data/useCases/getShoppingListForDisplay/getShoppingListForDisplay";
import { articleRepository } from "@lib/data/repositories";
import AddArticleToShoppingListForm from "@components/Articles/AddArticleToShoppingListForm";

import dynamic from "next/dynamic";

const PdfDownload = dynamic(() => import("@components/PdfDownload"), {
    ssr: false,
});

export default async function ShoppingListPage({
    params,
}: {
    params: { shoppingListId: string };
}) {
    const shoppingListArticlesData = await getShoppingListForDisplay(
        params.shoppingListId,
    );

    const articles = await articleRepository.getAllArticles();

    return (
        <section>
            <div className={"mx-12 mt-6 grid grid-cols-3 items-center"}>
                <div className={"text-start"}>
                    <h3 className={"text-3xl"}>
                        {shoppingListArticlesData.shoppingList.name}
                    </h3>
                    {shoppingListArticlesData.shoppingList.description !==
                        null &&
                    shoppingListArticlesData.shoppingList.description ? (
                        <p className={"text-muted-foreground text-sm"}>
                            {shoppingListArticlesData.shoppingList.description}
                        </p>
                    ) : (
                        <p className={"text-muted-foreground text-sm italic"}>
                            No Description
                        </p>
                    )}
                </div>
                <div className={"text-center"}>
                    <AddArticleToShoppingListForm
                        shoppingListId={params.shoppingListId}
                        articles={articles}
                    />
                </div>
                <div className={"text-muted-foreground text-sm text-end"}>
                    <PdfDownload
                        shoppingListArticlesData={shoppingListArticlesData}
                    />{" "}
                    <br className={"my-2"} />
                    Creation date:{" "}
                    {shoppingListArticlesData.shoppingList.creationDate.toLocaleDateString()}
                </div>
            </div>
            <hr className={"mt-4 mx-12"} />
            <DataTable
                data={shoppingListArticlesData.articles}
                columns={columns}
            />
        </section>
    );
}
