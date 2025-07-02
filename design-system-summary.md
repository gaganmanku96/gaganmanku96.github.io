# Portfolio Design System Summary

## Current Design Patterns Analysis

### Color System
```css
--primary-color: #028090 (Electric Teal)
--secondary-color: #4D96FF (Sapphire Blue)  
--accent-color: #FF6F61 (Coral)
--accent-secondary: #FFA500 (Amber)
```

### Typography Hierarchy
- **Fonts**: Sohne (primary), Inter (secondary), JetBrains Mono (code)
- **Headings**: .heading-primary (4xl-6xl), .heading-secondary (3xl-5xl), .heading-tertiary (2xl-4xl)
- **Body**: .text-body-large (lg-xl), .text-body (base-lg)

### Button System
- **Primary**: Gradient teal-blue, hover effects, shadow
- **Secondary**: Coral-amber gradient, transform animations
- **Vibrant**: Animated gradient background
- **Outline**: Border-based, hover fill

### Card Components
- **Standard**: White/dark background, rounded-2xl, shadow-xl
- **Hover**: Transform animations (-translate-y-2, scale-1.02)
- **Glass**: Backdrop blur, transparent background
- **Uniform**: Equal height with flex layout

### Current Page Inconsistencies

#### Home Page (index.tsx)
- Rich 3D neural network animations
- Hero section with Three.js integration
- Multiple section components
- No standardized layout padding

#### Projects Page
- Grid layout (md:grid-cols-2 lg:grid-cols-3)
- Filter button system
- Card-uniform components
- Background: bg-slate-50 dark:bg-slate-900

#### Contact Page  
- Grid layout (lg:grid-cols-5) 
- Form (col-span-3) + Info (col-span-2)
- Background: gradient from-slate-50 to-primary-50
- Copy button implementation with small icons

#### About/Experience Pages
- Standard section layouts
- Inconsistent spacing patterns

### Animation Patterns
- **Framer Motion**: Staggered children, fade-in variants
- **Transforms**: hover:-translate-y-2, scale animations
- **Gradients**: 8s ease-in-out infinite shifts

### Spacing System
- **Sections**: space-section (py-16 md:py-24 lg:py-32)
- **Components**: space-component (py-8 md:py-12)
- **Container**: container-custom (max-w-7xl, responsive padding)

### Key Issues Identified
1. **Inconsistent backgrounds** across pages
2. **Varying card heights** despite card-uniform class
3. **Different animation timings** 
4. **Copy button UX** needs enhancement
5. **No unified micro-interaction patterns**

### Tech Stack Integration
- **Tailwind CSS**: Utility-first styling
- **Framer Motion**: Animation library
- **React**: Component-based architecture
- **Dark Mode**: Class-based theme switching

### 2025 Design Trends to Integrate
- Enhanced micro-interactions
- Magnetic hover effects  
- Better copy/paste UX patterns
- Unified component spacing
- Modern button treatments