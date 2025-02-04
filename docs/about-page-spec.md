# About Page Design Specification

## Overview

This document outlines the comprehensive design specification for the Fashionistas Valentine's Event About Page, ensuring alignment with our established design system and brand guidelines.

## Table of Contents
1. [Purpose and Target Audience](#purpose-and-target-audience)
2. [Page Structure and Layout](#page-structure-and-layout)
3. [Visual Design](#visual-design)
4. [Components and Interactions](#components-and-interactions)
5. [Data Structure and Integration](#data-structure-and-integration)
6. [Performance and Optimization](#performance-and-optimization)
7. [Accessibility Requirements](#accessibility-requirements)

## Purpose and Target Audience

### Primary Objectives
- Showcase event vision, mission, and values
- Build credibility through team presentation
- Drive stakeholder engagement
- Communicate unique value proposition

### Target Audience Segments
1. **Fashion Designers**
   - Seeking showcase opportunities
   - Looking for industry connections
   
2. **Models**
   - Seeking runway opportunities
   - Building portfolio experience
   
3. **Sponsors & Partners**
   - Industry collaborators
   - Brand partnerships
   
4. **Fashion Enthusiasts**
   - Event attendees
   - Fashion community members
   
5. **Industry Professionals**
   - Media representatives
   - Fashion journalists

## Page Structure and Layout

### Hero Section
```jsx
<section className="relative h-[80vh] min-h-[600px] w-full">
  <div className="absolute inset-0">
    <Image
      src="/hero-image.jpg"
      layout="fill"
      objectFit="cover"
      className="brightness-50"
      priority
    />
    <div className="absolute inset-0 bg-gradient-overlay" />
  </div>
  
  <div className="container relative z-10 flex h-full items-center">
    <div className="max-w-2xl animate-fade-in">
      <h1 className="font-montserrat text-h1 font-bold text-white">
        Celebrating Fashion & Love
      </h1>
      <p className="mt-6 text-xl text-gray-100">
        Where style meets romance in an unforgettable Valentine's showcase
      </p>
    </div>
  </div>
</section>
```

### Mission & Vision Section
```jsx
<section className="py-section">
  <div className="container grid gap-16 md:grid-cols-2">
    {/* Mission Column */}
    <div className="space-y-6">
      <h2 className="font-montserrat text-h2">Our Mission</h2>
      <p className="text-lg text-gray-300">
        {missionContent}
      </p>
    </div>
    
    {/* Vision Column */}
    <div className="space-y-6">
      <h2 className="font-montserrat text-h2">Our Vision</h2>
      <p className="text-lg text-gray-300">
        {visionContent}
      </p>
    </div>
  </div>
</section>
```

### Core Values Grid
```jsx
<section className="bg-gray-500 py-section">
  <div className="container">
    <h2 className="text-center font-montserrat text-h2">Our Core Values</h2>
    <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {coreValues.map((value) => (
        <CoreValueCard
          key={value.id}
          icon={value.icon}
          title={value.title}
          description={value.description}
        />
      ))}
    </div>
  </div>
</section>
```

### Team Section
```jsx
<section className="py-section">
  <div className="container">
    <h2 className="text-center font-montserrat text-h2">Meet Our Team</h2>
    <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {teamMembers.map((member) => (
        <TeamMemberCard
          key={member.id}
          name={member.name}
          role={member.role}
          image={member.image}
          socialLinks={member.socialMedia}
        />
      ))}
    </div>
  </div>
</section>
```

## Visual Design

### Color Application
```css
/* Section Backgrounds */
.hero-section {
  @apply bg-gray-500;
}

.mission-section {
  @apply bg-background;
}

.values-section {
  @apply bg-maroon-dark;
}

/* Text Colors */
.section-title {
  @apply text-white;
}

.section-description {
  @apply text-gray-200;
}

/* Accent Elements */
.accent-element {
  @apply text-red-bright;
}
```

### Typography Implementation
```css
/* Headings */
h1 {
  @apply font-montserrat text-h1 font-bold tracking-tight;
}

h2 {
  @apply font-montserrat text-h2 font-bold;
}

/* Body Text */
.body-large {
  @apply font-inter text-lg leading-relaxed;
}

.body-regular {
  @apply font-inter text-base leading-relaxed;
}
```

## Components and Interactions

### Core Value Card
```jsx
const CoreValueCard = ({ icon, title, description }) => (
  <div className="card-base card-hover group p-8">
    <div className="mb-6 text-red-bright">
      <Icon name={icon} size={32} />
    </div>
    <h3 className="mb-4 font-montserrat text-h4">{title}</h3>
    <p className="text-gray-200">{description}</p>
  </div>
);
```

### Team Member Card
```jsx
const TeamMemberCard = ({ image, name, role, socialLinks }) => (
  <div className="card-base card-hover overflow-hidden">
    <div className="aspect-square overflow-hidden">
      <Image
        src={image}
        alt={name}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <div className="p-6">
      <h3 className="font-montserrat text-h4">{name}</h3>
      <p className="text-red-soft">{role}</p>
      <SocialLinks links={socialLinks} />
    </div>
  </div>
);
```

## Data Structure and Integration

### Supabase Schema
```sql
-- About Page Content Table
CREATE TABLE about_page_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{}'::jsonb,
  meta_description TEXT,
  meta_keywords TEXT[],
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  mission_vision JSONB DEFAULT '{"vision": "", "mission": ""}'::jsonb,
  core_values JSONB DEFAULT '[]'::jsonb,
  team_members JSONB DEFAULT '[]'::jsonb,
  contact_info JSONB DEFAULT '{}'::jsonb
);
```

### Data Fetching
```typescript
// Data fetching hook
export const useAboutPageData = () => {
  const { data, error } = await supabase
    .from('about_page_content')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return {
    data,
    error,
    isLoading: !error && !data,
  };
};
```

## Performance and Optimization

### Image Optimization
```typescript
// Cloudinary configuration
const imageConfig = {
  team_member: {
    transform: 'c_fill,g_face,h_600,w_600,q_auto,f_auto',
    placeholder: 'blur',
  },
  hero: {
    transform: 'c_fill,g_center,h_1080,w_1920,q_auto,f_auto',
    placeholder: 'blur',
  },
};
```

### Animation Performance
```css
/* Optimized animations */
.scroll-reveal {
  @apply opacity-0 translate-y-4;
  will-change: transform, opacity;
}

.scroll-reveal.in-view {
  @apply opacity-100 translate-y-0;
  transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
```

## Accessibility Requirements

### ARIA Implementation
```jsx
// Navigation landmarks
<nav aria-label="Main navigation">
  {/* Navigation content */}
</nav>

// Content landmarks
<main id="main-content" role="main">
  <section aria-labelledby="hero-title">
    <h1 id="hero-title">About Fashionistas Valentine's Event</h1>
  </section>
</main>
```

### Keyboard Navigation
```css
/* Focus styles */
.focus-visible:focus {
  @apply outline-none ring-2 ring-red-primary ring-offset-2;
}

/* Skip link */
.skip-link {
  @apply sr-only focus:not-sr-only;
  @apply fixed left-4 top-4 z-50;
  @apply bg-red-primary px-4 py-2 text-white;
}
```

## Implementation Guidelines

1. **Development Priorities**
   - Mobile-first responsive implementation
   - Progressive enhancement
   - Performance optimization
   - Accessibility compliance

2. **Quality Assurance**
   - Cross-browser testing
   - Responsive design verification
   - Performance benchmarking
   - Accessibility audit

3. **Maintenance**
   - Regular content updates
   - Performance monitoring
   - Analytics tracking
   - User feedback collection

## Additional Resources

- [Style Guide](./style-guide.md)
- [Component Library](../src/components)
- [Design Assets](../assets)
- [Brand Guidelines](./brand-guidelines.md) 