# Internationalization (i18n) System Overview

## Table of Contents
- [Introduction](#introduction)
- [Technology Stack](#technology-stack)
- [File Structure](#file-structure)
- [Key Concepts](#key-concepts)
- [Implementation Guide](#implementation-guide)
- [Best Practices](#best-practices)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Introduction

The Fashionista Valentine Portal uses a comprehensive internationalization system built on react-i18next. This system enables seamless translation of content across multiple languages while maintaining a consistent user experience.

### Goals
- Support multiple languages (currently English and Spanish)
- Enable easy addition of new languages
- Maintain consistent translations across the application
- Provide fallback mechanisms for missing translations
- Support dynamic content translation

## Technology Stack

- **react-i18next**: Core translation framework
- **i18next-browser-languagedetector**: Automatic language detection
- **i18next-http-backend**: Lazy loading of translations
- **TypeScript**: Type safety for translation keys

## File Structure

```
src/
└── i18n/
    ├── config.ts                 # i18n configuration
    └── locales/
        ├── en/                   # English translations
        │   ├── common.json       # Shared translations
        │   ├── home.json        # Home page translations
        │   ├── models.json      # Models page translations
        │   └── sponsors.json    # Sponsors page translations
        └── es/                   # Spanish translations
            ├── common.json
            ├── home.json
            ├── models.json
            └── sponsors.json
```

## Key Concepts

### 1. Translation Keys
Translation keys follow a hierarchical structure:
```typescript
{
  "section": {
    "subsection": {
      "element": "Translation text"
    }
  }
}
```

### 2. Namespaces
Translations are organized into namespaces:
- `common`: Shared translations (navigation, buttons, forms)
- `home`: Home page specific translations
- `models`: Models page specific translations
- `sponsors`: Sponsors page specific translations

### 3. Language Detection
The system automatically detects the user's preferred language:
1. Browser localStorage
2. Browser language settings
3. Navigator language
4. Default fallback (English)

## Implementation Guide

### Basic Usage
```typescript
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation('namespace');
  
  return <h1>{t('section.title')}</h1>;
};
```

### Handling Dynamic Content
```typescript
// With variables
t('welcome', { name: user.name })

// With pluralization
t('items', { count: items.length })
```

### Switching Languages
```typescript
const { i18n } = useTranslation();
i18n.changeLanguage('es');
```

## Best Practices

1. **Key Organization**
   - Use descriptive, hierarchical keys
   - Group related translations
   - Maintain consistent naming patterns

2. **Component Integration**
   - Use translation hook at component level
   - Avoid nested translation calls
   - Handle loading states

3. **Performance**
   - Implement lazy loading for translations
   - Use proper namespacing
   - Cache frequently used translations

4. **Maintenance**
   - Keep translations in sync across languages
   - Document context for translators
   - Regular validation of translation completeness

## Common Patterns

### Form Validation Messages
```typescript
// Translation file
{
  "forms": {
    "validation": {
      "required": "This field is required",
      "email": "Please enter a valid email",
      "minLength": "Must be at least {{count}} characters"
    }
  }
}

// Usage
t('forms.validation.minLength', { count: 8 })
```

### Dynamic Content
```typescript
// Translation file
{
  "notifications": {
    "success": "{{action}} successful!",
    "error": "Error during {{action}}"
  }
}

// Usage
t('notifications.success', { action: 'Registration' })
```

## Troubleshooting

### Common Issues

1. **Missing Translations**
   - Check namespace loading
   - Verify key existence
   - Check fallback configuration

2. **Performance Issues**
   - Review bundle size
   - Implement lazy loading
   - Check translation caching

3. **Type Safety**
   - Use TypeScript interfaces for keys
   - Implement key validation
   - Use translation key constants

### Debugging

Enable debug mode in development:
```typescript
i18next.init({
  debug: process.env.NODE_ENV === 'development'
});
```

## Additional Resources

- [react-i18next Documentation](https://react.i18next.com/)
- [i18next Documentation](https://www.i18next.com/)
- [TypeScript Integration Guide](https://react.i18next.com/guides/typescript)
- [Translation Management Best Practices](https://phrase.com/blog/posts/translation-management-best-practices/) 