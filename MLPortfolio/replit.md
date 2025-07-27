# ML Portfolio Website

## Overview

This is a modern, responsive Machine Learning portfolio website built with vanilla HTML, CSS, and JavaScript. The site showcases ML projects categorized by algorithm types (Supervised and Unsupervised Learning) with smooth animations and interactive features. The design emphasizes clean aesthetics, performance, and user experience.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Single Page Application (SPA)**: Built with vanilla HTML5, CSS3, and ES6+ JavaScript
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Component-Based Structure**: Modular CSS and JavaScript organization
- **Animation Framework Integration**: Uses AOS (Animate on Scroll) and GSAP for smooth animations

### Design System
- **CSS Custom Properties**: Centralized theming system with light/dark mode support
- **Typography**: Inter font family for clean, modern text rendering
- **Color Scheme**: Professional blue/purple gradient palette with semantic color variables
- **Spacing System**: Consistent spacing scale using CSS custom properties

## Key Components

### Navigation System
- **Sticky Navbar**: Fixed position navigation with scroll-based highlighting
- **Mobile Responsive**: Hamburger menu for mobile devices
- **Smooth Scrolling**: JavaScript-powered section navigation
- **Active State Management**: Dynamic highlighting of current section

### Theme System
- **Dark/Light Mode Toggle**: User preference-based theme switching
- **CSS Custom Properties**: Dynamic color scheme updates
- **Local Storage**: Theme preference persistence across sessions

### Animation System
- **AOS Integration**: Scroll-triggered animations for content reveals
- **GSAP Framework**: Advanced animations for interactive elements
- **Typewriter Effect**: Custom JavaScript animation for rotating text
- **Performance Optimized**: GPU-accelerated transforms and transitions

### Content Sections
- **Hero Section**: Full-screen introduction with animated typewriter effect
- **About Section**: Personal introduction with scroll animations
- **Algorithms Section**: Project showcase organized by ML algorithm types

## Data Flow

### Animation Pipeline
1. **Page Load**: Initialize AOS and GSAP libraries
2. **Scroll Events**: Trigger reveal animations based on viewport intersection
3. **Theme Toggle**: Update CSS custom properties and persist to localStorage
4. **Navigation**: Handle smooth scrolling and active state updates

### Content Management
- **Static Content**: All content embedded in HTML structure
- **Dynamic Text**: Typewriter animation cycles through predefined text array
- **State Management**: JavaScript manages UI state for navigation and theme

## External Dependencies

### Animation Libraries
- **AOS (Animate on Scroll)**: Scroll-triggered animations
- **GSAP**: Advanced animation framework for complex interactions

### Typography and Icons
- **Google Fonts**: Inter and JetBrains Mono font families
- **Font Awesome**: Icon library for UI elements

### Performance Considerations
- **CDN Delivery**: External libraries loaded from CDNs
- **Lazy Loading**: AOS provides built-in intersection observer optimization
- **CSS Optimization**: Custom properties for efficient theme switching

## Deployment Strategy

### Static Hosting
- **Client-Side Only**: No server-side dependencies
- **CDN Compatible**: Optimized for content delivery networks
- **Progressive Enhancement**: Core functionality works without JavaScript

### File Structure
```
/
├── index.html          # Main HTML document
├── style.css           # Comprehensive stylesheet
├── script.js           # Interactive functionality
├── /images/            # Project assets and media
└── /animations/        # Optional Lottie JSON files
```

### Browser Compatibility
- **Modern Browsers**: ES6+ features require current browser versions
- **Responsive Design**: Mobile-first approach ensures cross-device compatibility
- **Graceful Degradation**: Core content accessible without JavaScript

### Performance Optimization
- **Minimal Dependencies**: Selective use of external libraries
- **CSS Custom Properties**: Efficient theme switching without style recalculation
- **Animation Performance**: GPU-accelerated transforms for smooth animations