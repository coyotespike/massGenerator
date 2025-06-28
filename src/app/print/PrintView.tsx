'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { generateGuideContent } from '@/utils/guideGenerator';
import { MassGuideOptions } from '@/types/massGuide';

const defaultOptions: MassGuideOptions = {
  greeting: 'grace',
  penitential: 'confiteor',
  kyrie: 'english',
  gloria: 'include',
  creed: 'nicene',
  mystery: 'proclaim',
  faithful: 'mercy',
  sanctus: 'english',
  agnus: 'english',
  dismissal: 'ended'
};

export default function PrintView() {
  const searchParams = useSearchParams();
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse options from URL parameters
    const options: MassGuideOptions = {
      greeting: (searchParams.get('greeting') as MassGuideOptions['greeting']) || defaultOptions.greeting,
      penitential: (searchParams.get('penitential') as MassGuideOptions['penitential']) || defaultOptions.penitential,
      kyrie: (searchParams.get('kyrie') as MassGuideOptions['kyrie']) || defaultOptions.kyrie,
      gloria: (searchParams.get('gloria') as MassGuideOptions['gloria']) || defaultOptions.gloria,
      creed: (searchParams.get('creed') as MassGuideOptions['creed']) || defaultOptions.creed,
      mystery: (searchParams.get('mystery') as MassGuideOptions['mystery']) || defaultOptions.mystery,
      faithful: (searchParams.get('faithful') as MassGuideOptions['faithful']) || defaultOptions.faithful,
      sanctus: (searchParams.get('sanctus') as MassGuideOptions['sanctus']) || defaultOptions.sanctus,
      agnus: (searchParams.get('agnus') as MassGuideOptions['agnus']) || defaultOptions.agnus,
      dismissal: (searchParams.get('dismissal') as MassGuideOptions['dismissal']) || defaultOptions.dismissal
    };

    // Generate the content
    const generatedContent = generateGuideContent(options);
    setContent(generatedContent);
    setIsLoading(false);

    // Auto-print after content loads (unless disabled for PDF generation)
    const autoPrint = searchParams.get('autoPrint') !== 'false';
    if (autoPrint) {
      const timer = setTimeout(() => {
        window.print();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [searchParams]);

  if (isLoading) {
    return <div className="p-8 text-center">Preparing your Mass guide for printing...</div>;
  }

  const blankFirstPage = searchParams.get('blankFirstPage') === 'true';

  return (
    <>
      {/* Print-specific styling */}
      <style jsx global>{`
        @page {
          size: landscape;
          margin: 0.5in;
        }
        
        body {
          font-family: 'Times New Roman', serif;
          font-size: 10pt;
          line-height: 1.3;
          margin: 0;
          padding: 0;
          background: white;
          color: black;
        }
        
        @media screen {
          body {
            padding: 1rem;
            background: #f5f5f5;
          }
          
          .print-container {
            background: white;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            padding: 1in;
            max-width: 11in;
            margin: 0 auto;
          }
        }
        
        @media print {
          .print-container {
            box-shadow: none;
            border-radius: 0;
            padding: 0;
            margin: 0;
            max-width: none;
          }
          
          .first-page {
            display: flex;
            height: 100vh;
            page-break-after: always;
          }
          
          .blank-half {
            width: 50%;
            background: white;
            border-right: 1px dashed #ccc;
          }
          
          .title-half {
            width: 50%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 2in;
          }
          
          .title-half h1 {
            font-size: 24pt;
            color: #8B4513;
            margin-bottom: 20px;
            font-weight: bold;
          }
          
          .subtitle {
            font-size: 14pt;
            color: #666;
            font-style: italic;
          }
          
          .booklet-content {
            column-count: 2;
            column-gap: 0.5in;
            column-rule: 1px dashed #ccc;
            column-fill: auto;
          }
          
          .booklet-content h1 {
            font-size: 18pt !important;
            color: #8B4513 !important;
            text-align: center !important;
            margin-bottom: 15px !important;
            page-break-after: avoid !important;
          }
          
          .booklet-content h2 {
            font-size: 12pt !important;
            color: #8B4513 !important;
            margin-top: 15px !important;
            margin-bottom: 8px !important;
            page-break-after: avoid !important;
            border-bottom: 1px solid #8B4513 !important;
          }
          
          .booklet-content h3 {
            font-size: 11pt !important;
            color: #8B4513 !important;
            margin-top: 12px !important;
            margin-bottom: 6px !important;
            page-break-after: avoid !important;
          }
          
          .booklet-content h4 {
            font-size: 10pt !important;
            color: #8B4513 !important;
            margin-top: 10px !important;
            margin-bottom: 4px !important;
            page-break-after: avoid !important;
          }
          
          .booklet-content p {
            margin: 4px 0 !important;
            page-break-inside: avoid !important;
            orphans: 3;
            widows: 3;
          }
          
          .booklet-content table {
            page-break-inside: avoid !important;
            margin: 8px 0 !important;
            width: 100% !important;
            border-collapse: collapse !important;
          }
          
          .booklet-content table td {
            font-size: 9pt !important;
            padding: 4px 8px !important;
            vertical-align: top !important;
          }
          
          .booklet-content table td:first-child {
            border-right: 1px solid #ddd !important;
          }
        }
      `}</style>

      <div className="print-container">
        {blankFirstPage && (
          <div className="first-page">
            <div className="blank-half"></div>
            <div className="title-half">
              <h1>Guide to the Catholic Mass</h1>
              <div className="subtitle">
                Customized for Your Parish
              </div>
            </div>
          </div>
        )}
        
        <div 
          className="booklet-content"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </div>
    </>
  );
}