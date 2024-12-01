"use server";
import { Spinner } from "@components/ui/Spinner";

export default async function HomePageLoader() {
    return (
        <Spinner
            size={"large"}
            className={"text-muted-foreground mx-auto mt-24"}
        >
            <span className={"text-muted-foreground"}>
                Loading Your Shopping Lists...
            </span>
        </Spinner>
    );
}
