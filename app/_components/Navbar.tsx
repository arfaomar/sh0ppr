import NextLink from "next/link";
import { ModeToggle } from "@components/Theme/ModeToggle";
import { Button } from "@components/ui/Button";
import { ArrowRight, List } from "lucide-react";

export default function Navbar() {
    return (
        <header
            className={
                "w-screen bg-primary p-2 flex flex-col md:flex-row flex-wrap justify-between items-center"
            }
        >
            <NextLink
                href="/"
                className={
                    "text-primary-foreground text-3xl no-underline font-bold italic text-start bg-blend m-2"
                }
            >
                sh0ppr
            </NextLink>
            <div className={"flex flex-row nowrap gap-x-2"}>
                <Button
                    asChild
                    variant={"expandIconOutline"}
                    Icon={List}
                    iconPlacement={"right"}
                >
                    <NextLink href="/articles">Articles</NextLink>
                </Button>
                <Button
                    asChild
                    variant={"expandIconOutline"}
                    Icon={ArrowRight}
                    iconPlacement={"right"}
                >
                    <NextLink href="/api-doc">API docs</NextLink>
                </Button>
                <ModeToggle />
            </div>
        </header>
    );
}
