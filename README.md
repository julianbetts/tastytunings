# 🎸 Tasty Tunings - Guitar Chord & Scale Finder

A modern, sleek guitar chord and scale finder with a beautiful gradient design and intuitive interface.

## ✨ Features

- **Modern UI Design**: Beautiful gradients, glassmorphism effects, and smooth animations
- **Interactive Fretboard**: Visual chord and scale display with color-coded notes
- **Multiple Tunings**: Support for standard, open D, open G, and DADGAD tunings
- **Comprehensive Chord Library**: Major, minor, 7th chords, suspended chords, and more
- **Scale Modes**: All major scale modes including Ionian, Dorian, Phrygian, etc.
- **Pentatonic Scales**: Major and minor pentatonic scales
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Hover effects, transitions, and loading animations

## 🎨 Design Highlights

### Modern Aesthetics
- **Gradient Backgrounds**: Beautiful purple-to-blue gradients throughout the interface
- **Glassmorphism**: Semi-transparent panels with backdrop blur effects
- **Smooth Shadows**: Subtle depth with hover effects and transitions
- **Typography**: Clean Inter font family for excellent readability

### Interactive Elements
- **Hover Effects**: All interactive elements have smooth scale and shadow animations
- **Focus States**: Clear visual feedback for keyboard navigation
- **Loading Animations**: Smooth fade-in effects when the page loads
- **Custom Scrollbars**: Styled scrollbars that match the design theme

### Color-Coded Notes
- **Gradient Notes**: Selected notes display with beautiful gradient colors
- **Visual Hierarchy**: Clear distinction between different note types
- **Accessibility**: High contrast colors for excellent visibility

## 🚀 Getting Started

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd tastytunings
   ```

2. **Open in your browser**:
   ```bash
   open index.html
   ```
   Or simply double-click the `index.html` file.

3. **Start exploring**:
   - Select a tuning from the dropdown
   - Choose a root note
   - Pick a chord or scale
   - Watch the fretboard highlight the notes!

## 🎯 How to Use

### Selecting a Tuning
1. Click the "Tuning" dropdown
2. Choose from:
   - **Standard**: E-A-D-G-B-E
   - **Open D**: D-A-F♯-D-A-D
   - **Open G**: D-G-D-G-B-D
   - **DADGAD**: D-A-D-G-A-D

### Finding Chords
1. Select a **Root Note** (e.g., C, D, E, etc.)
2. Choose a **Chord Type** (e.g., major, minor, 7th)
3. The fretboard will highlight all instances of that chord

### Exploring Scales
1. Select a **Root Note**
2. Choose a **Scale** (e.g., Ionian, Dorian, Pentatonic)
3. See all the scale notes highlighted on the fretboard

## 🎨 Design System

### Color Palette
- **Primary Gradient**: Purple to Blue (`#667eea` to `#764ba2`)
- **Secondary Gradient**: Pink to Red (`#f093fb` to `#f5576c`)
- **Accent Gradient**: Blue to Cyan (`#4facfe` to `#00f2fe`)
- **Surface**: Semi-transparent white with blur effects
- **Text**: Dark gray tones for excellent readability

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Hierarchy**: Clear size and weight differences

### Spacing
- **Base Unit**: 8px
- **Spacing Scale**: 8px, 16px, 24px
- **Border Radius**: 8px (small), 16px (large)

## 📱 Responsive Design

The app is fully responsive and works beautifully on:
- **Desktop**: Full feature set with optimal layout
- **Tablet**: Adapted controls and touch-friendly interface
- **Mobile**: Landscape orientation recommended for best experience

### Mobile Experience
- **Flip Message**: Encourages landscape orientation on mobile
- **Touch-Friendly**: Large touch targets and clear visual feedback
- **Optimized Layout**: Stacked controls for better mobile usability

## 🔧 Technical Features

### Modern CSS
- **CSS Custom Properties**: Consistent theming and easy customization
- **Flexbox & Grid**: Modern layout techniques
- **Backdrop Filter**: Glassmorphism effects
- **CSS Animations**: Smooth transitions and hover effects

### JavaScript Enhancements
- **ES6 Classes**: Clean, maintainable code structure
- **Event Handling**: Responsive user interactions
- **Dynamic Updates**: Real-time fretboard updates
- **Modern APIs**: Contemporary browser features

## 🎵 Musical Features

### Supported Chords
- **Triads**: Major, minor, diminished, augmented
- **7th Chords**: Major 7th, minor 7th, dominant 7th
- **Extended Chords**: 6th, suspended 2nd/4th
- **Special**: Hendrix chord

### Supported Scales
- **Major Scale Modes**: Ionian, Dorian, Phrygian, Lydian, Mixolydian, Aeolian, Locrian
- **Pentatonic**: Major and minor pentatonic scales
- **Chromatic**: All 12 notes for custom selections

## 🚀 Performance

- **Lightweight**: Minimal dependencies, fast loading
- **Smooth Animations**: 60fps transitions and effects
- **Optimized Rendering**: Efficient DOM updates
- **Mobile Optimized**: Touch-friendly and responsive

## 🎨 Customization

The design is easily customizable through CSS custom properties:

```css
:root {
    --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
    --accent-gradient: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
    /* ... more variables */
}
```

## 📄 License

This project is open source and available under the MIT License.

---

**Made with ❤️ for guitarists everywhere**