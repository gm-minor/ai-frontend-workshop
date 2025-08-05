# GitHub Copilot Instructions

## Project Overview
This is an AI Frontend Workshop project built with Next.js, TypeScript, and Tailwind CSS.

## Code Style and Standards
- Use TypeScript for all new files
- Follow ESLint configuration rules
- Use functional components with React hooks
- Prefer arrow functions for component definitions
- Use meaningful variable and function names
- Add JSDoc comments for complex functions

## Architecture Guidelines
- Follow Next.js 13+ app directory structure
- Keep components in `src/components/` directory
- Use server components by default, add 'use client' only when needed
- Organize utilities in `src/lib/` or `src/utils/`
- Place types in `src/types/` directory

## Styling Preferences
- Use Tailwind CSS for styling
- Create reusable component variants using class composition
- Use CSS modules only when Tailwind is insufficient
- Follow mobile-first responsive design principles

## Testing Approach
- Write unit tests for utility functions
- Use React Testing Library for component tests
- Place tests adjacent to the code they test with `.test.ts` or `.spec.ts` extensions

## Performance Considerations
- Optimize images using Next.js Image component
- Use dynamic imports for code splitting when appropriate
- Implement proper error boundaries
- Use React.memo() for expensive components

## Security Guidelines
- Sanitize user inputs
- Use environment variables for sensitive data
- Validate API responses
- Follow OWASP security best practices

## Git Workflow
- Use meaningful commit messages
- Create feature branches from main
- Use descriptive branch names (feature/*, bugfix/*, etc.)
- Keep commits atomic and focused

## Documentation
- Update README.md when adding new features
- Document component props using TypeScript interfaces
- Add inline comments for complex business logic
- Keep this file updated with project-specific guidelines
- Always conform to the project details defined in the files located at /ai-workshop/ai-docs when providing answers and    generating code
- Check sites like https://cursor.directory/rules or https://github.com/PatrickJS/awesome-cursorrules for example instructions.