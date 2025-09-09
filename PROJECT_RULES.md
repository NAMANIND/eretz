# Premium Landing Page Development Rules

## 🎯 Project Overview

Building a **$1M worth premium landing page** with advanced scroll animations, image drawers, and responsive design.

## 🏗️ Architecture & Dependencies

### Core Technologies

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better DX
- **Tailwind CSS 4** - Utility-first styling
- **Lenis** - Smooth scrolling library
- **Framer Motion** - Advanced animations
- **React Intersection Observer** - Scroll-triggered animations

### Key Dependencies to Add

```json
{
  "lenis": "^1.0.0",
  "framer-motion": "^11.0.0",
  "react-intersection-observer": "^9.0.0",
  "lucide-react": "^0.400.0"
}
```

## 🎨 Design Principles

### Visual Hierarchy

- **Typography**: Use system fonts (Inter, SF Pro) with perfect spacing
- **Spacing**: Consistent 8px grid system (4, 8, 16, 24, 32, 48, 64px)
- **Colors**: Minimal palette with strategic accent colors
- **Shadows**: Subtle, layered shadows for depth

### Animation Guidelines

- **Duration**: 300-800ms for micro-interactions
- **Easing**: `cubic-bezier(0.4, 0, 0.2, 1)` for natural feel
- **Stagger**: 50-100ms delays for sequential animations
- **Spring**: Use spring physics for organic motion

## 📱 Responsive Design Rules

### Breakpoints

- **Mobile**: 320px - 768px (mobile-first)
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+ (enhanced features)

### Mobile Considerations

- Touch-friendly interactions (44px minimum)
- Simplified animations for performance
- Swipe gestures for image drawers
- Reduced motion for accessibility

### Desktop Enhancements

- Hover states and micro-interactions
- Parallax effects and complex animations
- Mouse-follow effects
- Advanced scroll-triggered animations

## 🎭 Animation Strategy

### Scroll Animations

- **Fade In**: Elements appear as they enter viewport
- **Slide Up**: Content slides from bottom with opacity
- **Scale**: Subtle scale transforms on scroll
- **Parallax**: Background elements move at different speeds
- **Sticky**: Elements stick to viewport during scroll

### Image Drawer Features

- **Smooth Transitions**: 400ms ease-out
- **Overlay Blur**: Background blur on open
- **Zoom Effect**: Images scale slightly on hover
- **Navigation**: Arrow keys and swipe gestures
- **Loading States**: Skeleton screens for images

## 🧩 Component Architecture

### Core Components

```
src/components/
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Features.tsx
│   ├── Gallery.tsx
│   └── Contact.tsx
├── ui/
│   ├── Button.tsx
│   ├── ImageDrawer.tsx
│   ├── ScrollAnimation.tsx
│   └── LoadingSpinner.tsx
└── hooks/
    ├── useLenis.ts
    ├── useScrollAnimation.ts
    └── useImageDrawer.ts
```

### Component Guidelines

- **Single Responsibility**: Each component has one clear purpose
- **Props Interface**: Strict TypeScript interfaces for all props
- **Default Props**: Sensible defaults for optional props
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support

## 🎯 Performance Standards

### Core Web Vitals Targets

- **LCP**: < 2.5s (Largest Contentful Paint)
- **FID**: < 100ms (First Input Delay)
- **CLS**: < 0.1 (Cumulative Layout Shift)

### Optimization Strategies

- **Image Optimization**: Next.js Image component with proper sizing
- **Code Splitting**: Lazy load non-critical components
- **Animation Performance**: Use `transform` and `opacity` only
- **Scroll Performance**: Throttle scroll events, use `requestAnimationFrame`

## 🎨 UI/UX Excellence

### Visual Design

- **Minimalism**: Clean, uncluttered layouts
- **Whitespace**: Generous spacing for breathing room
- **Typography**: Perfect line-height (1.5-1.7) and letter-spacing
- **Color Psychology**: Strategic use of color for emotion and hierarchy

### Interaction Design

- **Feedback**: Immediate visual feedback for all interactions
- **States**: Clear hover, active, focus, and disabled states
- **Transitions**: Smooth transitions between all states
- **Gestures**: Intuitive touch and mouse interactions

## 🔧 Development Workflow

### Code Quality

- **TypeScript Strict**: Enable all strict type checking
- **ESLint**: Enforce consistent code style
- **Prettier**: Automatic code formatting
- **Component Testing**: Test critical user interactions

### File Organization

- **Feature-based**: Group related components together
- **Clear Naming**: Descriptive file and component names
- **Index Files**: Export components from index files
- **Constants**: Separate configuration and constants

## 🚀 Deployment & Optimization

### Build Optimization

- **Bundle Analysis**: Monitor bundle size and optimize
- **Image Compression**: Optimize all images for web
- **CDN**: Use CDN for static assets
- **Caching**: Implement proper caching strategies

### Monitoring

- **Analytics**: Track user interactions and performance
- **Error Tracking**: Monitor for runtime errors
- **Performance**: Regular performance audits

## 📋 Implementation Checklist

### Phase 1: Foundation

- [ ] Set up Lenis smooth scrolling
- [ ] Create base layout components
- [ ] Implement responsive grid system
- [ ] Add global animation utilities

### Phase 2: Core Features

- [ ] Build image drawer component
- [ ] Implement scroll-triggered animations
- [ ] Create hero section with parallax
- [ ] Add navigation with smooth transitions

### Phase 3: Enhancement

- [ ] Add micro-interactions
- [ ] Implement advanced hover effects
- [ ] Optimize for mobile performance
- [ ] Add accessibility features

### Phase 4: Polish

- [ ] Performance optimization
- [ ] Cross-browser testing
- [ ] Mobile device testing
- [ ] Final accessibility audit

## 🎯 Success Metrics

### User Experience

- **Engagement**: Time on page > 2 minutes
- **Interaction**: Image drawer usage > 60%
- **Performance**: 90+ Lighthouse score
- **Accessibility**: WCAG 2.1 AA compliance

### Technical Excellence

- **Load Time**: < 3 seconds on 3G
- **Animation**: 60fps smooth animations
- **Responsive**: Perfect on all device sizes
- **SEO**: 90+ Core Web Vitals score

---

**Remember**: Every pixel, animation, and interaction should feel premium and intentional. This is a $1M landing page - every detail matters.
