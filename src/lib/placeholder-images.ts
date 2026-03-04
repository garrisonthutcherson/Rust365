import data from './placeholder-images.json';

export type ImagePlaceholder = {
  id: string;
  description: string;
  imageUrl: string;
  imageHint: string;
};

// Ensure PlaceHolderImages is always an array, even if the JSON import fails or is malformed
export const PlaceHolderImages: ImagePlaceholder[] = Array.isArray(data?.placeholderImages) 
  ? data.placeholderImages 
  : [];

/**
 * Safely find a placeholder image by ID.
 * Returns a fallback object with empty strings if not found to prevent 'undefined' property access.
 */
export function getPlaceholderById(id: string): ImagePlaceholder {
  return PlaceHolderImages.find(img => img.id === id) || {
    id: 'unknown',
    description: 'No description available',
    imageUrl: '',
    imageHint: ''
  };
}
