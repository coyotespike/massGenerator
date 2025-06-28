import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MassGuidePreview from '../MassGuidePreview';
import { MassGuideOptions, BookletOptions } from '@/types/massGuide';

const mockOptions: MassGuideOptions = {
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

const mockBookletOptions: BookletOptions = {
  blankFirstPage: true,
  showFoldLines: true
};

const mockProps = {
  options: mockOptions,
  isGenerated: false,
  isGenerating: false,
  generatedContent: '',
  onGenerate: jest.fn(),
  bookletOptions: mockBookletOptions,
  onBookletOptionsChange: jest.fn()
};

describe('MassGuidePreview', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('shows generate button when not generated', () => {
    render(<MassGuidePreview {...mockProps} />);
    
    expect(screen.getByText('Generate Guide')).toBeInTheDocument();
    expect(screen.getByText(/Select your preferred options above/)).toBeInTheDocument();
  });

  test('shows loading state when generating', () => {
    render(<MassGuidePreview {...mockProps} isGenerating={true} />);
    
    expect(screen.getByText('Generating Guide...')).toBeInTheDocument();
  });

  test('shows booklet options and controls when generated', () => {
    const generatedProps = {
      ...mockProps,
      isGenerated: true,
      generatedContent: '<h1>Test Content</h1>'
    };
    
    render(<MassGuidePreview {...generatedProps} />);
    
    expect(screen.getByText('Booklet Options')).toBeInTheDocument();
    expect(screen.getByText('Regenerate Guide')).toBeInTheDocument();
    expect(screen.getByText('Print Booklet')).toBeInTheDocument();
    expect(screen.getByText('Download PDF')).toBeInTheDocument();
  });

  test('calls onGenerate when generate button is clicked', () => {
    render(<MassGuidePreview {...mockProps} />);
    
    fireEvent.click(screen.getByText('Generate Guide'));
    expect(mockProps.onGenerate).toHaveBeenCalledTimes(1);
  });

  test('booklet options can be toggled', () => {
    const generatedProps = {
      ...mockProps,
      isGenerated: true,
      generatedContent: '<h1>Test Content</h1>'
    };
    
    render(<MassGuidePreview {...generatedProps} />);
    
    const blankPageCheckbox = screen.getByLabelText(/Blank left half on first page/);
    fireEvent.click(blankPageCheckbox);
    
    expect(mockProps.onBookletOptionsChange).toHaveBeenCalledWith({
      ...mockBookletOptions,
      blankFirstPage: false
    });
  });

  test('displays generated content when available', () => {
    const generatedProps = {
      ...mockProps,
      isGenerated: true,
      generatedContent: '<h1>Test Content</h1><p>Sample guide content</p>'
    };
    
    render(<MassGuidePreview {...generatedProps} />);
    
    // Check that the generated content is displayed
    const guideElement = document.getElementById('guide');
    expect(guideElement).toBeInTheDocument();
    expect(guideElement?.innerHTML).toContain('Test Content');
  });
});