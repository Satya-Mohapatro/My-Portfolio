# Personal Portfolio Website

## Overview

This is a personal portfolio website built with vanilla HTML, CSS, and JavaScript. It's designed to showcase a developer's skills, projects, and experience through a modern, responsive interface with interactive elements and smooth animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Pure Web Technologies**: Built using vanilla HTML5, CSS3, and JavaScript ES6+ without any frameworks
- **Single Page Application (SPA)**: All content is contained in a single HTML file with smooth scrolling navigation
- **Component-Based Structure**: Modular JavaScript functions handle different features (navigation, theme toggle, animations, etc.)
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox for layout

### Styling Strategy
- **CSS Custom Properties**: Uses CSS variables for theming and consistent design tokens
- **Theme System**: Light/dark mode toggle with CSS custom properties for color management
- **Modular CSS**: Organized into logical sections (reset, base, components, utilities)
- **Modern CSS Features**: Leverages CSS Grid, Flexbox, and CSS transitions for layout and animations

## Key Components

### Navigation System
- Sticky navigation bar with smooth scrolling
- Active section highlighting based on scroll position
- Mobile hamburger menu for responsive design
- Logo/initials branding

### Interactive Elements
- **Typewriter Effect**: Animated text in hero section showing rotating taglines
- **Theme Toggle**: Light/dark mode switcher with persistent state
- **Tabbed Interface**: About section with Experience/Education tabs
- **Skill Animations**: Progress bars and interactive skill displays
- **Scroll Animations**: Elements animate in as they enter viewport

### Content Sections
1. **Hero Section**: Full name display with typewriter effect and call-to-action buttons
2. **About Me**: Profile photo, bio, and tabbed experience/education content
3. **Skills Section**: Categorized skill display with icons and progress indicators
4. **Portfolio/Projects**: Project showcase with cards and descriptions
5. **Contact**: Contact form with validation and interactive elements

## Data Flow

### Static Content Flow
- All content is embedded directly in HTML
- No external data sources or APIs
- Images and assets loaded from local `/images/` directory

### User Interaction Flow
1. Page loads with initial theme detection
2. Navigation responds to scroll events for active section highlighting
3. Theme toggle updates CSS custom properties for instant theme switching
4. Form submissions handled with JavaScript validation
5. Scroll animations triggered by Intersection Observer API

### State Management
- Theme preference stored in localStorage
- Navigation state managed through event listeners
- Form validation state managed through JavaScript objects
- Animation states controlled through CSS classes

## External Dependencies

### CDN Resources
- **Font Awesome 6.4.0**: Icon library for UI elements
- **Google Fonts (Inter)**: Primary typography with multiple weights (300-700)

### Browser APIs Used
- **Intersection Observer**: For scroll-based animations and section detection
- **localStorage**: For theme preference persistence
- **CSS Custom Properties**: For dynamic theming
- **Smooth Scrolling**: Native CSS scroll-behavior

## Deployment Strategy

### Static Hosting Ready
- No build process required
- Can be deployed to any static hosting service (Netlify, Vercel, GitHub Pages)
- All assets are self-contained or loaded from CDNs

### File Structure
```
/
├── index.html          # Main HTML file
├── style.css           # All styles and theming
├── script.js           # All JavaScript functionality
├── favicon.ico         # Site favicon
└── images/             # Asset directory for photos and graphics
```

### Performance Considerations
- Minimal external dependencies (only fonts and icons)
- CSS and JavaScript are concatenated into single files
- Images should be optimized for web delivery
- Lazy loading can be implemented for images below the fold

### Browser Support
- Modern browsers supporting ES6+ features
- CSS Grid and Flexbox support required
- CSS Custom Properties support needed for theming
- Graceful degradation for older browsers where possible