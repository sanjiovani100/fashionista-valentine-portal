export const cloudinaryConfig = {
  cloud: {
    cloudName: 'dzqy2ixl0'
  },
  defaults: {
    placeholder: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/valentine-011_sgwnbj.jpg',
    fallbackImage: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/valentine-011_sgwnbj.jpg',
    retryAttempts: 2,
    timeoutMs: 10000,
    transformations: {
      highlight: 'c_fill,g_center,h_600,w_800,q_auto,f_auto',
      showcase: 'c_fill,g_center,h_800,w_600,q_auto,f_auto',
      hero: 'c_fill,g_center,h_1080,w_1920,q_auto,f_auto'
    },
    placeholders: {
      event: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/valentine-011_sgwnbj.jpg',
      collection: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041785/valentine-002_jg1o0m.jpg',
      profile: 'https://res.cloudinary.com/dzqy2ixl0/image/upload/v1738041736/valentine-011_sgwnbj.jpg'
    }
  },
  categories: {
    event_hero: 'event_hero',
    event_gallery: 'event_gallery',
    promotional: 'promotional'
  }
};