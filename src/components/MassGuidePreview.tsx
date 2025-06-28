'use client';

import { MassGuideOptions } from '@/types/massGuide';
import { generateGuideContent } from '@/utils/guideGenerator';
import { useState } from 'react';

interface MassGuidePreviewProps {
  options: MassGuideOptions;
}

export default function MassGuidePreview({ options }: MassGuidePreviewProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    try {
      const { jsPDF } = await import('jspdf');
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      });

      const content = generateGuideContent(options);
      const plainTextContent = content.replace(/<[^>]*>/g, '').replace(/&[^;]+;/g, ' ');
      
      const pageHeight = doc.internal.pageSize.height;
      const pageWidth = doc.internal.pageSize.width;
      const margins = { top: 40, bottom: 40, left: 40, right: 40 };
      const lineHeight = 14;
      let y = margins.top;

      doc.setFont('times', 'normal');
      doc.setFontSize(11);

      const lines = doc.splitTextToSize(plainTextContent, pageWidth - margins.left - margins.right);
      
      lines.forEach((line: string) => {
        if (y > pageHeight - margins.bottom) {
          doc.addPage();
          y = margins.top;
        }
        doc.text(line, margins.left, y);
        y += lineHeight;
      });

      doc.save('Catholic_Mass_Guide.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const content = generateGuideContent(options);

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={handlePrint}
          className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 transition-colors"
        >
          Print Booklet
        </button>
        <button
          onClick={handleDownloadPDF}
          disabled={isGenerating}
          className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 transition-colors disabled:opacity-50"
        >
          {isGenerating ? 'Generating...' : 'Download PDF'}
        </button>
      </div>

      <div 
        id="guide"
        className="prose prose-lg max-w-none font-serif leading-relaxed print:text-xs print:leading-tight"
        dangerouslySetInnerHTML={{ __html: content }}
      />

      <style jsx global>{`
        @media print {
          @page {
            size: landscape;
            margin: 0.5in;
          }
          
          body {
            background: white !important;
            font-size: 10pt !important;
            line-height: 1.3 !important;
          }
          
          .no-print {
            display: none !important;
          }
          
          #guide {
            box-shadow: none !important;
            padding: 0 !important;
            column-count: 2;
            column-gap: 0.5in;
            column-rule: 1px solid #ccc;
            column-fill: auto;
          }
          
          #guide h1:first-child {
            font-size: 24pt !important;
            margin: 0 !important;
            padding: 0 !important;
            width: 50% !important;
            float: right !important;
            height: 100vh !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            page-break-after: always !important;
            column-span: none !important;
          }
          
          #guide h1:first-child::before {
            content: "";
            display: block;
            width: 50%;
            height: 100vh;
            float: left;
            page-break-after: avoid;
          }
          
          #guide h2:first-of-type {
            clear: both;
            column-span: all;
          }
          
          #guide h1 {
            font-size: 18pt !important;
            margin-bottom: 15px !important;
            text-align: center !important;
            page-break-after: avoid !important;
          }
          
          #guide h2 {
            font-size: 12pt !important;
            margin-top: 15px !important;
            margin-bottom: 8px !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          
          #guide h3 {
            font-size: 11pt !important;
            margin-top: 12px !important;
            margin-bottom: 6px !important;
            page-break-after: avoid !important;
            page-break-inside: avoid !important;
          }
          
          #guide p {
            margin: 4px 0 !important;
            page-break-inside: avoid !important;
            orphans: 3;
            widows: 3;
          }
          
          #guide table {
            page-break-inside: avoid !important;
            margin: 8px 0 !important;
          }
          
          #guide table td {
            font-size: 9pt !important;
            padding: 4px 8px !important;
          }
        }
      `}</style>
    </div>
  );
}