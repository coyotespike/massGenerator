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
      // Import jsPDF
      const { jsPDF } = await import('jspdf');

      // Create PDF in portrait mode for better readability
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'pt',
        format: 'letter'
      });

      const pageWidth = doc.internal.pageSize.getWidth(); // 612pt
      const pageHeight = doc.internal.pageSize.getHeight(); // 792pt
      const margin = 36; // 0.5 inch margins
      const columnWidth = (pageWidth - (margin * 3)) / 2; // Two columns with gap
      const leftColumnX = margin;
      const rightColumnX = margin + columnWidth + margin;
      
      let currentY = margin;
      let currentColumn = 'left';
      
      // Helper function to add text and manage columns/pages
      const addText = (text: string, fontSize: number, isBold = false, isCenter = false, color = '#000000') => {
        doc.setFontSize(fontSize);
        doc.setFont('times', isBold ? 'bold' : 'normal');
        doc.setTextColor(color);
        
        const textWidth = isCenter ? pageWidth - (margin * 2) : columnWidth;
        const textX = isCenter ? margin : (currentColumn === 'left' ? leftColumnX : rightColumnX);
        
        const lines = doc.splitTextToSize(text, textWidth);
        const lineHeight = fontSize * 1.2;
        
        // Check if we need a new page
        if (currentY + (lines.length * lineHeight) > pageHeight - margin) {
          if (currentColumn === 'left' && !isCenter) {
            // Move to right column
            currentColumn = 'right';
            currentY = margin;
          } else {
            // New page
            doc.addPage();
            currentY = margin;
            currentColumn = 'left';
          }
        }
        
        lines.forEach((line: string) => {
          const finalX = isCenter ? textX + (textWidth - doc.getTextWidth(line)) / 2 : textX;
          doc.text(line, finalX, currentY);
          currentY += lineHeight;
        });
        
        return currentY;
      };
      
      // Helper function to add a section divider
      const addDivider = () => {
        const x = currentColumn === 'left' ? leftColumnX : rightColumnX;
        doc.setDrawColor('#8B4513');
        doc.setLineWidth(0.5);
        doc.line(x, currentY, x + columnWidth, currentY);
        currentY += 10;
      };

      // Parse the HTML content and extract text
      const parser = new DOMParser();
      const htmlDoc = parser.parseFromString(generatedContent, 'text/html');
      
      // Add title page if needed
      if (bookletOptions.blankFirstPage) {
        doc.addPage();
        addText('Guide to the Catholic Mass', 24, true, true, '#8B4513');
        currentY += 20;
        addText('Customized for Your Parish', 14, false, true, '#666666');
        doc.addPage();
        currentY = margin;
        currentColumn = 'left';
      }
      
      // Process HTML elements
      const processElement = (element: Element) => {
        const tagName = element.tagName?.toLowerCase();
        const textContent = element.textContent?.trim() || '';
        
        if (!textContent) return;
        
        switch (tagName) {
          case 'h1':
            addText(textContent, 18, true, false, '#8B4513');
            currentY += 5;
            break;
          case 'h2':
            addText(textContent, 12, true, false, '#8B4513');
            addDivider();
            break;
          case 'h3':
            addText(textContent, 11, true, false, '#8B4513');
            currentY += 3;
            break;
          case 'h4':
            addText(textContent, 10, true, false, '#8B4513');
            currentY += 2;
            break;
          case 'p':
            addText(textContent, 10, false, false, '#000000');
            currentY += 4;
            break;
          case 'table':
            // Handle tables specially
            const rows = element.querySelectorAll('tr');
            rows.forEach(row => {
              const cells = row.querySelectorAll('td');
              if (cells.length >= 2) {
                const leftText = cells[0].textContent?.trim() || '';
                const rightText = cells[1].textContent?.trim() || '';
                addText(`${leftText} | ${rightText}`, 9, false, false, '#000000');
              }
            });
            currentY += 8;
            break;
          default:
            // For other elements, just add the text
            if (textContent.length > 0) {
              addText(textContent, 10, false, false, '#000000');
              currentY += 2;
            }
        }
      };
      
      // Process all elements in the HTML
      const allElements = htmlDoc.querySelectorAll('h1, h2, h3, h4, p, table');
      allElements.forEach(processElement);
      
      doc.save('Catholic_Mass_Guide.pdf');
      
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
    params.set('skipTitlePage', bookletOptions.skipTitlePage.toString());
    params.set('bookletMode', bookletOptions.bookletMode.toString());
    // Add test parameter for half-page debugging
    params.set('testHalfPages', 'true');
    
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
            
            {/* Booklet Mode Toggle */}
            <div className="mb-4 p-3 bg-white rounded border">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={bookletOptions.bookletMode}
                  onChange={(e) => onBookletOptionsChange({
                    ...bookletOptions,
                    bookletMode: e.target.checked
                  })}
                  className="text-amber-600 focus:ring-amber-500 mt-1"
                />
                <div>
                  <span className="text-sm font-medium">Booklet Mode (Recommended)</span>
                  <p className="text-xs text-gray-600 mt-1">
                    Automatically arranges pages for double-sided printing and folding. 
                    Pages will be printed in the correct order so when you fold in half, 
                    they form a proper booklet.
                  </p>
                </div>
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookletOptions.blankFirstPage}
                  onChange={(e) => onBookletOptionsChange({
                    ...bookletOptions,
                    blankFirstPage: e.target.checked,
                    skipTitlePage: e.target.checked ? false : bookletOptions.skipTitlePage
                  })}
                  className="text-amber-600 focus:ring-amber-500"
                  disabled={bookletOptions.bookletMode}
                />
                <span className="text-sm">Include title page with blank left half</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={bookletOptions.skipTitlePage}
                  onChange={(e) => onBookletOptionsChange({
                    ...bookletOptions,
                    skipTitlePage: e.target.checked,
                    blankFirstPage: e.target.checked ? false : bookletOptions.blankFirstPage
                  })}
                  className="text-amber-600 focus:ring-amber-500"
                  disabled={bookletOptions.bookletMode}
                />
                <span className="text-sm">Skip title page, start content with blank left half</span>
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
            
            {bookletOptions.bookletMode && (
              <div className="mt-3 p-3 bg-blue-50 rounded text-sm text-blue-800">
                <strong>Booklet Mode Active:</strong> Pages will be automatically arranged for proper folding. 
                Blank pages may be added to ensure correct page ordering.
              </div>
            )}
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