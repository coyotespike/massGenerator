'use client';

import { useState } from 'react';
import MassGuideCustomizer from '@/components/MassGuideCustomizer';
import MassGuidePreview from '@/components/MassGuidePreview';
import { MassGuideOptions, BookletOptions } from '@/types/massGuide';
import { generateGuideContent } from '@/utils/guideGenerator';

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

const defaultBookletOptions: BookletOptions = {
  blankFirstPage: true,
  showFoldLines: true,
  skipTitlePage: false,
  bookletMode: false
};

export default function Home() {
  const [options, setOptions] = useState<MassGuideOptions>(defaultOptions);
  const [bookletOptions, setBookletOptions] = useState<BookletOptions>(defaultBookletOptions);
  const [isGenerated, setIsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string>('');

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      // Add small delay to show loading state
      await new Promise(resolve => setTimeout(resolve, 500));
      const content = generateGuideContent(options);
      setGeneratedContent(content);
      setIsGenerated(true);
    } catch (error) {
      console.error('Error generating guide:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleOptionsChange = (newOptions: MassGuideOptions) => {
    setOptions(newOptions);
    // Reset generation state when options change
    setIsGenerated(false);
    setGeneratedContent('');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-5">
        <MassGuideCustomizer 
          options={options} 
          onOptionsChange={handleOptionsChange} 
        />
        <MassGuidePreview 
          options={options}
          isGenerated={isGenerated}
          isGenerating={isGenerating}
          generatedContent={generatedContent}
          onGenerate={handleGenerate}
          bookletOptions={bookletOptions}
          onBookletOptionsChange={setBookletOptions}
        />
      </div>
    </div>
  );
}
