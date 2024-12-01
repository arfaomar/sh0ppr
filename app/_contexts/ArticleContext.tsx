"use client";
import { createContext, useContext, useState } from "react";

interface ArticleContextProps {
    editArticleDialogOpen: boolean;
    setEditArticleDialogOpen: (editArticleDialogOpen: boolean) => void;
    editedArticle: number | null;
    setEditedArticle: (id: number | null) => void;
    deletedArticle: number | null;
    setDeletedArticle: (id: number | null) => void;
    deleteArticleDialogOpen: boolean;
    setDeleteArticleDialogOpen: (openDeleteArticleDialog: boolean) => void;
    createArticleDialogOpen: boolean;
    setCreateArticleDialogOpen: (openCreateArticleDialog: boolean) => void;
}

export const ArticleContext = createContext<ArticleContextProps | undefined>(
    undefined,
);

export const useArticleContext = () => {
    const context = useContext(ArticleContext);
    if (!context) {
        throw new Error(
            "useArticleContext must be used within an ArticleContextProvider",
        );
    }
    return context;
};

interface ArticleProviderProps {
    children: React.ReactNode;
}

export default function ArticleContextProvider({
    children,
}: ArticleProviderProps) {
    const [editArticleDialogOpen, setEditArticleDialogOpen] = useState(false);
    const [editedArticle, setEditedArticle] = useState<number | null>(null);

    const [deletedArticle, setDeletedArticle] = useState<number | null>(null);
    const [deleteArticleDialogOpen, setDeleteArticleDialogOpen] =
        useState(false);

    const [createArticleDialogOpen, setCreateArticleDialogOpen] =
        useState(false);

    return (
        <ArticleContext.Provider
            value={{
                editArticleDialogOpen,
                setEditArticleDialogOpen,
                editedArticle,
                setEditedArticle,
                deletedArticle,
                setDeletedArticle,
                deleteArticleDialogOpen,
                setDeleteArticleDialogOpen,
                createArticleDialogOpen,
                setCreateArticleDialogOpen,
            }}
        >
            {children}
        </ArticleContext.Provider>
    );
}
