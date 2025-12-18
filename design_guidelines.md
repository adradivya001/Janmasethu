# Janma Sethu Design Guidelines

## Design Approach
**Hybrid Approach**: Drawing from wellness apps (Headspace, Calm) for emotional warmth + Material Design chat patterns for functional clarity. The design balances clinical professionalism with compassionate accessibility.

## Core Design Elements

### Typography
- **Primary Font**: Inter (Google Fonts) - clean, modern, highly legible
- **Headings**: 
  - H1: 3.5rem (56px), font-weight 700, leading tight
  - H2: 2.5rem (40px), font-weight 600
  - H3: 1.75rem (28px), font-weight 600
- **Body**: 1rem (16px), font-weight 400, leading relaxed for comfort
- **Chat Messages**: 0.9375rem (15px), font-weight 400
- **Captions/Labels**: 0.875rem (14px), font-weight 500

### Layout System
**Spacing Primitives**: Tailwind units of 3, 4, 6, 8, 12, 16, 20
- Component padding: p-6, p-8
- Section spacing: py-16, py-20
- Chat message gaps: gap-4, gap-6
- Button padding: px-6 py-3, px-8 py-4

**Containers**:
- Chat interface: max-w-4xl (centered)
- Content sections: max-w-6xl
- Navigation: full-width with max-w-7xl inner

## Component Library

### Navigation
**Sticky Header** (backdrop-blur with gradient overlay):
- Logo left, primary nav center, CTA button right
- Height: h-20
- Items: Home, About Sakhi, Resources, Expert Connect, Login
- Transparent with subtle gradient background, shadow on scroll

### Hero Section
**Full-width, asymmetric layout** (70vh min-height):
- Left column (50%): Headline + subtext + CTA buttons (primary + secondary)
- Right column (50%): Warm, supportive hero image showing diverse expecting parents or peaceful parenting moment
- Gradient overlay: purple-to-pink subtle wash over background
- Buttons with backdrop-blur-md backgrounds when over imagery

### Chat Interface (Sakhi)
**Primary Feature - Full viewport treatment**:
- Container: max-w-4xl, centered, rounded-2xl card with subtle shadow
- Header bar: Sakhi avatar (left) + "Chat with Sakhi" + status indicator
- Message area: min-h-[500px], max-h-[70vh], scrollable, p-8
- User messages: Right-aligned, rounded-3xl bubbles, gradient fill (purple→pink)
- Sakhi messages: Left-aligned, rounded-3xl, soft neutral background
- Message spacing: gap-6 between conversations, gap-3 within thread
- Input area: Fixed bottom, rounded-full input with send button, p-4
- Typing indicator: Animated dots in Sakhi message bubble

### Feature Cards
**Three-column grid** (responsive to 1-column mobile):
- Icon: 48px, gradient circle background
- Title: H3 size, mb-3
- Description: Body text, text-neutral-600
- Hover: Gentle lift (translate-y-1), increased shadow
- Cards: rounded-xl, p-8, border with gradient accent

### Testimonials
**Two-column masonry layout**:
- Photo: rounded-full, 64px, with gradient ring
- Quote: Larger body text (1.125rem), italic
- Name + role: Small text below
- Cards: rounded-2xl, p-10, soft backgrounds with gradient accents

### Expert Connect Section
**Full-width with two-column split**:
- Left: Expert profiles in horizontal scroll cards
- Right: Appointment booking form (embedded or CTA)
- Profile cards: Photo, name, specialty, availability badge, "Book" button

### Resources Section
**Magazine-style grid** (3-column to 1-column):
- Large preview image (16:9 ratio)
- Category tag with gradient background
- Title + excerpt
- "Read More" link with arrow

### Footer
**Multi-column comprehensive footer**:
- Column 1: Logo + mission statement
- Column 2: Quick Links (About, Privacy, Terms)
- Column 3: Resources (Blog, FAQs, Support)
- Column 4: Contact + Social icons
- Bottom bar: Copyright + trust badges
- Newsletter signup: Inline form with gradient button

## Images

### Required Images
1. **Hero Image** (Large): Warm, authentic photo of expecting parents or peaceful parenting moment. Natural lighting, diverse representation, shot in soft focus. Positioned right side of hero, taking 50% width
2. **Sakhi Avatar**: Friendly, gender-neutral illustration or icon representing the AI companion (used in chat header)
3. **Feature Icons**: Use Heroicons via CDN - heart, chat-bubble, calendar, users, shield-check
4. **Expert Photos**: Professional headshots for Expert Connect section (3-4 placeholder slots)
5. **Testimonial Photos**: Authentic user photos (4-6 slots with gradient ring treatment)
6. **Resource Thumbnails**: Article/blog preview images for Resources section (6 slots, 16:9 ratio)

### Image Treatment
- All photos: Subtle warm filter overlay
- Borders: Gradient accent rings where applicable
- Loading: Soft blur-to-sharp transitions

## Interactions
- Chat input: Focus state with gradient ring
- Buttons: Subtle scale on hover (scale-105), no elaborate animations
- Cards: Gentle lift and shadow increase
- Navigation: Smooth scroll to sections
- Form inputs: Gradient border on focus

## Accessibility
- Chat messages: Clear contrast ratios (WCAG AA minimum)
- Interactive elements: Minimum 44px touch targets
- Focus indicators: Visible gradient rings
- Screen reader labels: All icons and images
- Keyboard navigation: Full tab order through chat and forms

**Design Philosophy**: Create a sanctuary of support through gentle gradients, ample whitespace, and thoughtful hierarchy. Every element should communicate safety, professionalism, and compassion. The chat interface is the heart - make it inviting and effortless.