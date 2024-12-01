import { NextRequest, NextResponse } from "next/server";
import { articleRepository } from "@lib/data/repositories";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { z } from "zod";
import { PartialArticle } from "@lib/data/entities";

const idSchema = z.number().positive().finite().int();
const updateArticleSchema = z.object({
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
 * /api/article/{id}:
 *   get:
 *     summary: Get an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The article ID
 *     responses:
 *       200:
 *         description: The article data
 *       400:
 *         description: Invalid article id
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const idValidation = idSchema.safeParse(Number(params.id));
    if (!idValidation.success) {
        return NextResponse.json(
            { error: "Invalid article id" },
            { status: 400 },
        );
    }

    try {
        const article = await articleRepository.getArticleById(
            idValidation.data,
        );
        return NextResponse.json(article);
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
 * /api/article/{id}:
 *   patch:
 *     summary: Update an article by ID
 *     tags: [Articles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: The article ID
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
 *         description: Invalid article id or JSON body
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const idValidation = idSchema.safeParse(Number(params.id));
    if (!idValidation.success) {
        return NextResponse.json(
            { error: "Invalid article id" },
            { status: 400 },
        );
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

    const bodyValidation = updateArticleSchema.safeParse(body);
    if (!bodyValidation.success) {
        return NextResponse.json(
            { error: "Name must be provided" },
            { status: 400 },
        );
    }

    const { name, description } = bodyValidation.data;

    try {
        const updatedArticle: PartialArticle = {
            id: idValidation.data,
            ...(name && { name }),
            ...(description && { description }),
        };

        await articleRepository.updateArticle(updatedArticle);
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

/**
 * @swagger
 * /api/article/{id}:
 *   delete:
 *     summary: Delete an article by ID
 *     tags: [Articles]
 *     parameters:
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
 *         description: Invalid article id
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } },
) {
    const idValidation = idSchema.safeParse(Number(params.id));
    if (!idValidation.success) {
        return NextResponse.json(
            { error: "Invalid article id" },
            { status: 400 },
        );
    }

    try {
        await articleRepository.deleteArticle(idValidation.data);
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
