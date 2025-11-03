import { jsPDF } from "jspdf";

export default function DownloadSummary({ summaryText, title }) {
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFont("Helvetica", "bold");
    doc.setFontSize(16);
    doc.text(title || "PDF Summary", 10, 10);

    doc.setFont("Helvetica", "normal");
    doc.setFontSize(12);

    const lines = doc.splitTextToSize(summaryText, 180);
    doc.text(lines, 10, 30);

    doc.save(`${title || "summary"}.pdf`);
  };

  return (
    <button
      onClick={generatePDF}
      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      Download Summary PDF
    </button>
  );
}
