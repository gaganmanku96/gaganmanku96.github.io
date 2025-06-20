# Gagan Manku's Portfolio Website

A modern, responsive portfolio website built with Next.js, Tailwind CSS, and Framer Motion. This portfolio showcases my projects, skills, experience, and blog posts in an interactive and visually appealing manner.

## Features

- **Modern Tech Stack**: Built with Next.js, React, TypeScript, Tailwind CSS, and Framer Motion
- **Responsive Design**: Fully responsive across all device sizes
- **Dark/Light Mode**: Toggle between dark and light themes
- **Smooth Animations**: Page transitions and scroll animations using Framer Motion
- **SEO Optimized**: Meta tags and structured data for better search engine visibility
- **Command Palette**: Quick navigation with keyboard shortcuts (Cmd/Ctrl+K)
- **Interactive Sections**:
  - Hero section with animated text
  - About section with skill bars and counters
  - Projects section with filtering capabilities
  - Experience timeline with expandable details
  - Blog section with Medium integration
  - Resume section with downloadable options
  - Contact form with validation

## Tech Stack

- **Frontend Framework**: [Next.js](https://nextjs.org/)
- **UI Library**: [React](https://reactjs.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Type Checking**: [TypeScript](https://www.typescriptlang.org/)
- **Deployment**: [GitHub Pages](https://pages.github.com/) via GitHub Actions

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/gaganmanku96/gagan_github_page.git
   cd gagan_github_page
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Deployment

The portfolio is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch. The workflow is defined in `.github/workflows/deploy.yml`.

To manually deploy:

1. Build and export the static site:
   ```bash
   npm run export
   # or
   yarn export
   ```

2. The static files will be generated in the `out` directory.

## Project Structure

```
├── .github/            # GitHub Actions workflows
├── components/         # React components
│   ├── Layout.tsx      # Main layout component
│   ├── Navbar.tsx      # Navigation bar component
│   ├── Footer.tsx      # Footer component
│   ├── CommandPalette.tsx # Command palette component
│   └── sections/       # Page sections
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ProjectsSection.tsx
│       ├── ExperienceSection.tsx
│       ├── BlogSection.tsx
│       ├── ResumeSection.tsx
│       └── ContactSection.tsx
├── context/           # React context providers
│   └── ThemeContext.tsx # Dark/light mode context
├── pages/             # Next.js pages
│   ├── _app.tsx       # Custom App component
│   └── index.tsx      # Home page
├── public/            # Static assets
├── styles/            # Global styles
│   └── globals.css    # Global CSS with Tailwind directives
├── next.config.js     # Next.js configuration
├── tailwind.config.js # Tailwind CSS configuration
├── postcss.config.js  # PostCSS configuration
└── tsconfig.json      # TypeScript configuration
```

## Customization

To customize this portfolio for your own use:

1. Update personal information in each section component
2. Replace project data in `ProjectsSection.tsx`
3. Update experience data in `ExperienceSection.tsx`
4. Modify blog post data in `BlogSection.tsx` or integrate with your own API
5. Replace resume information in `ResumeSection.tsx`
6. Update contact information in `ContactSection.tsx`
7. Customize colors and theme in `tailwind.config.js`

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

Gagan Manku - [contact@gaganmanku.com](mailto:contact@gaganmanku.com)

Project Link: [https://github.com/gaganmanku96/gagan_github_page](https://github.com/gaganmanku96/gagan_github_page)
