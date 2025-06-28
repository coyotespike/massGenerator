export interface MassGuideOptions {
  greeting: 'grace' | 'peace' | 'lord';
  penitential: 'confiteor' | 'mercy' | 'invocations';
  kyrie: 'english' | 'latin' | 'skip';
  gloria: 'include' | 'skip';
  creed: 'nicene' | 'apostles' | 'both';
  mystery: 'proclaim' | 'eat' | 'save';
  faithful: 'mercy' | 'short';
  sanctus: 'english' | 'latin' | 'both';
  agnus: 'english' | 'latin' | 'both';
  dismissal: 'ended' | 'announce' | 'glorify' | 'peace';
}

export interface BookletOptions {
  blankFirstPage: boolean;
  showFoldLines: boolean;
}