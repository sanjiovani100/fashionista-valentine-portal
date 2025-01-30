export const cloudinaryConfig = {
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzqy2ixl0'
  },
  defaults: {
    placeholder: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/placeholder_kgzjk4.jpg',
    fallbackImage: '/placeholder.svg',
    retryAttempts: 2,
    timeoutMs: 10000
  },
  categories: {
    event_hero: 'event_hero',
    event_gallery: 'event_gallery',
    promotional: 'promotional'
  }
};