# YNU Economics Credit Checker

A Next.js application for checking credit requirements for Yokohama National University (YNU) Economics students.

## Getting Started

**First, read the architecture overview to understand the project structure:**
📖 [Architecture Overview](docs/architecture-overview.md) - Essential reading for understanding the codebase structure and design principles.

For detailed implementation details, see:
📁 [Directory Structure](docs/directory-structure.md) - Complete file-by-file breakdown

## Project Structure

- `frontend/` - Next.js application with TypeScript
- `docs/` - Project documentation including architecture guides

## Technology Stack

- **Framework**: Next.js 15 with React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Testing**: Vitest with Istanbul coverage
- **Linting**: Biome
- **Package Manager**: Bun
- **Storybook**: Component development environment

## Development Setup

```bash
# Install dependencies
cd frontend
bun install

# Run development server
bun run dev

# Run tests
bun run test

# Run tests with coverage
bun run coverage

# Type checking
bun run type-check

# Lint and format
bun run check:write

# CI checks
bun run ci
```

## Key Commands

- `bun run dev` - Start development server with Turbopack
- `bun run build` - Build for production
- `bun run test` - Run Vitest tests
- `bun run coverage` - Generate test coverage reports
- `bun run type-check` - TypeScript type checking
- `bun run check:write` - Biome linting and formatting
- `bun run ci` - CI validation checks
- `bun run storybook` - Start Storybook development server

## Project Features

- Credit requirement checking for different academic programs
- Form-based input with validation using Zod schemas
- Responsive design with mobile-friendly components
- Comprehensive test coverage with Vitest
- Component documentation with Storybook
- Git hooks with Lefthook for code quality

## Important Notes

- Uses Bun as the package manager
- Code formatting and linting enforced with Biome
- Test coverage reports available in `coverage/` directory
- All components have corresponding stories and tests