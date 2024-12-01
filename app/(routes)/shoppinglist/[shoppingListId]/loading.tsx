"use server";
import { Spinner } from "@components/ui/Spinner";

export default async function ShoppingListPageLoader() {
    return (
        <Spinner
            size={"large"}
            className={"text-muted-foreground mx-auto mt-24"}
        >
            <span className={"text-muted-foreground"}>
                Loading Your Shopping List...
            </span>
        </Spinner>
    );
}
