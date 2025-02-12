/**
 * Formats a date string into a human-readable format
 * @param dateString - ISO date string
 * @returns Formatted date string (e.g., "February 14, 2024")
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Checks if a date is in the future
 * @param dateString - ISO date string
 * @returns boolean
 */
export const isFutureDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date > now;
};

/**
 * Returns the time until an event
 * @param dateString - ISO date string
 * @returns Object containing days, hours, minutes until the event
 */
export const getTimeUntilEvent = (dateString: string): {
  days: number;
  hours: number;
  minutes: number;
} => {
  const eventDate = new Date(dateString);
  const now = new Date();
  const diff = eventDate.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return { days, hours, minutes };
}; 