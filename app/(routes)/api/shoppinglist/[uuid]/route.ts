import { NextResponse, NextRequest } from "next/server";
import { shoppingListRepository } from "@lib/data/repositories";
import { z } from "zod";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { PartialShoppingList } from "@lib/data/entities";

const uuidSchema = z.string().uuid();
const updateShoppingListSchema = z
    .object({
        name: z.string().optional(),
        description: z.string().optional(),
    })
    .refine((data) => data.name || data.description);

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
 * /api/shoppinglist/{uuid}:
 *   get:
 *     summary: Get a shopping list by UUID
 *     tags: [Shopping Lists]
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
 *         description: The shopping list data
 *       400:
 *         description: Invalid UUID
 *       404:
 *         description: Not Found
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
        const shoppingList = await shoppingListRepository.getShoppingListById(
            uuidValidation.data,
        );
        return NextResponse.json(shoppingList);
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
 * /api/shoppinglist/{uuid}:
 *   delete:
 *     summary: Delete a shopping list by UUID
 *     tags: [Shopping Lists]
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
 *         description: Deleted
 *       400:
 *         description: Invalid UUID
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { uuid: string } },
) {
    const uuidValidation = uuidSchema.safeParse(params.uuid);
    if (!uuidValidation.success) {
        return NextResponse.json({ error: "Invalid UUID" }, { status: 400 });
    }
    try {
        await shoppingListRepository.deleteShoppingList(uuidValidation.data);
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

/**
 * @swagger
 * /api/shoppinglist/{uuid}:
 *   patch:
 *     summary: Update a shopping list by UUID
 *     tags: [Shopping Lists]
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Invalid UUID or JSON body
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { uuid: string } },
) {
    const uuidValidation = uuidSchema.safeParse(params.uuid);
    if (!uuidValidation.success) {
        return NextResponse.json({ message: "Invalid UUID" }, { status: 400 });
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

    const bodyValidation = updateShoppingListSchema.safeParse(body);
    if (!bodyValidation.success) {
        return NextResponse.json(
            { error: "Name or description must be provided" },
            { status: 400 },
        );
    }
    const { name, description } = bodyValidation.data;

    try {
        const updateObject: PartialShoppingList = {
            id: uuidValidation.data,
            ...(name && { name }),
            ...(description && { description }),
        };
        await shoppingListRepository.updateShoppingList(updateObject);
        return NextResponse.json({ message: "Updated" }, { status: 200 });
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
