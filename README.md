# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with .

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/9b442949-8e5f-4be2-9d05-a4a4a64bc1ee) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)

# Global Rules for Cursor AI

## Change Management Rules
1. Pre-Change Verification:
   - Validate all schema changes before execution
   - Check for dependent components
   - Verify data integrity constraints
   - Test backward compatibility
   - Document potential impact

2. Change Implementation:
   - Use versioned migrations
   - Implement rollback procedures
   - Follow atomic change patterns
   - Log all modifications
   - Include change metadata

3. Testing Requirements:
   - Create pre-change test cases
   - Validate post-change functionality
   - Test rollback procedures
   - Verify data consistency
   - Check performance impact

4. Documentation Standards:
   - Document change purpose
   - List affected components
   - Include rollback instructions
   - Update API documentation
   - Record testing results

5. Safety Protocols:
   - Use change verification decorators
   - Implement staged rollouts
   - Monitor system metrics
   - Set up alerts
   - Create recovery points

6. Code Quality Checks:
   - Run static analysis
   - Check type safety
   - Validate dependencies
   - Review error handling
   - Test edge cases

7. Performance Considerations:
   - Measure before/after metrics
   - Check query performance
   - Monitor memory usage
   - Validate response times
   - Test under load

8. Security Measures:
   - Audit permission changes
   - Verify access controls
   - Check data encryption
   - Validate input handling
   - Test security boundaries

9. Deployment Process:
   - Use staged deployments
   - Implement feature flags
   - Monitor deployment metrics
   - Enable quick rollback
   - Verify in staging first

10. Monitoring Requirements:
    - Track error rates
    - Monitor performance metrics
    - Log system changes
    - Alert on anomalies
    - Maintain audit trail

11. Change Validation:
    - Verify business logic
    - Test data migrations
    - Check API contracts
    - Validate UI components
    - Test integrations

12. Recovery Procedures:
    - Document rollback steps
    - Create recovery scripts
    - Test backup systems
    - Verify data restoration
    - Plan contingencies

# Fashionista Valentine Portal

[![CI/CD Pipeline](https://github.com/sanji/fashionista-valentine-portal/actions/workflows/ci.yml/badge.svg)](https://github.com/sanji/fashionista-valentine-portal/actions/workflows/ci.yml)

## Overview
Fashion event management portal for Fashionistas

## Features

- **Event Management**: Create and manage fashion events with detailed venue information and scheduling
- **Designer Profiles**: Showcase designers and their collections
- **Ticket Sales**: Flexible ticketing system with early bird discounts and special pricing
- **Registration System**: Streamlined registration process for attendees
- **Sponsorship Management**: Track and manage event sponsors and their contributions
- **Image Gallery**: Organize and display event-related images
- **Location Services**: Built-in geospatial features for venue mapping

## Tech Stack

- **Backend**: Node.js with Express
- **Database**: PostgreSQL with PostGIS (via Supabase)
- **Authentication**: Supabase Auth
- **Language**: TypeScript
- **Testing**: Jest
- **Code Quality**: ESLint, Prettier
- **API Documentation**: OpenAPI/Swagger

## Prerequisites

- Node.js (v18 or higher)
- npm (v9 or higher)
- PostgreSQL (v14 or higher)
- Supabase account and project

## Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/fashionista-portal.git
   cd fashionista-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   ```bash
   cp .env.example .env
   cp .env.example .env.test
   ```

4. Update environment variables in `.env` and `.env.test` with your Supabase credentials and other configurations.

## Database Setup

1. Create a new Supabase project and get your credentials

2. Run database migrations:
   ```bash
   npm run migrate
   ```

## Development

Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm test
```

Run tests with coverage:
```bash
npm test -- --coverage
```

## Code Quality

Run linting:
```bash
npm run lint
```

Format code:
```bash
npm run format
```

## API Documentation

API documentation is available at `http://localhost:3000/api-docs` when running the server.

## Database Schema

### Core Tables

- **events**: Fashion event details and venue information
- **designers**: Designer profiles and contact information
- **collections**: Fashion collections linked to designers and events
- **tickets**: Ticket types and pricing for events
- **registrations**: Event registrations and payment tracking
- **sponsors**: Sponsor information and contribution details
- **fashion_images**: Image management for events and collections

### Key Features

- PostGIS integration for location-based features
- Comprehensive indexing strategy
- Automated timestamp management
- Referential integrity with cascading deletes
- Custom enum types for consistent data

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.
