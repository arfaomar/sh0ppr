"use client";
import { createContext, useContext, useState } from "react";

interface ShoppingListContextProps {
    editShoppingListDialogOpen: boolean;
    setEditShoppingListDialogOpen: (
        editShoppingListDialogOpen: boolean,
    ) => void;
    editedShoppingList: string | null;
    setEditedShoppingList: (id: string | null) => void;
    deletedShoppingList: string | null;
    setDeletedShoppingList: (id: string | null) => void;
    deleteShoppingListDialogOpen: boolean;
    setDeleteShoppingListDialogOpen: (
        openDeleteShoppingListDialog: boolean,
    ) => void;
    createShoppingListDialogOpen: boolean;
    setCreateShoppingListDialogOpen: (
        openCreateShoppingListDialog: boolean,
    ) => void;
}

export const ShoppingListContext = createContext<
    ShoppingListContextProps | undefined
>(undefined);

export const useShoppingListContext = () => {
    const context = useContext(ShoppingListContext);
    if (!context) {
        throw new Error(
            "useShoppingListContext must be used within an ShoppingListContextProvider",
        );
    }
    return context;
};

interface ShoppingListProviderProps {
    children: React.ReactNode;
}

export default function ShoppingListContextProvider({
    children,
}: ShoppingListProviderProps) {
    const [editShoppingListDialogOpen, setEditShoppingListDialogOpen] =
        useState(false);
    const [editedShoppingList, setEditedShoppingList] = useState<string | null>(
        null,
    );

    const [deletedShoppingList, setDeletedShoppingList] = useState<
        string | null
    >(null);
    const [deleteShoppingListDialogOpen, setDeleteShoppingListDialogOpen] =
        useState(false);

    const [createShoppingListDialogOpen, setCreateShoppingListDialogOpen] =
        useState(false);

    return (
        <ShoppingListContext.Provider
            value={{
                editShoppingListDialogOpen,
                setEditShoppingListDialogOpen,
                editedShoppingList,
                setEditedShoppingList,
                deletedShoppingList,
                setDeletedShoppingList,
                deleteShoppingListDialogOpen,
                setDeleteShoppingListDialogOpen,
                createShoppingListDialogOpen,
                setCreateShoppingListDialogOpen,
            }}
        >
            {children}
        </ShoppingListContext.Provider>
    );
}
