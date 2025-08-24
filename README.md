# Breathscape - Mindful Breathing Techniques

A modern, responsive web application for practicing various breathing techniques to promote relaxation, focus, and wellness.

## Features

- **Multiple Breathing Techniques**: Circle, Square, Hexagon, Triangle, Star, Infinity, and Stop Sign breathing
- **Interactive Exercises**: Visual breathing guides with customizable durations
- **Multilingual Support**: English and Portuguese (Brazilian)
- **PWA Ready**: Progressive Web App with offline capabilities
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Dark Mode Support**: Automatic theme switching based on system preferences

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library with shadcn/ui inspiration
- **Icons**: Lucide React icons
- **PWA**: Service Worker, Web App Manifest
- **Build Tool**: Next.js with optimized bundling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd breathscape-app
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Icon Generation

The app includes a custom meditation-themed headphones icon with a beautiful gradient design. To regenerate the icons:

```bash
npm run generate-icons
```

This will create all necessary PWA icons in different sizes:
- `favicon.png` (32x32) - Main favicon
- `favicon-16x16.png` - Small favicon
- `favicon-32x32.png` - Standard favicon
- `apple-touch-icon.png` (180x180) - Apple device icon
- `icon-192x192.png` - Android PWA icon
- `icon-512x512.png` - Large PWA icon

## PWA Features

- **Installable**: Add to home screen on supported devices
- **Offline Support**: Service worker caches essential resources
- **App-like Experience**: Full-screen mode and native app feel
- **Push Notifications**: Ready for future notification features

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run generate-icons` - Regenerate PWA icons

## Project Structure

```
breathscape-app/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── manifest.ts        # PWA manifest
│   ├── pwa.tsx           # PWA install component
│   └── sw.ts             # Service worker
├── components/            # React components
│   ├── ui/               # UI components
│   ├── breathing-exercise.tsx
│   ├── breathing-guide.tsx
│   ├── technique-grid.tsx
│   └── ...
├── lib/                  # Utilities and configurations
│   └── translations/     # Multilingual support
├── public/               # Static assets
│   └── icons/           # PWA icons
├── scripts/              # Build and generation scripts
└── styles/               # Additional styles
```

## Design System

The app features a sophisticated design system with:
- **Color Palette**: Lavender, turquoise, and warm pink gradients
- **Typography**: Clean, readable fonts with proper hierarchy
- **Components**: Glassmorphism effects, smooth animations, and hover states
- **Responsive**: Mobile-first design with adaptive layouts

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Acknowledgments

- Meditation and mindfulness community
- Breathing technique experts
- Open source contributors

