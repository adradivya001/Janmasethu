# SAKHI Page - Figma Design Specification

## 1. Design Philosophy
- **Style**: Premium Healthcare SaaS (Maven Clinic inspired).
- **Core Values**: Calm, Intelligent, Trustworthy, Medical-Grade.
- **Visual Language**: Clean white space, soft shadows, rounded corners (24px+), clear typography.

## 2. Color Palette

### Primary Colors
- **Teal (Brand)**: `#2EB5A3` (Used for primary actions, progress bars, active states)
- **Teal Light** (Backgrounds): `rgba(46, 181, 163, 0.1)`

### Secondary Colors
- **Pink**: `#DB2777` (Emotional Support accents)
- **Blue**: `#2563EB` (24/7 Availability accents)
- **Green**: `#16A34A` (Privacy accents)
- **Purple**: `#9333EA` (Partner Support accents)

### Neutral Colors
- **Background**: `#FFFFFF` (Clean White) or `#F9FAFB` (Off-white/Gray-50)
- **Text Primary**: `#0F172A` (Slate-900)
- **Text Secondary**: `#64748B` (Slate-500)
- **Borders**: `#E2E8F0` (Slate-200)

## 3. Typography
**Font Family**: `Serif` (e.g., Merryweather/Playfair) for Headings, `Sans-Serif` (Inter/system-ui) for Body.

| Element | Size | Weight | Line Height | Tracking | Notes |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Hero H1** | 48px (MD), 60px (LG) | 700 (Bold) | 1.1 | -0.02em | Serif flavor. |
| **Hero Subtitle** | 18px | 400 (Regular) | 1.6 | Normal | Muted Slate-500. |
| **Feature Title** | 20px | 600/700 | 1.4 | -0.01em | Sans/Heading font. |
| **Body Text** | 16px | 400 | 1.6 | Normal | Readable, relaxed. |
| **Micro Labels** | 12px | 700 | 1.0 | 0.05em | Uppercase, tracking-widest. |

## 4. Components & Layouts

### A. Hero Section
**Layout**: 2-Column Split (Left: Content, Right: Visual).
- **Container**: `container mx-auto px-4` (Standard web container).
- **Gap**: `gap-16` or `gap-20` (64px - 80px).

#### 1. Left Column (Content)
- **Header**: Large Serif H1 + Subtitle.
- **Intro Animation**:
  - **Thin Line**: Height `1px`, Color `#2EB5A3`, Width `300px` (max).
  - **Motion**: Expands Left-to-Right.
- **Vertical Progress Rotator** (The Core Interactive Component):
  - **Track**: `2px` width, `bg-gray-200`, rounded full.
  - **Progress Fill**: `bg-primary` (#2EB5A3), absolute positioned.
  - **List Items**: Stacked vertically.
    - **Active**: Opacity 100%, Title Bold, Description Expanded (`height: auto`).
    - **Inactive**: Opacity 30%, Description Collapsed (`height: 0`).
  - **Interactivity**: 
    - Auto-rotates every 5s.
    - **Hover**: Pauses rotation.
    - **Click**: Jumps to item.

#### 2. Right Column (Visual)
- **Container**: Rounded Rectangle (`rounded-[2.5rem]`).
- **Shadow**: `shadow-2xl` (Soft, large diffuse shadow).
- **Image**: High-quality medical professional or calming patient interaction.
- **Overlay Badge**:
  - **Position**: Bottom-Right (`bottom-10 right-10`).
  - **Style**: Glassmorphism (`bg-white/10 backdrop-blur-md`).
  - **Border**: `border w/20`.
  - **Rounded**: `rounded-full`.

### B. Feature Cards
- **Shape**: `rounded-3xl` (Large border radius).
- **Shadow**: `card-shadow` (Low elevation).
- **Hover**: `hover:shadow-xl`, `transition-all`.
- **Border**: Top Border `4px` in specific accent color (Pink, Blue, etc.).

## 5. Animation Specifications (Motion)

**Global Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` (Material/Standard Ease).

| Interaction | Duration | Property | Easing |
| :--- | :--- | :--- | :--- |
| **Progress Fill** | 5000ms | ScaleY (0 -> 1) | Linear (Active Timer) |
| **Text Fade** | 300ms | Opacity (0.3 -> 1) | Ease-Out |
| **Accordion Open**| 400ms | Height (0 -> Auto) | Cubic Bezier |
| **Intro Line** | 900ms | ScaleX (0 -> 1) | Cubic Bezier |
| **Ken Burns** | 5000ms | Scale (1.1 -> 1.0) | Linear (Slow Zoom) |

## 6. Iconography
- Library: **Lucide React**.
- Style: Stroke width `2px`, Rounded joins.
- Sizes: `24px` (Small), `32px` (Medium), `48px` (Feature Headers).
