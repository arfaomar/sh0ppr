import { z } from "zod";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { articleInShoppingListRepository } from "@lib/data/repositories";
import { NextResponse, NextRequest } from "next/server";

const uuidSchema = z.string().uuid();
const idSchema = z.number().positive().finite().int();

/**
 * @swagger
 * tags:
 *   - name: Articles
 *     description: Endpoints related to articles
 *   - name: Shopping Lists
 *     description: Endpoints related to shopping lists
 *   - name: Shopping List Articles
 *     description: Endpoints related to articles in shopping lists
 */

/**
 * @swagger
 * /api/shoppinglist/{uuid}/articles/{id}:
 *   delete:
 *     summary: Delete an article from a shopping list by UUID and article ID
 *     tags: [Shopping List Articles]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The shopping list UUID
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: Deleted
 *       400:
 *         description: Invalid shopping list UUID or article ID
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(
    request: NextRequest,
    {
        params,
    }: {
        params: { uuid: string; id: string };
    },
) {
    const uuidValidation = uuidSchema.safeParse(params.uuid);
    const idValidation = idSchema.safeParse(Number(params.id));

    if (!uuidValidation.success) {
        return NextResponse.json(
            { error: "Invalid shopping list UUID" },
            { status: 400 },
        );
    }

    if (!idValidation.success) {
        return NextResponse.json(
            { error: "Invalid article id" },
            { status: 400 },
        );
    }

    try {
        await articleInShoppingListRepository.deleteArticleInShoppingList(
            uuidValidation.data,
            idValidation.data,
        );
        return NextResponse.json({ message: "Deleted" }, { status: 200 });
    } catch (error) {
        if (error instanceof NotFoundError) {
            return NextResponse.json({ error: "Not Found" }, { status: 404 });
        } else if (error instanceof DatabaseError) {
            return NextResponse.json(
                { error: "Internal DB Error" },
                { status: 500 },
            );
        } else {
            return NextResponse.json(
                { error: "Internal Server Error" },
                { status: 500 },
            );
        }
    }
}
