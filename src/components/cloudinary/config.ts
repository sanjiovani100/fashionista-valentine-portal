export const cloudinaryConfig = {
  cloud: {
    cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dzqy2ixl0'
  },
  defaults: {
    placeholder: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/placeholder_kgzjk4.jpg',
    fallbackImage: '/placeholder.svg',
    retryAttempts: 2,
    timeoutMs: 10000,
    transformations: {
      highlight: 'c_fill,g_center,h_600,w_800,q_auto,f_auto',
      showcase: 'c_fill,g_center,h_800,w_600,q_auto,f_auto',
      hero: 'c_fill,g_center,h_1080,w_1920,q_auto,f_auto'
    },
    placeholders: {
      event: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/event_placeholder_kgzjk4.jpg',
      collection: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/collection_placeholder_kgzjk4.jpg',
      profile: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1706436856/profile_placeholder_kgzjk4.jpg'
    }
  },
  categories: {
    event_hero: 'event_hero',
    event_gallery: 'event_gallery',
    promotional: 'promotional'
  }
};