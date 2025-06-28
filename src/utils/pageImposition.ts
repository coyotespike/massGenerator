/**
 * Page Imposition Utilities for Booklet Printing
 * 
 * This module handles the complex pagination required for proper booklet folding.
 * When printing double-sided and folding in half, pages must be arranged in a specific
 * order so that when folded, they appear in the correct reading sequence.
 */

export interface BookletPage {
  pageNumber: number; // 1-based page number in reading order
  content: string;
  isBlank: boolean;
}

export interface ImpositionResult {
  printOrder: BookletPage[];
  totalPages: number;
  blankPagesAdded: number;
}

/**
 * Calculate the correct page order for booklet printing using page imposition.
 * 
 * For double-sided booklet printing, we need to consider the physical sheet layout:
 * When folded in half, the page arrangement becomes complex.
 * 
 * Example with title + 3 content pages (4 total → 8 with padding):
 * - Sheet 1: Front=[8(blank), 1(title)] | Back=[2(content1), 7(blank)]
 * - Sheet 2: Front=[6(blank), 3(content2)] | Back=[4(content3), 5(blank)]
 * 
 * When folded: Title on front cover, content pages in order, blanks as padding
 * 
 * @param pages Array of pages in reading order
 * @returns Pages arranged in correct printing order with blank pages added as needed
 */
export function calculatePageImposition(pages: BookletPage[]): ImpositionResult {
  const originalPageCount = pages.length;
  
  // Pad to multiple of 4 for proper booklet signatures
  const totalPages = Math.ceil(originalPageCount / 4) * 4;
  const blankPagesAdded = totalPages - originalPageCount;
  
  // Create padded array with blank pages at the end
  const paddedPages: BookletPage[] = [...pages];
  for (let i = 0; i < blankPagesAdded; i++) {
    paddedPages.push({
      pageNumber: originalPageCount + i + 1,
      content: '', // Blank content
      isBlank: true
    });
  }
  
  // Simple booklet imposition: for N pages, arrange as [N, 1, 2, N-1, N-2, 3, 4, N-3, ...]
  const printOrder: BookletPage[] = [];
  
  for (let i = 0; i < totalPages / 2; i++) {
    // Add outer pages first: last page, then first page of this pair
    const outerPageIndex = totalPages - 1 - i;  // Last, second-to-last, etc.
    const innerPageIndex = i;                   // First, second, etc.
    
    printOrder.push(paddedPages[outerPageIndex]);
    printOrder.push(paddedPages[innerPageIndex]);
  }
  
  return {
    printOrder,
    totalPages,
    blankPagesAdded
  };
}

// Helper function for creating blank pages (if needed in future)
// function createBlankPage(pageNumber: number): BookletPage {
//   return {
//     pageNumber,
//     content: '',
//     isBlank: true
//   };
// }

/**
 * Create a human-readable explanation of how the booklet will be arranged.
 * This helps users understand what pages will be printed and in what order.
 */
export function explainBookletLayout(originalPageCount: number, hasTitle: boolean): string {
  const totalPages = Math.ceil(originalPageCount / 4) * 4;
  const blankPages = totalPages - originalPageCount;
  
  let explanation = `Booklet will have ${totalPages} total pages`;
  
  if (blankPages > 0) {
    explanation += ` (${blankPages} blank page${blankPages > 1 ? 's' : ''} added for proper folding)`;
  }
  
  explanation += `.\n\nPrint double-sided and fold in half to create a ${totalPages / 2}-sheet booklet.`;
  
  if (hasTitle) {
    explanation += ` Title page will be on the front cover.`;
  }
  
  return explanation;
}

/**
 * Validate that the page imposition is correct by checking the mathematical relationships.
 * This is useful for testing and debugging.
 */
export function validateImposition(result: ImpositionResult): boolean {
  const { printOrder, totalPages } = result;
  
  // Must be multiple of 4
  if (totalPages % 4 !== 0) return false;
  
  // Must have exactly totalPages in print order
  if (printOrder.length !== totalPages) return false;
  
  // Check that pages alternate correctly (last-first, second-to-second-last pattern)
  for (let i = 0; i < totalPages; i += 2) {
    const frontPage = printOrder[i];
    const backPage = printOrder[i + 1];
    
    const expectedFrontPageNum = totalPages - (i / 2);
    const expectedBackPageNum = (i / 2) + 1;
    
    if (frontPage.pageNumber !== expectedFrontPageNum || 
        backPage.pageNumber !== expectedBackPageNum) {
      return false;
    }
  }
  
  return true;
}