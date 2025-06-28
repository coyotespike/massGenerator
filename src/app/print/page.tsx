'use client';

import { Suspense } from 'react';
import PrintView from './PrintView';

export default function PrintPage() {
  return (
    <Suspense fallback={<div>Loading print view...</div>}>
      <PrintView />
    </Suspense>
  );
}