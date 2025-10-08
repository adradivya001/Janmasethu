
# JanmaSethu Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Development Journey](#development-journey)
5. [Key Features Implemented](#key-features-implemented)
6. [Challenges & Resolutions](#challenges--resolutions)
7. [File Organization](#file-organization)
8. [Recent Changes](#recent-changes)

---

## Project Overview

**JanmaSethu** is a static, multilingual website serving as a comprehensive knowledge hub for fertility, pregnancy, and early parenting information tailored for Indian families. The platform provides evidence-based content through four specialized lenses:
- Medical
- Social & Emotional
- Financial
- Nutrition

### Core Features
- **Multilingual Support**: English, Hindi, and Telugu
- **Sakhi Chat Companion**: Compassionate emotional support chatbot
- **Knowledge Hub**: Curated articles and guides
- **Treatment Information**: Detailed fertility treatment guides
- **Success Stories**: Real patient experiences
- **Expert Profiles**: Healthcare professional directory
- **Blog Section**: Regular updates and insights
- **Clinic Portal**: Static dashboard for clinic management

---

## Technology Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Routing**: Wouter (lightweight client-side routing)
- **Styling**: TailwindCSS with custom design tokens
- **UI Components**: Radix UI primitives + shadcn/ui
- **State Management**: React hooks + Context API
- **Icons**: Lucide React + Font Awesome

### Backend (Prepared but Static)
- **Server**: Express.js (ready for future API needs)
- **ORM**: Drizzle ORM (configured for PostgreSQL)
- **Database**: Neon Database (configured but not actively used)

### Development Tools
- **TypeScript**: Type safety
- **ESLint/Prettier**: Code quality
- **PostCSS**: CSS processing

---

## Project Structure

```
janmasethu/
├── client/                          # Frontend application
│   ├── public/                      # Static assets
│   │   ├── KnowledgeHub/           # JSON content files
│   │   │   ├── cervical-cerclage-basics.json
│   │   │   ├── cost-planning-101.json
│   │   │   ├── embryo-grading-guide.json
│   │   │   ├── first-trimester-scan.json
│   │   │   ├── ivf-10-min.json
│   │   │   ├── iycf-after-6-months.json
│   │   │   ├── newborn-vaccines-timeline.json
│   │   │   ├── partner-playbook.json
│   │   │   ├── pmmvy-jsy-application-guide.json
│   │   │   ├── post-birth-warning-signs.json
│   │   │   ├── ppd-signs-and-support.json
│   │   │   ├── preeclampsia-basics.json
│   │   │   ├── safe-pregnancy-foods-india.json
│   │   │   ├── second-trimester-checklist.json
│   │   │   ├── vbac-questions-to-ask.json
│   │   │   └── when-to-see-fertility-specialist.json
│   │   ├── treatments/              # Treatment guides
│   │   │   ├── donor.json
│   │   │   ├── icsi.json
│   │   │   ├── iui.json
│   │   │   ├── ivf.json
│   │   │   └── preservation.json
│   │   ├── locales/                 # Localization files
│   │   │   └── whoWeServe.json
│   │   ├── JanmaSethu Logo.png     # Brand assets
│   │   ├── Janmasethu1.mp4         # Hero video
│   │   ├── babyFeet.jpg
│   │   ├── logo.png
│   │   └── sakhi.mp4
│   │
│   ├── src/
│   │   ├── components/              # Reusable components
│   │   │   ├── ui/                  # shadcn/ui components (40+ components)
│   │   │   ├── clinic/              # Clinic-specific components
│   │   │   │   └── ClinicNavigation.tsx
│   │   │   ├── ChatInterface.tsx    # Sakhi chat UI
│   │   │   ├── FloatingLanguage.tsx # Language switcher (legacy)
│   │   │   ├── Footer.tsx           # Site footer
│   │   │   ├── Header.tsx           # Site header with navigation
│   │   │   ├── LanguageSwitcher.tsx # Language toggle
│   │   │   ├── Layout.tsx           # Main layout wrapper
│   │   │   ├── MobileMenu.tsx       # Mobile navigation
│   │   │   └── WhoWeServe.tsx       # Home page section
│   │   │
│   │   ├── pages/                   # Page components
│   │   │   ├── clinic/              # Clinic portal pages
│   │   │   │   ├── Landing.tsx      # Clinic login
│   │   │   │   ├── Dashboard.tsx    # Clinic dashboard
│   │   │   │   ├── Appointments.tsx # Appointment management
│   │   │   │   ├── Patients.tsx     # Patient records
│   │   │   │   ├── LeadManagement.tsx # Lead tracking
│   │   │   │   └── Reports.tsx      # Analytics
│   │   │   ├── Home.tsx             # Landing page
│   │   │   ├── Knowledge.tsx        # Knowledge hub listing
│   │   │   ├── Article.tsx          # Article detail view
│   │   │   ├── Treatments.tsx       # Treatment listing
│   │   │   ├── Treatment.tsx        # Treatment detail
│   │   │   ├── Sakhi.tsx            # Sakhi introduction
│   │   │   ├── SakhiTry.tsx         # Sakhi chat interface
│   │   │   ├── SuccessStories.tsx   # Stories listing
│   │   │   ├── Story.tsx            # Story detail
│   │   │   ├── Blog.tsx             # Blog listing
│   │   │   ├── BlogPost.tsx         # Blog post detail
│   │   │   ├── Experts.tsx          # Expert listing
│   │   │   ├── Expert.tsx           # Expert profile
│   │   │   ├── LifeStages.tsx       # Life stages overview
│   │   │   ├── LifeStage.tsx        # Stage detail
│   │   │   ├── Investors.tsx        # Investor information
│   │   │   └── not-found.tsx        # 404 page
│   │   │
│   │   ├── data/                    # Static data files
│   │   │   ├── clinic/              # Clinic mock data
│   │   │   │   ├── appointments.json
│   │   │   │   ├── leads.json
│   │   │   │   ├── patients.json
│   │   │   │   └── tasks.json
│   │   │   ├── articles.ts          # Article definitions
│   │   │   ├── blog.ts              # Blog posts
│   │   │   ├── experts.ts           # Expert profiles
│   │   │   ├── knowledgeHub.ts      # Knowledge hub content
│   │   │   ├── stories.ts           # Success stories
│   │   │   └── treatments.ts        # Treatment data
│   │   │
│   │   ├── i18n/                    # Internationalization
│   │   │   ├── LanguageProvider.tsx # Language context
│   │   │   └── dictionary.ts        # Translation strings
│   │   │
│   │   ├── hooks/                   # Custom React hooks
│   │   │   ├── use-mobile.tsx
│   │   │   └── use-toast.ts
│   │   │
│   │   ├── lib/                     # Utility libraries
│   │   │   ├── queryClient.ts
│   │   │   └── utils.ts
│   │   │
│   │   ├── utils/                   # Helper functions
│   │   │   └── language.ts
│   │   │
│   │   ├── App.tsx                  # Root component
│   │   ├── main.tsx                 # Entry point
│   │   └── index.css                # Global styles
│   │
│   └── index.html                   # HTML template
│
├── server/                          # Backend (prepared but static)
│   ├── index.ts                     # Server entry point
│   ├── routes.ts                    # API routes
│   ├── storage.ts                   # Storage configuration
│   └── vite.ts                      # Vite integration
│
├── shared/                          # Shared types/schemas
│   └── schema.ts
│
├── docs/                            # Documentation
│   └── PROJECT_DOCUMENTATION.md     # This file
│
├── .replit                          # Replit configuration
├── components.json                  # shadcn/ui config
├── drizzle.config.ts               # Database ORM config
├── package.json                     # Dependencies
├── postcss.config.js               # PostCSS config
├── replit.md                       # Project overview
├── tailwind.config.ts              # Tailwind config
├── tsconfig.json                   # TypeScript config
└── vite.config.ts                  # Vite config
```

---

## Development Journey

### Phase 1: Initial Setup & Core Architecture
**Objective**: Establish project foundation with React, TypeScript, and Vite

**Actions Taken**:
- Initialized React + TypeScript + Vite project
- Configured TailwindCSS with custom design tokens
- Set up Wouter for client-side routing
- Implemented shadcn/ui component library (40+ components)
- Created base Layout with Header and Footer

**Key Decisions**:
- Chose Wouter over React Router for lightweight routing
- Selected shadcn/ui for accessible, customizable components
- Decided on static-first architecture (no backend initially)

### Phase 2: Internationalization (i18n)
**Objective**: Support English, Hindi, and Telugu languages

**Implementation**:
- Created custom `LanguageProvider` using React Context API
- Built dictionary-based translation system (`i18n/dictionary.ts`)
- Implemented `LanguageSwitcher` component
- Added automatic script detection for language switching
- Integrated localStorage for language persistence

**File Structure**:
```
src/i18n/
├── LanguageProvider.tsx    # Context provider with lang state
└── dictionary.ts            # Translation dictionaries
```

### Phase 3: Content Management System
**Objective**: Create flexible content structure for articles, treatments, stories

**Implementation**:
- Designed TypeScript interfaces for content types
- Created static data files in `src/data/`
- Built JSON content files in `public/KnowledgeHub/`
- Implemented lens-based filtering (Medical, Social, Financial, Nutrition)
- Added life stage filtering (TTC, Pregnancy, Postpartum, Early Parenting)

**Content Types**:
1. **Articles**: 16 knowledge hub articles with multilingual support
2. **Treatments**: 5 fertility treatment guides (IVF, IUI, ICSI, Donor, Preservation)
3. **Success Stories**: Patient testimonials
4. **Blog Posts**: Educational content
5. **Expert Profiles**: Healthcare professional directory

### Phase 4: Landing Page & Hero Section
**Objective**: Create compelling first impression with video background

**Initial Design**:
- Static image hero with gradient overlay
- Basic navigation menu
- Simple "Who We Serve" section

**Iterations & Changes**:
1. **Video Integration**: Added background video (`janmasethu.mp4`)
2. **Video Replacement**: Switched to `Janmasethu1.mp4` per user request
3. **Responsive Video**: Made video fully responsive for mobile devices (768px breakpoint)
4. **Navigation Enhancement**: Implemented expandable two-row navigation system

**Current Hero Features**:
- Full-screen video background with gradient overlay
- Responsive design with mobile optimization
- Auto-play, loop, and muted video
- Fallback gradient background

### Phase 5: Navigation System Evolution
**Objective**: Create intuitive, accessible navigation

**Evolution Timeline**:

**Version 1.0**: Basic Navigation
- Single-row navigation with all links
- Mobile hamburger menu
- Language switcher visible everywhere

**Version 2.0**: Expandable Navigation (Current)
- **Primary Row**: Home, Knowledge Hub, Treatments, Sakhi (always visible)
- **Secondary Row**: Life Stages, Success Stories, Blog, Experts, Investors (expandable)
- **"More/Less" Toggle**: Smooth expand/collapse with chevron animation
- **Hover Interaction**: Secondary nav expands on hover
- **Keyboard Support**: ESC key to collapse

**Version 3.0**: Language Switcher Refinement
- **Change**: Removed language switcher from all pages
- **Exception**: Kept on "Try Sakhi" page only (`/sakhi/try`)
- **Reason**: English-only content except for Sakhi chat
- **Implementation**: Conditional rendering in Header component

**Navigation Code Structure**:
```typescript
// Primary navigation (always visible)
const primaryNavItems = [
  { key: 'nav_home', href: '/', priority: 1 },
  { key: 'nav_knowledge', href: '/knowledge', priority: 2 },
  { key: 'nav_treatments', href: '/treatments', priority: 3 },
  { key: 'nav_sakhi', href: '/sakhi', priority: 4 }
];

// Secondary navigation (expandable)
const secondaryNavItems = [
  { key: 'nav_life', href: '/life-stages', priority: 5 },
  { key: 'nav_success', href: '/success-stories', priority: 6 },
  { key: 'nav_blog', href: '/blog', priority: 7 },
  { key: 'nav_experts', href: '/experts', priority: 8 },
  { key: 'nav_investors', href: '/investors', priority: 10 }
];
```

### Phase 6: Sakhi Chat Companion
**Objective**: Provide emotional support through conversational AI simulation

**Implementation**:
- Created `ChatInterface.tsx` component
- Built simulated chat with predefined responses
- Implemented language detection via Unicode script properties
- Added multilingual response system
- Designed compassionate, culturally-aware responses

**Features**:
- Language auto-detection (English, Hindi, Telugu)
- Emotional support for fertility journey concerns
- Privacy-focused (all client-side, no data transmission)
- Smooth typing animation for responses

### Phase 7: Clinic Portal (Static Dashboard)
**Objective**: Create clinic management interface for demonstration

**Implementation**:
- Built separate clinic section under `/clinic` route
- Created static login page (`Landing.tsx`)
- Developed dashboard with key metrics
- Added appointment management system
- Implemented patient records interface
- Built lead management system
- Created analytics/reports page

**Clinic Portal Structure**:
```
pages/clinic/
├── Landing.tsx          # Login/entry point
├── Dashboard.tsx        # Overview with metrics
├── Appointments.tsx     # Appointment calendar & list
├── Patients.tsx         # Patient records management
├── LeadManagement.tsx   # Lead tracking & conversion
└── Reports.tsx          # Analytics & insights
```

**Mock Data**:
```
data/clinic/
├── appointments.json    # Sample appointments
├── leads.json          # Sample leads
├── patients.json       # Sample patient data
└── tasks.json          # Sample tasks
```

### Phase 8: Design System & Styling
**Objective**: Create cohesive visual identity

**Design Tokens**:
- **Background**: Light pastel gradient (#F5F7FF to #FFECEF)
- **Typography**: 
  - Headings: Georgia (system serif)
  - Body: Inter (system sans)
- **Cards**: White background, 24px border radius, custom shadows
- **Primary Gradient**: Purple → Pink → Orange (for CTAs)
- **Accent Colors**: Consistent with fertility/pregnancy themes

**Accessibility**:
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Skip links for screen readers
- Contrast-compliant color scheme

---

## Key Features Implemented

### 1. Multilingual Support
- **Languages**: English (primary), Hindi, Telugu
- **Implementation**: Context-based translation system
- **Coverage**: All UI elements, articles, treatments, stories
- **Persistence**: Language preference stored in localStorage (removed in latest version)

### 2. Knowledge Hub
- 16 comprehensive articles covering:
  - Fertility timing and specialist consultations
  - Pregnancy nutrition and safety
  - Treatment options (IVF, embryo grading)
  - Financial planning (PMMVY, JSY schemes)
  - Postpartum care and mental health
  - Infant care and feeding

### 3. Treatment Guides
- IVF (In Vitro Fertilization)
- IUI (Intrauterine Insemination)
- ICSI (Intracytoplasmic Sperm Injection)
- Donor Programs
- Fertility Preservation

### 4. Sakhi Chat Companion
- Emotional support chatbot
- Multilingual conversations
- Culturally-aware responses
- Privacy-focused design

### 5. Clinic Portal
- Static dashboard for demonstration
- Appointment management
- Patient records
- Lead tracking
- Analytics and reporting

### 6. Responsive Design
- Mobile-first approach
- Tablet and desktop optimization
- Touch-friendly interactions
- Responsive navigation

---

## Challenges & Resolutions

### Challenge 1: Video Background Responsiveness
**Problem**: Hero video not displaying properly on mobile devices (< 768px)

**Symptoms**:
- Video stretched or distorted on mobile
- Poor performance on low-end devices
- Layout breaking at certain breakpoints

**Resolution**:
```typescript
// Implemented responsive video container with proper aspect ratio
<div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-screen">
  <video
    className="absolute inset-0 w-full h-full object-cover"
    autoPlay
    loop
    muted
    playsInline
  >
    <source src="/Janmasethu1.mp4" type="video/mp4" />
  </video>
</div>
```

**Key Learnings**:
- Use `playsInline` attribute for iOS Safari compatibility
- Implement `object-cover` for proper video scaling
- Set responsive height breakpoints (50vh → 60vh → 70vh → 100vh)

### Challenge 2: Language Switcher Conflicts
**Problem**: Language switcher causing errors when removed from components

**Error Messages**:
```
LanguageSwitcher is not defined
useLanguage must be used within a LanguageProvider
```

**Root Cause**:
- Import statement removed but component still referenced
- Conditional rendering path incorrect
- Location comparison using wrong route

**Resolution**:
1. Re-added `LanguageSwitcher` import to `Header.tsx`
2. Fixed conditional rendering logic:
```typescript
{location === '/sakhi/try' && (
  <div>
    <LanguageSwitcher />
  </div>
)}
```
3. Updated `LanguageProvider` to default to English:
```typescript
const [lang, setLangState] = useState<Lang>('en');
```

**Key Learnings**:
- Always check component dependencies before removing imports
- Use exact path matching for conditional rendering
- Test language context availability across all routes

### Challenge 3: Navigation Overflow on Desktop
**Problem**: Too many navigation items causing horizontal overflow

**Symptoms**:
- Navigation items wrapping to multiple lines
- Inconsistent spacing between items
- Poor user experience on medium screens

**Resolution**:
- Implemented expandable two-row navigation system
- Split navigation into primary (4 items) and secondary (5 items)
- Added "More/Less" toggle with smooth animations
- Implemented hover-to-expand functionality

**Implementation Details**:
```typescript
// Smooth transition with max-height animation
className={`overflow-hidden transition-all duration-400 ease-in-out ${
  isExpanded 
    ? 'max-h-24 opacity-100 pointer-events-auto' 
    : 'max-h-0 opacity-0 pointer-events-none'
}`}
```

**Key Learnings**:
- Prioritize navigation items by user journey importance
- Use CSS transitions for smooth UX
- Provide multiple interaction methods (click + hover)

### Challenge 4: JSON Content Loading
**Problem**: Knowledge hub articles not loading from JSON files

**Symptoms**:
- Console logs showing "Using fallback JSON articles: 0"
- Articles displaying with empty content
- File path resolution issues

**Investigation**:
- Verified JSON file structure in `public/KnowledgeHub/`
- Checked fetch URL paths
- Confirmed file naming conventions

**Resolution**:
- Ensured correct public folder structure
- Implemented proper async data fetching
- Added fallback mechanisms for failed loads

**Current Implementation**:
```typescript
// Fetch JSON content from public folder
const response = await fetch(`/KnowledgeHub/${slug}.json`);
const data = await response.json();
```

**Key Learnings**:
- Public folder assets must use absolute paths from root
- Always implement error handling for async operations
- Provide fallback content for better UX

### Challenge 5: Mobile Menu Accessibility
**Problem**: Mobile menu not accessible via keyboard, poor screen reader support

**Symptoms**:
- Cannot tab through menu items
- No focus indicators
- Screen readers not announcing menu state

**Resolution**:
1. Added proper ARIA labels:
```typescript
<Button
  aria-label="Toggle menu"
  data-testid="button-mobile-menu"
>
  <Menu />
</Button>
```

2. Implemented backdrop click-to-close:
```typescript
<div 
  className="fixed inset-0 bg-black/50 z-40"
  onClick={onClose}
  data-testid="backdrop-mobile-menu"
/>
```

3. Added ESC key handler for closing

**Key Learnings**:
- Accessibility should be implemented from the start
- Test with keyboard navigation and screen readers
- Provide multiple ways to dismiss modals/menus

### Challenge 6: Language Persistence & Default State
**Problem**: Language defaulting incorrectly, localStorage conflicts

**Original Implementation**:
```typescript
const [lang, setLangState] = useState<Lang>(() => {
  const stored = localStorage.getItem('js_lang');
  return (stored === 'hi' || stored === 'te' || stored === 'en') ? stored : 'en';
});
```

**Issue**: Persistence causing conflicts when English-only requirement introduced

**Resolution**:
```typescript
// Simplified to always default to English
const [lang, setLangState] = useState<Lang>('en');

// Removed localStorage persistence
const setLang = (newLang: Lang) => {
  setLangState(newLang);
  // No longer persisting to localStorage
};
```

**Key Learnings**:
- Align persistence strategy with feature requirements
- Keep state management simple when possible
- Document language support clearly for users

---

## File Organization

### Content Files
All multilingual content is stored in JSON format with the following structure:

```json
{
  "slug": "unique-identifier",
  "title": {
    "en": "English Title",
    "hi": "हिन्दी शीर्षक",
    "te": "తెలుగు శీర్షిక"
  },
  "overview": { /* translations */ },
  "metadata": { /* readTime, reviewer, sources */ },
  "sections": [ /* content sections */ ]
}
```

### Data Files
TypeScript data files (`src/data/`) define:
- Content structure and types
- Filtering logic
- Display metadata
- Routing information

### Component Organization
```
components/
├── ui/              # Reusable UI primitives (shadcn/ui)
├── clinic/          # Clinic-specific components
├── Layout.tsx       # Page wrapper
├── Header.tsx       # Site navigation
├── Footer.tsx       # Site footer
└── [Feature].tsx    # Feature-specific components
```

---

## Recent Changes

### Latest Updates (Current Session)

1. **Video Asset Update**
   - Replaced `janmasethu.mp4` with `Janmasethu1.mp4`
   - Updated video source in `Home.tsx`
   - Maintained all existing functionality

2. **Language Switcher Refinement**
   - Removed from global header
   - Kept only on `/sakhi/try` page
   - Implemented conditional rendering based on route

3. **Language System Simplification**
   - Set default language to English only
   - Removed localStorage persistence
   - Streamlined LanguageProvider logic

4. **Error Fixes**
   - Resolved LanguageSwitcher import issues
   - Fixed conditional rendering path for language toggle
   - Corrected LanguageProvider context availability

### Pending Enhancements
- [ ] Add more knowledge hub articles
- [ ] Expand treatment guides
- [ ] Implement search functionality
- [ ] Add user authentication (when moving to dynamic)
- [ ] Integrate real backend API
- [ ] Add analytics tracking
- [ ] Implement content management system

---

## Development Guidelines

### Adding New Pages
1. Create page component in `src/pages/`
2. Add route in `App.tsx`
3. Update navigation in `Header.tsx`
4. Add translations to `i18n/dictionary.ts`
5. Create corresponding data file if needed

### Adding New Content
1. Create JSON file in `public/KnowledgeHub/` or `public/treatments/`
2. Follow existing structure with multilingual fields
3. Add entry to corresponding data file (`src/data/`)
4. Ensure all three languages are supported

### Styling Guidelines
- Use TailwindCSS utility classes
- Follow existing component patterns
- Maintain consistent spacing (4, 8, 12, 16, 24, 32px)
- Use design tokens for colors
- Ensure responsive design (mobile-first)

### Accessibility Checklist
- [ ] Semantic HTML elements
- [ ] ARIA labels for interactive elements
- [ ] Keyboard navigation support
- [ ] Focus indicators visible
- [ ] Color contrast compliance
- [ ] Screen reader testing

---

## Deployment Notes

### Current Setup
- **Platform**: Replit
- **Port**: 5000 (development)
- **Build Command**: `npm run build`
- **Start Command**: `npm run start`
- **Environment**: Node.js 20

### Production Considerations
- Static files served from `dist/` after build
- No environment variables required (static site)
- CDN-friendly architecture
- All content pre-rendered

---

## Future Roadmap

### Short-term Goals
1. Complete all knowledge hub articles (target: 30 articles)
2. Add video content to treatment guides
3. Implement advanced search with filters
4. Add user feedback mechanism

### Long-term Vision
1. **Backend Integration**
   - User authentication and profiles
   - Personalized content recommendations
   - Real-time chat with healthcare professionals
   - Appointment booking system

2. **Enhanced Features**
   - AI-powered Sakhi with NLP
   - Pregnancy tracker with milestones
   - Community forum
   - Telemedicine integration

3. **Expansion**
   - Add more regional languages
   - Partner with healthcare providers
   - Mobile app development
   - International markets

---

## Contributing

### Code Style
- TypeScript strict mode enabled
- ESLint rules enforced
- Prettier for formatting
- Meaningful variable names
- Comprehensive comments for complex logic

### Git Workflow
- Feature branches for new development
- Descriptive commit messages
- Code review before merging
- Regular dependency updates

---

## Support & Resources

### Documentation
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Docs](https://tailwindcss.com/docs)
- [Radix UI Docs](https://www.radix-ui.com/docs/primitives)

### Project-Specific
- `replit.md` - Project overview
- `components.json` - UI configuration
- `tailwind.config.ts` - Design system tokens

---

**Last Updated**: Current Session  
**Maintainer**: Project Team  
**Version**: 1.0.0 (Static MVP)
