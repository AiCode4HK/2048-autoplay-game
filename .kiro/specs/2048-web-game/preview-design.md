# 2048 Game - Visual Design Preview

## Overview

This document outlines the visual design specifications for the 2048 web game, including color schemes, typography, layout, animations, and responsive behavior.

## Color Palette

### Primary Colors
- **Background**: `#faf8ef` (Warm cream)
- **Text Primary**: `#776e65` (Warm gray)
- **Grid Background**: `#bbada0` (Taupe)
- **Empty Cell**: `rgba(238, 228, 218, 0.35)` (Translucent beige)

### Tile Color Progression
```
2:    #eee4da (Light beige) - Dark text (#776e65)
4:    #ede0c8 (Cream) - Dark text (#776e65)
8:    #f2b179 (Light orange) - White text (#f9f6f2)
16:   #f59563 (Orange) - White text
32:   #f67c5f (Red-orange) - White text
64:   #f65e3b (Red) - White text
128:  #edcf72 (Gold) - White text
256:  #edcc61 (Bright gold) - White text
512:  #edc850 (Yellow-gold) - White text
1024: #edc53f (Bright yellow) - White text
2048: #edc22e (Victory yellow) - White text
```

### UI Elements
- **Score Boxes**: `#bbada0` (Taupe background, white text)
- **Restart Button**: `#8f7a66` (Brown), hover: `#9f8a76`
- **Game Over Overlay**: `rgba(255, 255, 255, 0.9)` (Semi-transparent white)

## Typography

### Font Stack
- Primary: `'Arial', sans-serif`
- Fallback ensures cross-platform compatibility

### Font Sizes
- **Game Title**: 48px (36px on mobile)
- **Tile Numbers**: 35px (25px on mobile)
  - Large tiles (128+): 30px (20px on mobile)
  - Extra large tiles (1024+): 25px (18px on mobile)
- **Score Labels**: 13px (uppercase)
- **Score Values**: 25px
- **Game Over Message**: 30px
- **Instructions**: 14px

## Layout Specifications

### Desktop Layout (>520px)
```
Container: 500px max-width, centered
Grid: 4x4 layout
Tile Size: 100px × 100px
Gap: 15px between tiles
Padding: 15px around grid
```

### Mobile Layout (≤520px)
```
Container: Full width with 10px padding
Tile Size: 70px × 70px
Responsive scaling maintains proportions
```

## Game Grid Structure

### Visual Hierarchy
1. **Game Title** - Prominent header
2. **Score Display** - Dual score boxes (Current/Best)
3. **Game Grid** - Central focus with tile overlay
4. **Instructions** - Subtle footer guidance

### Grid Layout
- 4×4 grid with rounded corners (10px border-radius)
- Background cells show through tile overlay
- Absolute positioning for smooth tile movement

## Animation Specifications

### Tile Transitions
- **Duration**: 0.15s ease-in-out
- **Properties**: Position changes (left/top)
- **Smoothness**: CSS transforms for hardware acceleration

### Visual Feedback
- Hover effects on interactive elements
- Smooth color transitions on button interactions
- Immediate visual response to user input

## Interactive States

### Normal State
- Clear tile visibility with distinct colors
- Responsive hover effects on restart button
- Smooth keyboard input handling

### Game Over State
- Semi-transparent overlay covers game area
- Centered message with final score
- Prominent restart button for easy recovery

## Responsive Breakpoints

### Mobile Optimization (≤520px)
- Tile size reduction: 100px → 70px
- Font scaling for readability
- Maintained aspect ratios
- Touch-friendly button sizing

### Accessibility Considerations
- High contrast ratios for all tile combinations
- Clear visual hierarchy
- Keyboard navigation support
- Semantic HTML structure

## Visual Design Mockup

```
┌─────────────────────────────────────┐
│                2048                 │
├─────────────┬───────────────────────┤
│   SCORE     │        BEST          │
│     0       │         0            │
├─────────────┴───────────────────────┤
│  ┌─────────────────────────────────┐ │
│  │ ┌───┬───┬───┬───┐ ┌───┬───┐     │ │
│  │ │   │   │   │   │ │ 2 │ 4 │     │ │
│  │ ├───┼───┼───┼───┤ └───┴───┘     │ │
│  │ │   │   │   │   │               │ │
│  │ ├───┼───┼───┼───┤               │ │
│  │ │   │   │   │   │               │ │
│  │ ├───┼───┼───┼───┤               │ │
│  │ │   │   │   │   │               │ │
│  │ └───┴───┴───┴───┘               │ │
│  └─────────────────────────────────┘ │
├─────────────────────────────────────┤
│ HOW TO PLAY: Use arrow keys to move │
│ tiles. When two tiles with the same │
│ number touch, they merge into one!  │
└─────────────────────────────────────┘
```

## Implementation Notes

### CSS Architecture
- Mobile-first responsive design
- CSS Grid for layout structure
- Absolute positioning for tile animations
- CSS custom properties for maintainable theming

### Performance Considerations
- Hardware-accelerated animations
- Efficient DOM manipulation
- Minimal reflows during tile updates
- Optimized for 60fps gameplay

This visual design creates an engaging, accessible, and responsive gaming experience that works seamlessly across desktop and mobile devices.