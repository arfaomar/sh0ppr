"use client";

import {
    PDFDownloadLink,
    Document,
    Page,
    View,
    Text as PdfText,
    StyleSheet,
} from "@react-pdf/renderer";
import { GetShoppingListForDisplayDTO } from "@lib/data/useCases/getShoppingListForDisplay/GetShoppingListForDisplayDTO";
import { Button } from "@components/ui/Button";
import { Download } from "lucide-react";

interface PdfDownloadProps {
    shoppingListArticlesData?: GetShoppingListForDisplayDTO;
}

export default function PdfDownload({
    shoppingListArticlesData,
}: PdfDownloadProps) {
    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontFamily: "Helvetica",
            fontSize: 12,
        },
        header: {
            fontSize: 18,
            marginBottom: 12,
            color: "#333",
        },
        listContainer: {
            marginVertical: 10,
            marginTop: 24,
        },
        listItem: {
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            borderBottom: "1px solid #aaa",
            paddingTop: 8,
            paddingBottom: 8,
        },
        title: {
            fontSize: 14,
            fontWeight: "bold",
            color: "#000",
        },
        description: {
            fontSize: 14,
            color: "#666",
        },
    });

    return (
        <Button
            variant={"expandIcon"}
            Icon={Download}
            iconPlacement={"right"}
            className={"px-8"}
        >
            {" "}
            <PDFDownloadLink
                document={
                    <Document>
                        <Page size="A4" style={styles.page}>
                            <PdfText style={styles.header}>
                                {shoppingListArticlesData?.shoppingList.name}
                            </PdfText>
                            <PdfText style={styles.description}>
                                {
                                    shoppingListArticlesData?.shoppingList
                                        .description
                                }
                            </PdfText>
                            <View style={styles.listContainer}>
                                {shoppingListArticlesData?.articles.map(
                                    (article) => (
                                        <View
                                            style={styles.listItem}
                                            key={article.articleId}
                                        >
                                            <PdfText style={styles.title}>
                                                {article.name}
                                            </PdfText>
                                            <PdfText style={styles.description}>
                                                Amount: {article.amount}
                                            </PdfText>
                                        </View>
                                    ),
                                )}
                            </View>
                        </Page>
                    </Document>
                }
                className={"text-primary-foreground"}
                fileName={
                    "sh0ppr-" +
                    shoppingListArticlesData?.shoppingList.name +
                    ".pdf"
                }
            >
                Download PDF
            </PDFDownloadLink>
        </Button>
    );
}
