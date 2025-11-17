"use client";
import { useUserSync } from "@/hooks/useUserSync";
import { useState, useEffect } from "react";
import Link from "next/link";
import { FileText, Calendar, Eye } from "lucide-react";

const UserPDFs = () => {
  const { user, dbUser, isLoaded, isSynced } = useUserSync();
  const [pdfs, setPdfs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserPDFs = async () => {
      if (!isSynced || !user) return;

      try {
        const response = await fetch("/api/get-user-pdfs");
        const data = await response.json();

        if (data.success) {
          setPdfs(data.pdfFiles);
        }
      } catch (error) {
        console.error("Failed to fetch PDFs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserPDFs();
  }, [isSynced, user]);

  return (
    <div className="w-full pt-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Your PDF Files
        </h2>

        {pdfs.length === 0 ? (
          <div className="text-center text-white/70">
            <FileText size={48} className="mx-auto mb-4 opacity-50" />
            <p>No PDFs uploaded yet.</p>
            <Link
              href="/upload-pdf"
              className="text-purple-400 hover:text-purple-300 underline"
            >
              Upload your first PDF
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pdfs.map((pdf) => (
              <div
                key={pdf.id}
                className="bg-white/5 backdrop-blur-sm border border-purple-400/20 rounded-lg p-4 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <FileText
                    size={24}
                    className="text-purple-400 flex-shrink-0"
                  />
                  <span className="text-xs text-white/50">
                    {new Date(pdf.uploadedAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="font-semibold text-white mb-2 truncate">
                  {pdf.fileName}
                </h3>

                <div className="flex items-center text-sm text-white/70 mb-3">
                  <Calendar size={14} className="mr-1" />
                  {new Date(pdf.uploadedAt).toLocaleDateString()}
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/generate-summary/${user.id}?pdfId=${pdf.id}`}
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm text-center transition-colors"
                  >
                    <Eye size={14} className="inline mr-1" />
                    View
                  </Link>

                  {pdf.summaryText && (
                    <Link
                      href={`/summary/${pdf.id}`}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm text-center transition-colors"
                    >
                      Summary
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserPDFs;
