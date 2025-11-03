"use server";
import { WebPDFLoader } from "@langchain/community/document_loaders/web/pdf";

export default async function parsePDF(input) {
  // Normalize input to a string URL
  const url =
    typeof input === "string"
      ? input
      : input?.url || input?.originalFileUrl || null;

  if (!url || typeof url !== "string") {
    throw new Error("Invalid PDF URL for parsing");
  }

  const response = await fetch(url);
  const blob = await response.blob();

  const loader = new WebPDFLoader(blob);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("\n");
}
