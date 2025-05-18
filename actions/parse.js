"use server";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export default async function parsePDF(url) {
  const response = await fetch(url);
  const blob = await response.blob();

  const loader = new PDFLoader(blob);
  const docs = await loader.load();
  return docs.map((doc) => doc.pageContent).join("/n");
}
