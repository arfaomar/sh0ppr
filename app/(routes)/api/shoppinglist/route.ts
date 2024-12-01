import { NextRequest, NextResponse } from "next/server";
import { shoppingListRepository } from "@lib/data/repositories";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { z } from "zod";

const createShoppingListSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
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
 * /api/shoppinglist:
 *   get:
 *     summary: Get all shopping lists
 *     tags: [Shopping Lists]
 *     responses:
 *       200:
 *         description: A list of shopping lists
 *       404:
 *         description: Not Found or Empty
 *       500:
 *         description: Internal Server Error
 */
export async function GET() {
    try {
        const shoppingLists =
            await shoppingListRepository.getAllShoppingLists();

        if (shoppingLists.length === 0) {
            return NextResponse.json({ error: "Empty" }, { status: 404 });
        }
        return NextResponse.json(shoppingLists);
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
 * /api/shoppinglist:
 *   post:
 *     summary: Create a new shopping list
 *     tags: [Shopping Lists]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Invalid JSON body or name not provided
 *       500:
 *         description: Internal Server Error
 */
export async function POST(request: NextRequest) {
    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            { error: "Invalid JSON body" },
            { status: 400 },
        );
    }

    const bodyValidation = createShoppingListSchema.safeParse(body);
    if (!bodyValidation.success) {
        return NextResponse.json(
            { error: "Name must be provided" },
            { status: 400 },
        );
    }

    const { name, description } = bodyValidation.data;

    try {
        const shoppingListUuid =
            await shoppingListRepository.createShoppingList(name, description);
        return NextResponse.json(
            { shoppingListUuid: shoppingListUuid },
            { status: 201 },
        );
    } catch (error) {
        if (error instanceof DatabaseError) {
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
