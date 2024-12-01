import { NextRequest, NextResponse } from "next/server";
import {
    articleInShoppingListRepository,
    articleRepository,
} from "@lib/data/repositories";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { z } from "zod";

const uuidSchema = z.string().uuid();
const createArticleInShoppingListSchema = z.object({
    articleId: z.number().positive().finite().int(),
    quantity: z.number().positive().finite(),
});

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
 * /api/shoppinglist/{uuid}/articles:
 *   get:
 *     summary: Get all articles in a shopping list by UUID
 *     tags: [Shopping List Articles]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The shopping list UUID
 *     responses:
 *       200:
 *         description: A list of articles in the shopping list
 *       400:
 *         description: Invalid UUID
 *       404:
 *         description: Not Found or Empty
 *       500:
 *         description: Internal Server Error
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { uuid: string } },
) {
    const uuidValidation = uuidSchema.safeParse(params.uuid);
    if (!uuidValidation.success) {
        return NextResponse.json({ error: "Invalid UUID" }, { status: 400 });
    }

    try {
        const articlesInShoppingList =
            await articleInShoppingListRepository.getAllArticlesInShoppingList(
                uuidValidation.data,
            );
        if (articlesInShoppingList.length === 0) {
            return NextResponse.json({ error: "Empty" }, { status: 404 });
        }
        return NextResponse.json(articlesInShoppingList);
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

/**
 * @swagger
 * /api/shoppinglist/{uuid}/articles:
 *   post:
 *     summary: Add an article to a shopping list by UUID
 *     tags: [Shopping List Articles]
 *     parameters:
 *       - in: path
 *         name: uuid
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The shopping list UUID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               articleId:
 *                 type: integer
 *               quantity:
 *                 type: number
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid UUID or JSON body
 *       404:
 *         description: Article not found
 *       500:
 *         description: Internal Server Error
 */
export async function POST(
    request: NextRequest,
    { params }: { params: { uuid: string } },
) {
    const uuidValidation = uuidSchema.safeParse(params.uuid);
    if (!uuidValidation.success) {
        return NextResponse.json({ error: "Invalid UUID" }, { status: 400 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 },
        );
    }

    const bodyValidation = createArticleInShoppingListSchema.safeParse(body);
    if (!bodyValidation.success) {
        return NextResponse.json(
            { error: "Article ID and quantity must be provided" },
            { status: 400 },
        );
    }

    const { articleId, quantity } = bodyValidation.data;

    try {
        const article = await articleRepository.getArticleById(articleId);
        if (!article) {
            return NextResponse.json(
                { error: "Article not found" },
                { status: 404 },
            );
        }

        const articleInShoppingList =
            await articleInShoppingListRepository.addArticleToShoppingList(
                uuidValidation.data,
                article.id,
                quantity,
            );
        return NextResponse.json(articleInShoppingList, { status: 201 });
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
