import { jsPDF } from "jspdf";

export async function downloadInsightAsPDF(insight: any): Promise<void> {
  try {
    // Create new PDF document
    const doc = new jsPDF();

    // Set initial coordinates
    let yPosition = 20;
    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - 2 * margin;

    // Add logo
    try {
      // Convert the public path to an absolute URL
      const logoUrl = window.location.origin + "/public/politrack.png";
      const response = await fetch(logoUrl);
      const blob = await response.blob();
      const imgData = await blobToBase64(blob);

      doc.addImage(imgData, "PNG", margin, yPosition, 40, 20);
      yPosition += 30; // Space after logo
    } catch (error) {
      console.warn("Could not load logo, continuing without it");
      // Continue without logo if there's an error
    }

    // Add title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    const titleLines = doc.splitTextToSize(insight.title, contentWidth);
    doc.text(titleLines, margin, yPosition);
    yPosition += titleLines.length * 10 + 15;

    // Add metadata - with safe property access
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const metadata = [
      `Publication Date: ${insight.date || "N/A"}`,
      `Category: ${insight.type || "N/A"}`,
      `Pages: ${insight.content?.pages || "N/A"}`,
      `Language: ${insight.content?.language || "English"}`,
      insight.featured ? "Featured Report" : "",
    ].filter(Boolean);

    metadata.forEach((line) => {
      doc.text(line, margin, yPosition);
      yPosition += 8;
    });

    yPosition += 15;

    // Add description
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Overview", margin, yPosition);
    yPosition += 10;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    const descLines = doc.splitTextToSize(insight.description, contentWidth);
    doc.text(descLines, margin, yPosition);
    yPosition += descLines.length * 6 + 20;

    // Add sections if they exist
    if (insight.content?.sections) {
      insight.content.sections.forEach((section: any, sectionIndex: number) => {
        // Check if we need a new page
        if (yPosition > 250) {
          doc.addPage();
          yPosition = 20;
        }

        doc.setFontSize(16);
        doc.setFont("helvetica", "bold");
        doc.text(section.title, margin, yPosition);
        yPosition += 12;

        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");

        section.content.forEach((paragraph: string) => {
          const paragraphLines = doc.splitTextToSize(paragraph, contentWidth);

          // Check if paragraph fits on current page
          if (yPosition + paragraphLines.length * 6 > 280) {
            doc.addPage();
            yPosition = 20;
          }

          doc.text(paragraphLines, margin, yPosition);
          yPosition += paragraphLines.length * 6 + 4;
        });

        yPosition += 10;
      });
    }

    // Add key findings if they exist
    if (insight.content?.keyFindings) {
      if (yPosition > 200) {
        doc.addPage();
        yPosition = 20;
      }

      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Key Findings", margin, yPosition);
      yPosition += 12;

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");

      insight.content.keyFindings.forEach((finding: string, index: number) => {
        if (yPosition > 280) {
          doc.addPage();
          yPosition = 20;
        }

        const findingText = `• ${finding}`;
        const findingLines = doc.splitTextToSize(findingText, contentWidth);
        doc.text(findingLines, margin, yPosition);
        yPosition += findingLines.length * 6 + 4;
      });
    }

    // Add contact information section
    if (yPosition > 180) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Our Offices", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    // Office locations
    const offices = [
      {
        location: "Nairobi",
        country: "Kenya",
        address: "Westlands Business District",
        type: "HQ",
      },
      { location: "Accra", country: "Ghana", address: "Airport City" },
      {
        location: "Johannesburg",
        country: "South Africa",
        address: "Sandton Central",
      },
      { location: "Dakar", country: "Senegal", address: "Almadies District" },
    ];

    offices.forEach((office) => {
      if (yPosition > 250) {
        doc.addPage();
        yPosition = 20;
      }

      const officeText = [
        office.location,
        office.type ? office.type : "",
        office.country,
        office.address,
      ].filter(Boolean);

      officeText.forEach((line, index) => {
        if (index === 0) {
          doc.setFont("helvetica", "bold");
        } else {
          doc.setFont("helvetica", "normal");
        }
        doc.text(line, margin, yPosition);
        yPosition += 6;
      });
      yPosition += 8; // Extra space between offices
    });

    // Add contact details
    if (yPosition > 220) {
      doc.addPage();
      yPosition = 20;
    }

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Get In Touch", margin, yPosition);
    yPosition += 15;

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    const contactInfo = [
      `Email: politrackafricaltd@gmail.com`,
      `Phone: +254 711 392 818`,
      `Headquarters: Nairobi, Kenya`,
    ];

    contactInfo.forEach((line) => {
      doc.text(line, margin, yPosition);
      yPosition += 8;
    });

    // Add footer with page numbers and public disclaimer
    const pageCount = doc.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");

      // Left side - page info
      doc.text(
        `Page ${i} of ${pageCount} - Generated on ${new Date().toLocaleDateString()}`,
        margin,
        doc.internal.pageSize.getHeight() - 10
      );

      // Right side - public disclaimer
      doc.text(
        "Public Report - PoliTrack Africa Insights",
        pageWidth - margin,
        doc.internal.pageSize.getHeight() - 10,
        { align: "right" }
      );
    }

    // Generate filename
    const filename = `${insight.title
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")}-${insight.date}.pdf`;

    // Download the PDF
    doc.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
    throw new Error("Failed to generate PDF. Please try again.");
  }
}

// Helper function to convert blob to base64
function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve(dataUrl);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

// Function to generate PDF as blob (for preview or other uses)
export async function generateInsightPDFBlob(insight: any): Promise<Blob> {
  const doc = new jsPDF();

  // Add logo
  try {
    const logoUrl = window.location.origin + "/public/politrack.png";
    const response = await fetch(logoUrl);
    const blob = await response.blob();
    const imgData = await blobToBase64(blob);
    doc.addImage(imgData, "PNG", 20, 20, 40, 20);
  } catch (error) {
    console.warn("Could not load logo");
  }

  // Add basic content
  doc.setFontSize(16);
  doc.text(insight.title, 20, 50);
  doc.setFontSize(12);
  doc.text(`Publication Date: ${insight.date}`, 20, 70);
  doc.text(`Category: ${insight.type}`, 20, 80);

  // Add contact information
  doc.setFontSize(10);
  doc.text("PoliTrack Africa - Public Report", 20, 100);
  doc.text("Email: politrackafricaltd@gmail.com", 20, 110);
  doc.text("Headquarters: Nairobi, Kenya", 20, 120);

  return doc.output("blob");
}

// Utility to check if PDF generation is supported
export function isPDFGenerationSupported(): boolean {
  return (
    typeof window !== "undefined" &&
    typeof Blob !== "undefined" &&
    typeof URL !== "undefined" &&
    typeof jsPDF !== "undefined"
  );
}
