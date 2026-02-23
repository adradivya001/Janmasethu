# Phase 1: Brainstorming with AI — JanmaSethu Landing Page Enhancement
**Author:** Jatin  
**Period:** February 10 – February 20, 2026 (8 Working Days)  
**Project:** JanmaSethu — Landing Page Renovation & Enhancement

---

## 1. The Problem: What Gap Was I Trying to Solve?

When I started, the JanmaSethu landing page had a fundamental problem: **it was a generic healthcare landing page that treated every visitor the same.** A woman trying to conceive (TTC), a woman in her 28th week of pregnancy, and a new mother—all three saw the exact same hero section, the same CTAs, and the same content priority.

### The specific gaps I identified:

| Gap | Description |
| :--- | :--- |
| **No Personalization** | Everyone got a one-size-fits-all experience. No context about *their* journey stage. |
| **Weak First Impression** | The hero section was a static banner—no narrative, no emotional connection, no storytelling. |
| **CTA Friction** | There were too many competing calls to action. Users would leak into passive content (Knowledge Hub) instead of engaging with the core product (Sakhi chatbot). |
| **Generic UI Components** | Standard buttons, default font stacks, no micro-animations. The page *worked* but didn't *wow*. |
| **Navigation Chaos** | Links were in a confusing order, z-index layering was broken, and the logo was too small to convey brand trust. |
| **No Interactive Tools** | For a parenthood platform, we had zero calculators, checklists, or quick utilities that users actually search for. |

**In simple terms:** The landing page *described* what JanmaSethu does. But it didn't *demonstrate* it. It told people "we're here for your journey" without actually knowing which journey they were on.

---

## 2. How I Used AI to Kick Things Off

I didn't just open a blank file and start coding. The first thing I did was **sit down with AI (Antigravity/coding assistant) and brainstorm the architecture** before writing a single `<div>`.

### 2.1 — The Initial Conversations (Day 1-2)

My approach was iterative. Here's how the brainstorming went:

#### **Round 1: "What's wrong with this page?"**
I showed the AI the existing landing page structure and asked it to do a **ruthless conversion audit** — not a polite review, but an honest critique. The AI came back with a 10-principle evaluation matrix:

> *"The page has a 10/10 Aesthetic but a 5/10 Conversion Strategy. It succeeds at creating an emotional atmosphere but fails at providing a clear, frictionless path to the primary action."*  
> — Sakhi Conversion Audit (AI-Generated)

This was the wake-up call. The page *looked* pretty, but it was leaking users.

#### **Round 2: "How do we make it journey-aware?"**
I asked the AI: *"If someone lands on this page and they're 20 weeks pregnant, how should the experience be different from someone who is trying to conceive?"*

The AI proposed a **phased renovation plan** — an 11-phase roadmap that went from setting up a `JourneyContext` (global state management) all the way to analytics integration. This became the master plan I followed for the full 8 days:

- **Phase 0-1:** Journey Context + Selector UI
- **Phase 2:** Dynamic homepage reordering based on stage
- **Phase 3:** Smart Knowledge Hub filtering
- **Phase 4:** Backend sync + Pre-pregnancy tools
- **Phase 5-6:** Calculators + Safety Checker
- **Phase 7:** Making Sakhi context-aware
- **Phase 8-11:** Treatments, Success Stories, Experts, Analytics

#### **Round 3: "What design language should we aim for?"**
I fed the AI references from wellness apps like **Headspace** and **Calm**, healthcare platforms like **Maven Clinic**, and product sites like **Apple's iPhone page** (for scroll-based storytelling). The AI synthesized these into a design guideline document that defined:

- **Color Palette:** Purple-to-Pink gradients (brand warmth) + Teal accents (medical credibility)
- **Typography:** Nohemi for nav, Inter for body, Serif for editorial headings
- **Design Philosophy:** *"Create a sanctuary of support through gentle gradients, ample whitespace, and thoughtful hierarchy."*
- **Figma Spec:** A full component-level specification (typography sizes, spacing, animation durations)

### 2.2 — How I Used AI During Development (Day 3-8)

Once the brainstorming was done, the AI became my **pair programmer**. Here's the pattern:

