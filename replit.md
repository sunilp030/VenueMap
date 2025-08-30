# MapNav Pro

## Overview

MapNav Pro is a React-based indoor mapping and navigation application designed for shopping malls and similar venues. The application provides interactive floor plan visualization with Point of Interest (POI) management, pathfinding capabilities, and mobile-responsive design. It features a map editor for creating and managing POIs, route calculation between points, and a modern user interface built with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

The client application follows a modern React architecture with:

- **Component Framework**: React 18 with TypeScript and Vite for fast development and building
- **UI Library**: Comprehensive shadcn/ui component system with Radix UI primitives and Tailwind CSS styling
- **State Management**: TanStack React Query for server state management and caching
- **Routing**: Wouter for lightweight client-side routing
- **Mobile Support**: Responsive design with mobile-specific components and hooks

### Backend Architecture

The server implements a REST API using Express.js with:

- **API Structure**: RESTful endpoints for floor plans, POIs, and routes with proper HTTP status codes
- **Data Validation**: Zod schemas for request validation and type safety
- **Storage Layer**: Abstracted storage interface with in-memory implementation for development
- **Error Handling**: Centralized error handling middleware with proper error responses

### Data Models

The application defines three core entities:
- **Floor Plans**: Building layouts with dimensions and metadata
- **POIs (Points of Interest)**: Named locations with categories, coordinates, and visual properties
- **Routes**: Pathfinding data between POIs with distance and time estimates

### Component Architecture

Key architectural components include:
- **MapEditor**: Main interactive map interface with tool selection, zoom controls, and mouse-based navigation (zoom with scroll wheel, pan with drag)
- **POI Management**: Modal-based creation/editing with category-based styling
- **Navigation System**: Route calculation and turn-by-turn guidance with detailed step-by-step directions
- **Search Interface**: Mobile-optimized search overlay for POI discovery
- **Responsive Design**: Mobile-first approach with conditional rendering based on screen size
- **Zoom/Pan Controls**: Professional map navigation with transform-based scaling and panning capabilities

### Development Tools Integration

The project integrates modern development tooling:
- **TypeScript**: Full type safety across frontend, backend, and shared schemas
- **Path Mapping**: Organized imports with @ aliases for better code organization
- **Build Optimization**: Vite configuration for optimal bundling and development experience
- **Replit Integration**: Development banner and cartographer plugins for cloud development

## External Dependencies

### Database and ORM

- **PostgreSQL**: Primary database with connection via DATABASE_URL environment variable
- **Drizzle ORM**: Type-safe database operations with schema-first approach
- **Neon Database**: Serverless PostgreSQL provider for cloud deployment

### UI and Styling

- **Tailwind CSS**: Utility-first CSS framework with custom design system variables
- **Radix UI**: Accessible component primitives for complex UI interactions
- **Lucide React**: Modern icon library for consistent iconography
- **Class Variance Authority**: Type-safe component variant management

### Development and Build Tools

- **Vite**: Fast build tool with React plugin and TypeScript support
- **ESBuild**: Fast JavaScript bundler for production builds
- **TanStack React Query**: Server state management with caching and synchronization
- **Wouter**: Lightweight routing solution for single-page applications

### Utility Libraries

- **Zod**: Schema validation for runtime type checking
- **Date-fns**: Date manipulation and formatting utilities
- **clsx**: Conditional className utility for dynamic styling
- **nanoid**: Unique identifier generation for entities