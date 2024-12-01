import { articleRepository } from "@lib/data/repositories";
import { NextRequest, NextResponse } from "next/server";
import { NotFoundError } from "@lib/errors/NotFoundError";
import { DatabaseError } from "@lib/errors/DatabaseError";
import { z } from "zod";

const createArticleSchema = z.object({
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
 * /api/article:
 *   get:
 *     summary: Get all articles
 *     tags: [Articles]
 *     responses:
 *       200:
 *         description: A list of articles
 *       404:
 *         description: Not Found or Empty
 *       500:
 *         description: Internal Server Error
 */
export async function GET() {
    try {
        const articles = await articleRepository.getAllArticles();
        if (articles.length === 0) {
            return NextResponse.json({ error: "Empty" }, { status: 404 });
        }
        return NextResponse.json(articles);
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
 * /api/article:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
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

    const bodyValidation = createArticleSchema.safeParse(body);
    if (!bodyValidation.success) {
        return NextResponse.json(
            { error: "Name must be provided" },
            { status: 400 },
        );
    }

    const { name, description } = bodyValidation.data;

    try {
        const articleId = await articleRepository.createArticle(
            name,
            description,
        );
        return NextResponse.json({ articleId: articleId }, { status: 201 });
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
