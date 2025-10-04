// hooks/use-pdf-download.ts
import { useState } from "react";
import { toast } from "react-toastify";
import {
  downloadInsightAsPDF,
  isPDFGenerationSupported,
} from "@/lib/pdf-utils";
import { InsightContent } from "@/content/insights-content";

export function usePDFDownload() {
  const [isGenerating, setIsGenerating] = useState(false);

  const downloadPDF = async (insight: InsightContent) => {
    // Check if PDF generation is supported
    if (!isPDFGenerationSupported()) {
      toast.error("PDF generation is not supported in your browser.");
      return;
    }

    setIsGenerating(true);

    try {
      await downloadInsightAsPDF(insight);
      toast.success(`"${insight.title}" downloaded successfully!`);
    } catch (error) {
      console.error("PDF download error:", error);
      toast.error("Failed to download PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    downloadPDF,
    isGenerating,
  };
}
