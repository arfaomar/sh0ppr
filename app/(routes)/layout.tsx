import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../_styles/globals.css";
import Navbar from "@components/Navbar";
import { ThemeProvider } from "@components/Theme/ThemeProvider";
import { Toaster } from "@components/ui/Sonner";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "sh0ppr",
    description: "sh0ppr - a Shopping list app built with Next.js for FWE",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <Navbar />
                    <main>{children}</main>
                    <Toaster position="top-center" richColors />
                </ThemeProvider>
            </body>
        </html>
    );
}
