// Re-export types from a single source to avoid ambiguity
export type {
  ImageMetadata,
  ProcessedImage,
  ImageValidationResult
} from './images/types';

export type {
  TransformedHighlight,
  TransformedCollection,
  TransformedEventData
} from './highlights/types';

// Export functions
export { validateImageMetadata } from './images/validation';
export { constructImageUrl } from './images/processing';
export { findHighlightImage } from './images/selection';
export { transformHighlights, transformCollections, transformEventData } from './highlights/transform';


