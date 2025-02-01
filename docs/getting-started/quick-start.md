# Quick Start Guide

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development Setup](#development-setup)
- [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Next Steps](#next-steps)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)
- Git
- Visual Studio Code with Cursor extension

## Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/username/fashionista-valentine-portal.git
   cd fashionista-valentine-portal
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your local configuration.

## Development Setup

1. **IDE Configuration**
   - Install recommended VS Code extensions:
     ```json
     {
       "recommendations": [
         "cursor.cursor",
         "dbaeumer.vscode-eslint",
         "esbenp.prettier-vscode",
         "bradlc.vscode-tailwindcss"
       ]
     }
     ```
   - Configure Cursor settings according to `.cursorules`

2. **Git Configuration**
   ```bash
   git config core.autocrlf false
   git config --local commit.template .gitmessage
   ```

## Running the Application

1. **Start Development Server**
   ```bash
   npm run dev
   ```
   Access the application at `http://localhost:5173`

2. **Run Tests**
   ```bash
   npm test           # Run unit tests
   npm run test:e2e   # Run E2E tests
   ```

3. **Build for Production**
   ```bash
   npm run build
   npm run preview    # Preview production build
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm test` - Run unit tests
- `npm run test:e2e` - Run E2E tests
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier
- `npm run type-check` - Run TypeScript type checking
- `npm run validate-translations` - Validate translation files

## Project Structure

```
fashionista-valentine-portal/
├── src/
│   ├── components/        # Reusable components
│   ├── pages/            # Page components
│   ├── hooks/            # Custom hooks
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── i18n/             # Internationalization
│   ├── styles/           # Global styles
│   └── App.tsx           # Root component
├── public/               # Static assets
├── docs/                 # Documentation
├── tests/                # Test files
└── package.json          # Project configuration
```

## Key Features

1. **Internationalization**
   - Multiple language support
   - Translation management
   - Language switching

2. **Component Library**
   - Reusable UI components
   - Form components
   - Layout components

3. **Routing**
   - Page-based routing
   - Protected routes
   - Route transitions

4. **State Management**
   - React hooks
   - Context API
   - Local storage

5. **Styling**
   - Tailwind CSS
   - Custom theme
   - Responsive design

## Next Steps

1. **Explore Documentation**
   - Review [Architecture Overview](./architecture.md)
   - Read [Development Guidelines](../guidelines/coding-standards.md)
   - Check [i18n Documentation](../i18n/overview.md)

2. **Start Development**
   - Pick an issue from the project board
   - Follow the git workflow
   - Submit pull requests

3. **Get Help**
   - Join team discussions
   - Review troubleshooting guide
   - Contact team leads

## Common Issues

### Build Errors
```bash
# Clear node modules and reinstall
rm -rf node_modules
npm install

# Clear build cache
npm run clean
```

### Type Errors
- Ensure TypeScript version matches project
- Run type checking: `npm run type-check`
- Check for missing type definitions

### Translation Issues
- Validate translation files
- Check namespace configuration
- Review language detection settings

## Additional Resources

- [Project Wiki](../wiki)
- [Component Documentation](../components)
- [API Documentation](../api)
- [Testing Guide](../testing)
- [Deployment Guide](../deployment) 