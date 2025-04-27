# ZMN-ADMIN Next.js Dashboard

ZMN-ADMIN is a modern admin dashboard template built with Next.js 14+, DaisyUI 5, Tailwind CSS 4, and Appwrite for backend services. It provides a solid foundation for building feature-rich administrative interfaces with a focus on Server-Side Rendering and modern web development practices.

## Key Features

- **Framework:** Next.js 14+ (App Router)
- **UI:** DaisyUI 5 & Tailwind CSS 4
- **Icons:** Lucide React
- **Theming:** Dark/Light mode support via `next-themes`
- **Layout:** Responsive sidebar navigation
- **Components:** Reusable UI elements (Buttons, Forms, Cards, Tables, etc.)
- **Backend:** Appwrite integration (Authentication, Database, Storage)
- **Architecture:** SSR-focused with Client Components for interactivity

## Project Structure

```
/
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
├── components/           # Reusable React Components
│   ├── ui/               # General UI elements (Button, Card, Input)
│   ├── layout/           # Page structure (Header, Sidebar)
│   ├── providers/        # Context providers (Theme, Auth)
│   └── common/           # Shared utility components
├── lib/                  # Shared logic & utilities
│   └── actions/          # Server Actions (incl. /appwrite for backend)
├── types/                # TypeScript definitions
├── public/               # Static assets (images, fonts)
├── context/              # React Context definitions
├── .env.local.example    # Example environment variables
├── .eslintrc.json        # ESLint configuration
├── next.config.mjs       # Next.js configuration
├── postcss.config.mjs    # PostCSS configuration (for Tailwind/DaisyUI)
├── tailwind.config.ts    # Tailwind CSS configuration (if needed beyond CSS @plugin)
└── tsconfig.json         # TypeScript configuration
```

## Getting Started

Follow these steps to set up and run the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd zmn-admin
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**

    - Copy the example environment file:
      ```bash
      cp .env.local.example .env.local
      ```
    - Fill in your Appwrite project details and any other required variables in `.env.local`. **Note:** This file should _not_ be committed to version control.

4.  **Run the development server:**

    ```bash
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

5.  Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Core Technologies

- [Next.js](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Lucide React](https://lucide.dev/)
- [next-themes](https://github.com/pacocoursey/next-themes)
- [Appwrite](https://appwrite.io/)
- [TypeScript](https://www.typescriptlang.org/)

## Code Conventions

This project follows specific code conventions for consistency and maintainability. Key aspects include:

- Functional components with TypeScript props.
- Named exports for components.
- Kebab-case file naming.
- Usage of DaisyUI semantic classes and Tailwind utilities.
- Server Actions for backend communication.

For detailed guidelines, please refer to the `.github/copilot-instructions.md` file (if available in your repository).

## Deployment

This Next.js application is ready to be deployed on platforms like Vercel, Netlify, or any Node.js hosting provider. Ensure your environment variables are configured correctly in your deployment environment.