1. **I described what I wanted** in plain English (e.g., *"I want the button to feel like it's breathing — an internal circle expands on hover"*)
2. **AI generated the implementation** — the `AnimatedButton.tsx` component with `framer-motion` animations
3. **I tested it**, found issues (e.g., *"the text doesn't vanish smoothly"*), and went back to iterate
4. **AI refined it** — each conversation was a tightening loop

This wasn't "copy-paste from AI." It was a **dialogue** — me spotting UX problems, AI solving them technically, me pushing for more polish.

---

## 3. The "Wait, That's Actually It" Moments

Over 8 days of working with AI, there were **three moments** where the output genuinely surprised me:

### 💡 Moment 1: The Journey-Aware Dashboard Concept (Day 1)

When I asked how to personalize the homepage, I expected the AI to suggest something simple like "show different banners." Instead, it proposed a **real-time calculated dashboard**:

>  *"For a pregnant user, show their current Week (calculated from their due date), their Trimester, and the baby's size comparison (e.g., 'Your baby is the size of a Blueberry'). For a TTC user, show their fertile window countdown. For a parent, show their child's age in months and the next vaccination milestone."*

That wasn't just personalization — that was **genuine utility** baked into the homepage. This became the `JourneyDashboard.tsx` component, and it's the first thing users see after the hero.

### 💡 Moment 2: The Cinematic Hero (Day 6-7)

