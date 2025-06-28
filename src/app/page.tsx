'use client';

import { useState } from 'react';
import MassGuideCustomizer from '@/components/MassGuideCustomizer';
import MassGuidePreview from '@/components/MassGuidePreview';
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

export default function Home() {
  const [options, setOptions] = useState<MassGuideOptions>(defaultOptions);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-5">
        <MassGuideCustomizer 
          options={options} 
          onOptionsChange={setOptions} 
        />
        <MassGuidePreview options={options} />
      </div>
    </div>
  );
}
