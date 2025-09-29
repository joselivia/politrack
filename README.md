# Politrack Africa

![Politrack Logo](public/politrack.png)

**Data-Driven Insights for Political & Socio-Economic Strategy**

Politrack Africa empowers leaders with cutting-edge opinion polling, research, and strategic advisory services tailored to Africa's complex political and socio-economic landscape. This is the official website showcasing our research reports, insights, and services across 25+ African countries.

## 🌍 About Politrack Africa

Politrack Africa is a leading research and strategic advisory platform focused on African political and socio-economic trends. We provide:

- **Opinion Polling & Research**: Comprehensive polling services across African nations
- **Strategic Advisory**: Data-driven recommendations for political and business leaders
- **Insights & Reports**: Regular publications on African political and economic trends
- **Case Studies**: Real-world analysis of political campaigns and policy implementations

## ✨ Features

- 📊 **Interactive Data Visualizations**: Real-time charts and graphs using Recharts
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🌙 **Dark/Light Theme**: Toggle between themes with next-themes
- 📈 **Live Reports**: Dynamic reporting dashboard with up-to-date insights
- 🔍 **Insights Section**: Searchable database of research reports and findings
- 🌍 **Multi-Country Coverage**: Content covering 25+ African countries

## 🚀 Tech Stack

- **Framework**: [Next.js 15.5.0](https://nextjs.org/) with App Router
- **UI Library**: [Radix UI](https://www.radix-ui.com/) components
- **Styling**: [TailwindCSS](https://tailwindcss.com/) with custom design system
- **Charts**: [Recharts](https://recharts.org/) for data visualization
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **Forms**: [React Hook Form](https://react-hook-form.com/) with [Zod](https://zod.dev/) validation
- **Typography**: [Geist Font](https://vercel.com/font)
- **Analytics**: [Vercel Analytics](https://vercel.com/analytics)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18.0 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

## 🛠️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/joselivia/politrack.git
   cd politrack
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000) to see the application running.

## 📜 Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

## 📁 Project Structure

```
politrack/
├── app/                     # Next.js App Router pages
│   ├── layout.tsx          # Root layout component
│   ├── page.tsx            # Homepage
│   ├── not-found.tsx       # 404 page
│   └── insights/           # Insights section pages
├── components/             # Reusable React components
│   ├── ui/                 # Shadcn/ui components
│   ├── reports/            # Report-specific components
│   ├── hero-section.tsx    # Homepage hero section
│   ├── header.tsx          # Site navigation
│   └── footer.tsx          # Site footer
├── content/                # Static content and data
│   └── insights-content.ts # Insights data
├── config/                 # Configuration files
│   └── baseUrl.ts          # API base URL configuration
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
│   ├── flags/              # Country flag images
│   └── trusts/             # Partner organization logos
└── styles/                 # Global styles
```

## 🎨 UI Components

This project uses a comprehensive design system built on top of Radix UI and TailwindCSS, including:

- **Layout**: Cards, Containers, Grid Systems
- **Navigation**: Headers, Breadcrumbs, Sidebars
- **Forms**: Inputs, Selects, Checkboxes, Validation
- **Feedback**: Alerts, Toasts, Progress Indicators
- **Data Display**: Tables, Charts, Badges, Avatars
- **Overlay**: Modals, Popovers, Tooltips

## 🌍 Supported Countries

The platform covers political and socio-economic insights for 25+ African countries, including:

- 🇬🇭 Ghana
- 🇰🇪 Kenya
- 🇸🇳 Senegal
- 🇿🇦 South Africa
- And many more across East, West, Southern, and Central Africa

## 📊 Features Overview

### Interactive Dashboard

- Real-time polling data visualization
- Regional breakdown charts
- Trend analysis over time
- Comparative country analysis

### Research Reports

- Downloadable PDF reports
- Multi-language support
- Sectioned content with key findings
- Historical data tracking

### Case Studies

- Political campaign analysis
- Policy implementation tracking
- Socio-economic impact studies
- Success stories and lessons learned

## 🤝 Contributing

We welcome contributions to improve Politrack Africa! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary to Politrack Africa. All rights reserved.

## 📞 Contact & Support

- **Website**: [politrack.africa](https://politrack.africa)
- **Repository**: [github.com/joselivia/politrack](https://github.com/joselivia/politrack)
- **Issues**: Report bugs and feature requests via GitHub Issues

## 🚀 Deployment

The easiest way to deploy this Next.js application is using [Vercel](https://vercel.com/):

1. Push your code to GitHub
2. Import your repository on Vercel
3. Vercel will automatically detect Next.js and configure the build settings
4. Your site will be deployed with automatic HTTPS and global CDN

For other deployment options, check the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).

---

Built with ❤️ for Africa by the Politrack team
