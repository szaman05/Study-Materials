# Next.js Admin Dashboard UI Library

A modern, responsive admin dashboard template built with Next.js 15, TypeScript, Tailwind CSS, and DaisyUI. This template features a clean design, reusable components, and best practices for building server-rendered admin interfaces.

![AdminDash Screenshot](https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg)

## Features

- **Next.js 15** with App Router for server-side rendering and routing
- **TypeScript** for type safety and better developer experience
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-designed UI components and themes
- Responsive layout with mobile-first design
- Dark mode and multiple theme support
- Reusable UI components for building admin interfaces
- Interactive data tables with sorting, pagination, and search
- Statistics cards with trends visualization
- Clean and organized codebase with best practices

## Getting Started

### Prerequisites

- Node.js 18.17.0 or higher
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://your-repository-url/admin-dashboard.git
cd admin-dashboard
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

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
/app                          # Next.js App Router
  /components                 # Reusable UI components
    /ui                       # Base UI components (Card, Table, etc.)
    /layouts                  # Layout components (Sidebar, Header)
    /dashboard                # Dashboard-specific components
    /auth                     # Authentication components
  /dashboard                  # Dashboard pages
    /orders                   # Orders pages
    /products                 # Products pages
    /customers                # Customers pages
    /settings                 # Settings pages
  /api                        # API routes
  /lib                        # Utility functions and shared code
  /styles                     # Global styles
```

## Core Components

### Layout Components

- **DashboardLayout**: Main layout for dashboard pages
- **Sidebar**: Collapsible sidebar with navigation
- **Header**: Top navigation bar with notifications and user profile

### UI Components

- **Card**: Versatile card component with multiple variants
- **Table**: Data table component with sorting, pagination, and search
- **StatsCard**: Cards for displaying statistics with trend indicators
- **ThemeSwitcher**: Theme toggle for switching between light and dark mode

### Dashboard Components

- **StatsSummary**: Grid of statistics cards for dashboard overview
- **RecentOrders**: Table displaying recent orders
- **OrdersList**: Comprehensive orders listing with filters

## Customization

### Themes

The dashboard comes with multiple themes powered by DaisyUI. You can customize or create your own themes by modifying the `globals.css` file:

```css
@plugin "daisyui" {
  themes: light --default, dark --prefersdark, corporate, business;
}
```

### Components

All components are built with customization in mind. You can modify them to suit your specific needs:

- Add or remove properties to components
- Customize styles using Tailwind utility classes
- Create new components based on the existing ones

## Deployment

This project can be deployed with any hosting service that supports Next.js applications, like Vercel, Netlify, or AWS Amplify.

For the best performance and features, we recommend Vercel:

```bash
npm run build
# or
yarn build
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [TypeScript](https://www.typescriptlang.org/)