I told the AI I wanted something "Apple-level" for the hero section. The AI proposed a **split-screen scrollytelling** approach:
- **Left column:** A sticky canvas playing a 60-frame image sequence (a mother's silhouette with swaying leaves)
- **Right column:** Scroll-linked narrative text that transitions through three emotional phases:
  1. **"The Hook"** — *"Every journey to parenthood deserves a companion"*  
  2. **"The Empathy"** — *"We know the 3 AM doubts, the Google rabbit holes"*
  3. **"The Resolution"** — *"That's why we built Sakhi"*

The technical implementation used `framer-motion`'s `useScroll` and `useTransform` hooks with HTML5 Canvas for the image sequencing. When I first saw the scroll-driven text fading in sync with the canvas frames — that was the "this is actually premium" moment.

### 💡 Moment 3: The Conversion Audit (Day 5)

When the AI delivered the **Sakhi Conversion Audit** document, it identified something I'd completely missed:

> *"The secondary button in the Hero section ('Browse Knowledge Hub') gives users an easy exit. Users who are 'almost ready' to chat will click the Hub to 'learn more,' lose momentum, and never start the conversation."*

It called this the **"Conversion Leak"** — the Knowledge Hub CTA was stealing conversions from the primary product (Sakhi). This directly led me to restructure the CTA hierarchy across the landing page.

---

## 4. Day-by-Day Summary: What I Actually Built

### 📅 Days 1-2 (Feb 10-11): Foundation & Architecture
| What I Did | How AI Helped |
| :--- | :--- |
| Built `JourneyContext` (global state for TTC/Pregnant/Parent) | AI designed the context API, types, and localStorage fallback |
| Created `JourneySelector` modal + `JourneyStickyHeader` | AI proposed the modal UX flow with date pickers per stage |
| Implemented dynamic homepage reordering | AI defined the section priority logic per journey stage |
| Created the `JourneyDashboard` with live calculations | AI wrote the week calculation, trimester logic, and baby size comparison data |
| Built the `JourneyTimeline` — interactive 5-stage visual timeline | AI designed the component and animation specs |
| Generated "System Design Tasks - Week 1" planning doc | AI structured the task breakdown |
| Landing Page CRO Optimization — reduced Hero→CTA friction | AI generated the conversion audit document |

### 📅 Days 3-4 (Feb 13-14): Navigation & Content Polish
| What I Did | How AI Helped |
| :--- | :--- |
| Increased logo size (2x) with absolute centering | AI handled the tricky CSS for oversized logos within constrained nav containers |
| Restored "For Clinics" and "Clinic Portal" links | AI updated both Header and Footer components |
| Fixed `App.tsx` import errors (module resolution) | AI traced file paths and corrected route mappings |
| Launched premium article page layout | AI created the design system for long-form content |
| Overhauled typography (H1-H6 hierarchy) | AI defined sizes, weights, and line-heights per heading level |
| Added sticky article nav + metadata display | AI built the scroll-tracking sticky header |

### 📅 Days 5-6 (Feb 16-17): Visual Effects & Hero Rebuild
| What I Did | How AI Helped |
| :--- | :--- |
| Implemented "Corner Sweep" language transition effect | AI designed the CSS animation from bottom-right to top-left |
| Synced transition gradients with brand palette | AI matched gradient stops to the Purple-to-Pink theme |
| Created `AnimatedButton.tsx` (expanding circle hover effect) | AI built the component with `em`-based responsive sizing |
| Rebuilt `AuthModal.tsx` (single-card login/signup flow) | AI redesigned the modal from tabs to a toggle pattern |
| Built `CinematicHero.tsx` (scroll-driven canvas hero) | AI implemented framer-motion scroll tracking + HTML5 Canvas |
| Replaced all major CTAs with AnimatedButton | AI updated Hero, Sakhi Preview, and Knowledge Hub sections |

### 📅 Days 7-8 (Feb 18-19): Widget UX & Final Polish
| What I Did | How AI Helped |
| :--- | :--- |
| Implemented floating widget edge-snapping (drag to left/right edge) | AI built the `useSnapToEdge` hook with spring physics |
| Fixed expanded widget clipping near screen edges | AI added dynamic repositioning logic |
| Reordered navigation (Home→Knowledge Hub→Sakhi→Tools→...) | AI updated `navConfig` array in Header + MobileMenu |
| Fixed sticky nav bar z-index overlap with page content | AI audited and corrected the full z-index stack |
| Designed "Wobble, Float & Glow" widget hover animation | AI created the CSS keyframe animation set |
| Verified hover animation compatibility with drag/expand | AI tested and confirmed no interaction conflicts |

### 📅 Tools Built Along the Way (Integrated across days)
| Tool | Description |
| :--- | :--- |
| **Ovulation Calculator** | Fertile window prediction based on LMP + cycle length |
| **Due Date Calculator** | Estimated delivery date |
| **Baby Cost Calculator** | India-specific cost estimator with custom input fields |
| **Vaccination Scheduler** | Calendar-based schedule with WHO/IAP recommendations |
| **Safety Checker** | Food/medicine/activity safety lookup (Safe/Caution/Avoid) |
| **Am I Pregnant?** | Symptom-based probability assessment quiz |
| **Pre-Pregnancy Readiness Checklist** | Medical, lifestyle, financial, and conversation checklist |
| **Conception Date Calculator** | Reverse calculation from due date |
| **Pregnancy Week-by-Week** | Detailed weekly development guide |

---

## 5. Key Takeaways

1. **AI is not a replacement — it's an accelerator.** I didn't hand off the project. I directed every decision, spotted every UX issue, and pushed for every refinement. AI handled the implementation speed.

2. **Brainstorming with AI > Brainstorming alone.** The conversion audit, the journey-aware dashboard concept, and the cinematic hero — none of these would have come from me staring at a blank screen. They came from **dialogue**.

3. **The iterative loop is everything.** No AI output was shipped as-is. Every component went through 2-3 rounds of "this doesn't feel right → fix this → now it's better."

4. **Design direction matters more than code.** The biggest impact came from *deciding what to build* (the brainstorming), not from *how fast I coded it*. The 11-phase roadmap took 2 hours to finalize with AI — and it guided 8 days of execution.

---

## 6. Stats at a Glance

| Metric | Value |
| :--- | :--- |
| **Total Working Days** | 8 |
| **Total Features/Changes** | 65+ |
| **Components Created/Modified** | 40+ |
| **Pages Enhanced** | 10 (Home, Knowledge Hub, Sakhi, Tools, Treatments, Success Stories, Experts, Blog, Articles, Investors) |
| **Tools Built** | 9 interactive calculators/checkers |
| **Design Documents Generated** | 4 (Design Guidelines, Figma Spec, Conversion Audit, Team Requirements) |
| **AI Conversations** | 20+ brainstorming/implementation sessions |

---

*Document generated: February 20, 2026*
