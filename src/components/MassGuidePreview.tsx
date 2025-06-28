'use client';

import { MassGuideOptions, BookletOptions } from '@/types/massGuide';
import { useState } from 'react';

interface MassGuidePreviewProps {
  options: MassGuideOptions;
  isGenerated: boolean;
  isGenerating: boolean;
  generatedContent: string;
  onGenerate: () => void;
  bookletOptions: BookletOptions;
  onBookletOptionsChange: (options: BookletOptions) => void;
}

export default function MassGuidePreview({ 
  options,
  isGenerated, 
  isGenerating, 
  generatedContent, 
  onGenerate,
  bookletOptions,
  onBookletOptionsChange
}: MassGuidePreviewProps) {
  const [isPDFGenerating, setIsPDFGenerating] = useState(false);

  const handleDownloadPDF = async () => {
    if (!isGenerated || !generatedContent) {
      alert('Please generate the guide first before downloading PDF.');
      return;
    }

    setIsPDFGenerating(true);
    try {
      // Import required libraries
      const { jsPDF } = await import('jspdf');
      const html2canvas = (await import('html2canvas')).default;

      // Create a temporary container for PDF rendering
      const pdfContainer = document.createElement('div');
      pdfContainer.style.position = 'absolute';
      pdfContainer.style.left = '-9999px';
      pdfContainer.style.top = '-9999px';
      pdfContainer.style.width = '792px'; // 11 inches at 72 DPI in pixels
      pdfContainer.style.minHeight = '612px'; // 8.5 inches at 72 DPI in pixels  
      pdfContainer.style.backgroundColor = 'white';
      pdfContainer.style.fontFamily = 'Times New Roman, serif';
      pdfContainer.style.fontSize = '10pt';
      pdfContainer.style.lineHeight = '1.3';
      pdfContainer.style.padding = '36px'; // 0.5in in pixels
      pdfContainer.style.boxSizing = 'border-box';
      
      // Calculate available width for columns (total width minus padding)
      const availableWidth = 792 - (36 * 2); // 720px
      const columnWidth = (availableWidth - 36) / 2; // Account for gap
      
      pdfContainer.style.columnCount = '2';
      pdfContainer.style.columnWidth = `${columnWidth}px`;
      pdfContainer.style.columnGap = '36px'; // 0.5in gap
      pdfContainer.style.columnRule = '1px solid #ccc';
      pdfContainer.style.columnFill = 'auto';
      
      // Add the content
      pdfContainer.innerHTML = generatedContent;
      
      // Apply PDF-specific styling
      const style = document.createElement('style');
      style.textContent = `
        #pdf-temp {
          width: 792px !important;
          font-family: 'Times New Roman', serif !important;
        }
        #pdf-temp h1 { 
          font-size: 18pt !important; 
          color: #8B4513 !important; 
          text-align: center !important; 
          margin-bottom: 15px !important;
          break-after: avoid !important;
        }
        #pdf-temp h2 { 
          font-size: 12pt !important; 
          color: #8B4513 !important; 
          margin: 15px 0 8px 0 !important; 
          border-bottom: 1px solid #8B4513 !important;
          break-after: avoid !important;
        }
        #pdf-temp h3 { 
          font-size: 11pt !important; 
          color: #8B4513 !important; 
          margin: 12px 0 6px 0 !important;
          break-after: avoid !important;
        }
        #pdf-temp h4 { 
          font-size: 10pt !important; 
          color: #8B4513 !important; 
          margin: 10px 0 4px 0 !important;
          break-after: avoid !important;
        }
        #pdf-temp p { 
          margin: 4px 0 !important;
          break-inside: avoid !important;
        }
        #pdf-temp table { 
          width: 100% !important; 
          border-collapse: collapse !important; 
          margin: 8px 0 !important;
          break-inside: avoid !important;
        }
        #pdf-temp table td { 
          font-size: 9pt !important; 
          padding: 4px 8px !important; 
          vertical-align: top !important;
        }
        #pdf-temp table td:first-child { 
          border-right: 1px solid #ddd !important; 
        }
      `;
      pdfContainer.id = 'pdf-temp';
      
      document.head.appendChild(style);
      document.body.appendChild(pdfContainer);

      // Wait for layout to settle and fonts to load
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create canvas from the container with proper dimensions
      const canvas = await html2canvas(pdfContainer, {
        scale: 1, // Use 1:1 scale for precise dimensions
        useCORS: true,
        backgroundColor: 'white',
        width: 792,
        height: Math.max(612, pdfContainer.scrollHeight), // Capture full height
        windowWidth: 792,
        windowHeight: Math.max(612, pdfContainer.scrollHeight)
      });

      // Create PDF in landscape mode
      const doc = new jsPDF({
        orientation: 'landscape',
        unit: 'pt',
        format: 'letter'
      });

      const imgData = canvas.toDataURL('image/png');
      const pdfWidth = doc.internal.pageSize.getWidth();
      const pdfHeight = doc.internal.pageSize.getHeight();
      
      // Calculate how the image should fit
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      
      // Scale to fit PDF width while maintaining aspect ratio
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const scaledWidth = imgWidth * ratio;
      const scaledHeight = imgHeight * ratio;
      
      // Handle multi-page content
      if (scaledHeight > pdfHeight) {
        // Content spans multiple pages
        let remainingHeight = scaledHeight;
        let currentY = 0;
        let pageNum = 0;
        
        while (remainingHeight > 0) {
          if (pageNum > 0) {
            doc.addPage();
          }
          
          const pageContentHeight = Math.min(pdfHeight, remainingHeight);
          const sourceY = (currentY / ratio);
          const sourceHeight = (pageContentHeight / ratio);
          
          // Create a cropped canvas for this page
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight;
          const pageCtx = pageCanvas.getContext('2d');
          
          if (pageCtx) {
            pageCtx.drawImage(canvas, 0, sourceY, imgWidth, sourceHeight, 0, 0, imgWidth, sourceHeight);
            const pageImgData = pageCanvas.toDataURL('image/png');
            doc.addImage(pageImgData, 'PNG', 0, 0, scaledWidth, pageContentHeight);
          }
          
          currentY += pageContentHeight;
          remainingHeight -= pageContentHeight;
          pageNum++;
        }
      } else {
        // Content fits on one page
        doc.addImage(imgData, 'PNG', 0, 0, scaledWidth, scaledHeight);
      }
      
      doc.save('Catholic_Mass_Guide.pdf');

      // Cleanup
      document.body.removeChild(pdfContainer);
      document.head.removeChild(style);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsPDFGenerating(false);
    }
  };

  const handlePrint = () => {
    if (!isGenerated || !generatedContent) {
      alert('Please generate the guide first before printing.');
      return;
    }
    
    // Create URL with options for print route
    const params = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      params.set(key, value);
    });
    params.set('blankFirstPage', bookletOptions.blankFirstPage.toString());
    
    // Open print route in new tab
    const printUrl = `/print?${params.toString()}`;
    window.open(printUrl, '_blank');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      {!isGenerated ? (
        <div className="text-center py-12">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">Ready to Generate Your Mass Guide</h2>
            <p className="text-gray-600 mb-8">
              Select your preferred options above, then click &quot;Generate Guide&quot; to create your customized Mass booklet.
            </p>
          </div>
          <button
            onClick={onGenerate}
            disabled={isGenerating}
            className="bg-amber-700 text-white px-8 py-4 rounded-lg hover:bg-amber-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
          >
            {isGenerating ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                </svg>
                Generating Guide...
              </span>
            ) : (
              'Generate Guide'
            )}
          </button>
        </div>
      ) : (
        <>
          {/* Booklet Options */}
          <div className="bg-amber-50 p-4 rounded-lg mb-6 no-print">
            <h3 className="text-lg font-semibold text-amber-900 mb-3">Booklet Options</h3>
            <div className="flex gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookletOptions.blankFirstPage}
                  onChange={(e) => onBookletOptionsChange({
                    ...bookletOptions,
                    blankFirstPage: e.target.checked
                  })}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm">Blank left half on first page (for folded booklet cover)</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookletOptions.showFoldLines}
                  onChange={(e) => onBookletOptionsChange({
                    ...bookletOptions,
                    showFoldLines: e.target.checked
                  })}
                  className="text-amber-600 focus:ring-amber-500"
                />
                <span className="text-sm">Show fold lines on print</span>
              </label>
            </div>
          </div>

          <div className="flex justify-center gap-4 mb-6 no-print">
            <button
              onClick={onGenerate}
              className="bg-green-700 text-white px-6 py-3 rounded hover:bg-green-800 transition-colors"
            >
              Regenerate Guide
            </button>
            <button
              onClick={handlePrint}
              className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 transition-colors"
            >
              Print Booklet
            </button>
            <button
              onClick={handleDownloadPDF}
              disabled={isPDFGenerating}
              className="bg-amber-700 text-white px-6 py-3 rounded hover:bg-amber-800 transition-colors disabled:opacity-50"
            >
              {isPDFGenerating ? 'Generating PDF...' : 'Download PDF'}
            </button>
          </div>

          <div 
            id="guide"
            className="prose prose-lg max-w-none font-serif leading-relaxed"
            dangerouslySetInnerHTML={{ __html: generatedContent }}
          />
        </>
      )}
    </div>
  );
}