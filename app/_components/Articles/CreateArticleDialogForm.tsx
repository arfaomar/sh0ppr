"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useFormState } from "react-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@components/ui/Button";
import { useEffect, useRef } from "react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@components/ui/Form";
import { Input } from "@components/ui/Input";
import createArticleAction from "@actions/createArticleAction";
import { useArticleContext } from "@contexts/ArticleContext";
import { articleFormSchema } from "@schemas/articleFormSchema";
import { useFormStatus } from "react-dom";
import { Textarea } from "@components/ui/Textarea";

export default function CreateArticleDialogForm() {
    const { setCreateArticleDialogOpen, createArticleDialogOpen } =
        useArticleContext();

    const form = useForm<z.infer<typeof articleFormSchema>>({
        resolver: zodResolver(articleFormSchema),
    });

    const initialState: {
        message: string;
        error?: boolean;
    } = {
        message: "",
    };

    const [state, formAction] = useFormState(createArticleAction, initialState);

    const { pending } = useFormStatus();

    useEffect(() => {
        if (state && "error" in state && state.message !== "") {
            toast.error(state.message);
        } else if (state && state.message !== "" && createArticleDialogOpen) {
            toast.success("Article created successfully!");
            setCreateArticleDialogOpen(false);
        }
    }, [state, setCreateArticleDialogOpen, createArticleDialogOpen]);

    const formRef = useRef<HTMLFormElement>(null);

    return (
        <Form {...form}>
            <form
                ref={formRef}
                action={formAction}
                className="space-y-8 max-w-3xl mx-auto py-10"
            >
                <FormField
                    control={form.control}
                    name="articleName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Insert Article name"
                                    type="text"
                                    id={"articleName"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Name of your Article
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="articleDescription"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Insert Description"
                                    className="resize-none"
                                    id={"articleDescription"}
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Description of your Article
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type={"submit"} disabled={pending} className={"w-full"}>
                    Create
                </Button>
            </form>
        </Form>
    );
}
