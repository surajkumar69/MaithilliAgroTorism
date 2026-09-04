# Design System: Maithili Agro Tourism

This document codifies the design language and technical implementation for Maithili Agro Tourism.

## 1. Core Philosophy

**"Modern and natural, not clinical."**
The palette is drawn from the Mulshi landscape: Sahyadri hill green, laterite soil red-brown, turmeric/marigold, and a warm khadi-cream ground. We explicitly avoid clinical white backgrounds, gradient text, glassmorphism, and generic "eco" clip art.

## 2. Colors (Tailwind v4 `@theme`)

### Forest (Primary Greens)
- `forest-50` to `forest-950`: Used for text, borders, and UI elements.
- *Default Text*: `forest-900` (#081c15 - warm dark brown-green ink)

### Earth (Backgrounds & Neutrals)
- `earth-50` to `earth-900`: Used for backgrounds and cards.
- *Default Background*: `earth-50` (#fdfbf7 - khadi cream)

### Accents
- `accent-gold`: Primary calls to action (turmeric/marigold).
- `accent-leaf`: Secondary interactive elements, hover states.

## 3. Typography (Two Families)

We use two font families to balance the brand's natural feel with UI legibility:
1. **Display (Serif)**: `Playfair Display` (or similar variable serif) for all `h1`, `h2`, `h3` headings. It carries the "resort" feel.
2. **UI (Sans)**: `Plus Jakarta Sans` for body text, forms, and dense data.

## 4. Motion System & Microinteractions

We rely heavily on CSS-driven animations that degrade gracefully.

### Primitives
- **Staggered Reveal**: Elements fade up `translateY(20px)` -> `0` with staggered delays (100ms - 400ms) triggered by IntersectionObserver or CSS scroll timelines.
- **Card Hover Lift**: Cards lift on hover (`-translate-y-1`) and their shadow deepens.
- **Button Press**: Active scale down (`scale-95` / `0.98`) on click for physical feedback.

### Form Microinteractions
- **Floating Labels**: Input labels start centered and float to the top-left on focus or when populated.
- **Loading States**: Buttons show a spinner without dimming opacity to ensure they feel active and confident.

## 5. UI Inventory

Built in `src/components/ui/`:
- `Button`: Standardized CTA, ghost, outline, and link variants.
- `Input`: Floating label implementation.
- `Stepper`: Custom numeric input for adults/children selection.
- `Card`: Standardized container with hover lift.
