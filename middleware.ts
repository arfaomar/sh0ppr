import { NextRequest, NextResponse } from "next/server";

export const config = {
    matcher: ["/", "/api/:path*"],
};

export default async function middleware(request: NextRequest) {
    const url = request.nextUrl.pathname;

    if (url.startsWith("/api/")) {
        const articleRegex = /^\/api\/article\/\d+\/?$/;
        const shoppingListRegex =
            /^\/api\/shoppinglist\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/?$/i;
        const shoppingListArticlesRegex =
            /^\/api\/shoppinglist\/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}\/articles\/\d+\/?$/i;

        if (articleRegex.test(url) || shoppingListRegex.test(url)) {
            if (!["GET", "DELETE", "PATCH"].includes(request.method)) {
                return NextResponse.json(
                    { error: "Method Not Allowed" },
                    { status: 405 },
                );
            }
        } else if (shoppingListArticlesRegex.test(url)) {
            if (request.method !== "DELETE") {
                return NextResponse.json(
                    { error: "Method Not Allowed" },
                    { status: 405 },
                );
            }
        } else {
            if (!["GET", "POST"].includes(request.method)) {
                return NextResponse.json(
                    { error: "Method Not Allowed" },
                    { status: 405 },
                );
            }
        }
    }

    return NextResponse.next();
}
