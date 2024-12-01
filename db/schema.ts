import {
    boolean,
    check,
    index,
    integer,
    pgTable,
    primaryKey,
    serial,
    smallint,
    timestamp,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const articleTable = pgTable("article", {
    id: serial().primaryKey(),
    name: varchar({ length: 50 }).notNull(),
    description: varchar({ length: 50 }),
});

export const shoppingListTable = pgTable("shopping_list", {
    id: uuid().primaryKey().defaultRandom(),
    name: varchar({ length: 50 }).notNull(),
    description: varchar({ length: 50 }),
    creationDate: timestamp({ withTimezone: true }).defaultNow().notNull(),
});

export const articleInShoppingListTable = pgTable(
    "article_in_shopping_list",
    {
        shoppingListId: uuid()
            .references(() => shoppingListTable.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        articleId: integer()
            .references(() => articleTable.id, {
                onDelete: "cascade",
                onUpdate: "cascade",
            })
            .notNull(),
        amount: smallint().notNull(),
        status: boolean().notNull().default(false),
    },
    (table) => ({
        pk: primaryKey({ columns: [table.shoppingListId, table.articleId] }),
        checkConstraint: check("amount_check1", sql`${table.amount} > 0`),
        idxShoppingListId: index("idx_shopping_list_id").on(
            table.shoppingListId,
        ),
        idxArticleId: index("idx_article_id").on(table.articleId),
    }),
);
