<div align="center">

# Zenith X

### Premium Audio Experience Redefined

*A cinematic, scroll-driven 3D web experience showcasing next-generation headphone technology*

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.182-000000?style=for-the-badge&logo=three.js)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

[Live Demo](https://zenithx.vercel.app) • [Report Bug](https://github.com/Srijanprasad/Zenithx/issues) • [Request Feature](https://github.com/Srijanprasad/Zenithx/issues)

</div>

---

## Features

- **Cinematic Scrollytelling** - Immersive scroll-driven animations with 120+ frame sequences
- **3D Product Visualization** - Interactive Three.js models with React Three Fiber
- **Smooth Animations** - Powered by Framer Motion and GSAP
- **Fully Responsive** - Optimized for all devices and screen sizes
- **Multi-Page Experience** - Product, Technology, Experience, and Contact pages
- **MongoDB Integration** - Dynamic content management
- **Performance Optimized** - Fast loading with Next.js 16 App Router
- **Premium Design** - Dark mode, glassmorphism, and modern UI/UX

---

## Tech Stack

### Frontend
- **Framework:** Next.js 16.1 (App Router)
- **UI Library:** React 19.2
- **Styling:** Tailwind CSS 4 + SCSS
- **Animations:** Framer Motion 12.25 + GSAP 3.14
- **3D Graphics:** Three.js 0.182 + React Three Fiber + Drei
- **Language:** TypeScript 5

### Backend
- **Database:** MongoDB (Mongoose 9.1)
- **Deployment:** Vercel

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- MongoDB Atlas account (for database features)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Srijanprasad/Zenithx.git
   cd Zenithx
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

---

## Project Structure

```
zenith_x/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Homepage with scrollytelling
│   │   ├── product/           # Product showcase
│   │   ├── technology/        # Tech specs
│   │   ├── experience/        # User experience
│   │   └── contact/           # Contact page
│   ├── components/            # React components
│   │   ├── HeadphoneScroll.tsx    # Main scroll animation
│   │   ├── ProductModel.tsx       # 3D model viewer
│   │   ├── Navigation.tsx         # Site navigation
│   │   ├── HeroSection.tsx        # Hero component
│   │   └── ...
│   ├── lib/                   # Utilities and configs
│   │   ├── mongodb.ts         # Database connection
│   │   └── constants.ts       # App constants
│   └── models/                # MongoDB schemas
├── public/
│   ├── frames/                # Scroll animation frames
│   └── images/                # Static assets
└── package.json
```

---

## Key Components

### Scroll-Driven Animation
The homepage features a unique scrollytelling experience where headphones "explode" (disassemble) as you scroll, revealing internal components through 120+ sequential frames rendered on HTML5 Canvas.

### 3D Product Viewer
Interactive Three.js models allow users to explore the product from every angle with smooth camera controls and realistic lighting.

### Multi-Page Experience
- **Homepage:** Cinematic scroll experience
- **Product:** Detailed product information
- **Technology:** Technical specifications
- **Experience:** User testimonials and features
- **Contact:** Get in touch form

---

## Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

---

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Visit [vercel.com/new](https://vercel.com/new)
3. Import your repository
4. Add environment variables
5. Deploy!

Vercel will automatically detect Next.js and configure everything for you.

### Environment Variables

Add these in your Vercel project settings:

```env
MONGODB_URI=your_mongodb_connection_string
```

---

## Design Philosophy

Zenith X embodies premium design principles:

- **Cinematic Experience:** Every scroll tells a story
- **Attention to Detail:** Smooth animations and transitions
- **Performance First:** Optimized for speed without sacrificing beauty
- **User-Centric:** Intuitive navigation and interactions
- **Modern Aesthetics:** Dark mode, gradients, and glassmorphism

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Three.js](https://threejs.org/) - 3D Graphics Library
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [GSAP](https://greensock.com/gsap/) - Professional Animation Platform
- [Vercel](https://vercel.com/) - Deployment Platform

---

<div align="center">

**Built with care by [Srijan Prasad](https://github.com/Srijanprasad)**

Star this repo if you like it!

</div>
