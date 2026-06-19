# Guru Nanak Academy Website

A modern, responsive, and accessible school website built with Next.js 14, TypeScript, and TailwindCSS.

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)
![License](https://img.shields.io/badge/License-Proprietary-red?style=flat-square)

## 🏫 About

This is the official website for Guru Nanak Academy, Dehradun. The website showcases the school's facilities, academic programs, admission procedures, events, and more.

## ✨ Features

- **Modern Design**: Clean, responsive design with dark mode support
- **Fast Performance**: Built with Next.js App Router for optimal performance
- **SEO Optimized**: Full SEO support with proper metadata and OpenGraph tags
- **Accessible**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Interactive Maps**: Leaflet.js integration for campus location
- **Blog System**: MDX-powered blog for news and updates
- **Form Handling**: Contact and admission forms with validation
- **Image Optimization**: Next.js Image component for optimized loading

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/guru-nanak-academy.git
   cd guru-nanak-academy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env.local
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
guru-nanak-academy/
├── __tests__/              # Test files
├── .github/workflows/      # GitHub Actions CI/CD
├── public/                 # Static assets
│   └── images/            # Image files
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── about/
│   │   ├── admission/
│   │   ├── api/
│   │   ├── blog/
│   │   ├── boarding/
│   │   ├── co-curricular/
│   │   ├── contact/
│   │   ├── events/
│   │   └── facilities/
│   ├── components/        # React components
│   │   ├── about/
│   │   ├── admission/
│   │   ├── contact/
│   │   ├── events/
│   │   ├── home/
│   │   ├── layout/
│   │   ├── shared/
│   │   └── ui/
│   ├── content/           # MDX content
│   │   └── blog/
│   ├── lib/               # Utility functions
│   └── types/             # TypeScript types
├── .eslintrc.json
├── .prettierrc
├── jest.config.ts
├── next.config.mjs
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Fix ESLint errors |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Run tests with coverage |

## 🎨 Design System

### Colors

**Light Mode:**
- Primary: Black (#000000)
- Background: White (#FFFFFF)
- Text: Dark gray scale

**Dark Mode:**
- Background: #0b0b0b
- Accents: White/Silver
- Text: Light gray scale

### Typography

- Font: Inter (Variable)
- Headings: Bold, various sizes
- Body: Regular, 16px base

## 📄 Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Landing page with hero, labs, facilities |
| About | `/about` | School history, leadership, mission |
| Admission | `/admission` | Admission procedure |
| Admission Form | `/admission/form` | Online admission application |
| Boarding | `/boarding` | Boarding facilities information |
| Events | `/events` | School events listing |
| Event Detail | `/events/[slug]` | Individual event page |
| Facilities | `/facilities` | Labs and campus facilities |
| Co-curricular | `/co-curricular` | Activities and gallery |
| Contact | `/contact` | Contact form and location |
| Blog | `/blog` | News and updates |
| Blog Post | `/blog/[slug]` | Individual blog post |

## 🖼️ Adding Images

Place images in the `public/images/` directory:

```
public/images/
├── hero/              # Hero section images
├── labs/              # Laboratory photos
├── facilities/        # Facility photos
├── events/            # Event photos
├── gallery/           # Gallery images
├── blog/              # Blog post images
├── team/              # Leadership photos
└── logo.png           # School logo
```

## 📝 Writing Blog Posts

Create MDX files in `src/content/blog/`:

```mdx
---
title: "Your Blog Title"
date: "2024-01-01"
author: "Author Name"
category: "Category"
image: "/images/blog/your-image.jpg"
excerpt: "Brief description of the post"
tags: ["tag1", "tag2"]
---

Your content here...
```

## 🧪 Testing

Run the test suite:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

Build the project and deploy the `.next` folder:

```bash
npm run build
npm run start
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Email Service (when implemented)
RESEND_API_KEY=your_api_key

# Analytics (when implemented)
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Commit changes: `git commit -m 'Add your feature'`
4. Push to branch: `git push origin feature/your-feature`
5. Open a Pull Request

## 📜 License

This project is proprietary and confidential. All rights reserved by KonnichiwaAman.

**NO LICENSE IS GRANTED** to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of this software without explicit written permission from the copyright holder.

See the [LICENSE](LICENSE) file for full details.

## 📞 Contact

- **Website**: [gurunanak.edu.in](https://gurunanak.edu.in)
- **Email**: gurunanak@gnacademy.in
- **Phone**: +91-135-2687101, 2687102

---

Built with ❤️ for Guru Nanak Academy, Dehradun
