# Replit.md

## Overview
Janma Sethu is a static, multilingual website that serves as a knowledge hub for fertility, pregnancy, and early parenting information tailored for Indian families. The platform provides evidence-based content through four lenses (Medical, Social & Emotional, Financial, and Nutrition) and includes "Sakhi," a compassionate chat companion for emotional support. The application is built as a React Single Page Application (SPA) with no backend dependencies, using local storage for data persistence.

## User Preferences
Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite for build tooling
- **Routing**: Wouter for client-side routing with support for 9 main sections
- **Styling**: TailwindCSS with custom design tokens following a light pastel gradient theme
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **State Management**: React hooks and Context API for language management
- **Data Storage**: Browser localStorage for language preference persistence (key: `js_lang`)

### Internationalization
- **Languages**: English (en), Hindi (hi), Telugu (te)
- **Implementation**: Custom LanguageProvider context with dictionary-based translations
- **Script Detection**: Automatic language detection based on text input using Unicode script properties
- **Persistence**: Selected language stored in localStorage and applied on first paint

### Content Management
- **Static Data**: All content stored in TypeScript data files (articles, treatments, stories, experts, blog posts)
- **Content Types**: Articles with lens/stage filtering, treatment guides, success stories, expert profiles, blog posts
- **Search & Filtering**: Client-side filtering by content type, life stage, and lens categories

### Component Architecture
- **Layout System**: Consistent header/footer with mobile-responsive navigation
- **Page Components**: Dedicated pages for each content section with shared UI patterns
- **Reusable Components**: Card-based design system with consistent styling
- **Mobile Experience**: Responsive design with floating language switcher and mobile menu

### Design System
- **Theme**: Light pastel gradient background (#F5F7FF to #FFECEF)
- **Typography**: System serif for headings (Georgia), system sans for body text (Inter)
- **Cards**: White background with 24px border radius and custom shadows
- **Gradients**: Primary gradient (purple to pink to orange) for CTAs and highlights
- **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, skip links

### Chat Interface (Sakhi)
- **Type**: Simulated chat interface with predefined responses
- **Language Support**: Responds in the same language as user input (detected via script)
- **Emotional Support**: Pre-written responses for common fertility journey concerns
- **Privacy**: All interactions remain client-side, no data transmission

## External Dependencies

### Development Tools
- **Vite**: Build tool and development server with React plugin
- **TypeScript**: Type safety and development experience
- **ESLint/Prettier**: Code quality and formatting (implied from package structure)

### UI and Styling
- **TailwindCSS**: Utility-first CSS framework with PostCSS processing
- **Radix UI**: Accessible component primitives (@radix-ui/react-*)
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Component variant management
- **clsx/tailwind-merge**: Conditional class name utilities

### Fonts and Assets
- **Google Fonts**: Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono
- **Unsplash**: Image CDN for placeholder images throughout the application
- **Font Awesome**: Icon fonts for specific UI elements

### Build and Deployment
- **React Query**: Data fetching library (though not used for network requests in static mode)
- **Wouter**: Lightweight client-side routing
- **Date-fns**: Date manipulation utilities

### Backend Infrastructure (Prepared but Unused)
- **Express.js**: Server framework ready for future API needs
- **Drizzle ORM**: Database ORM configured for PostgreSQL
- **Neon Database**: PostgreSQL database service configured but not actively used
- **Session Management**: Connect-pg-simple for session storage

Note: The application currently operates in fully static mode without backend connectivity, but includes prepared infrastructure for future server-side features.