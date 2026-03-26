# ⚡ VidMetrics: Intelligence Dashboard for YouTube

> Transform raw YouTube metadata into strategic, actionable content intelligence. Built for creators who want to outpace their niche.

[ ![Next.js 16](https://img.shields.io/badge/Next.js-16.2.1-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[ ![React 19](https://img.shields.io/badge/React-19.2.4-blue?style=for-the-badge&logo=react)](https://reactjs.org/)
[ ![Tailwind CSS 4](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[ ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)

---

## 🚀 Key Features

- **📊 Strategic Intelligence View**: Real-time analysis of "Viral Hook Strength", "Engagement Velocity", and "Audience Retention" heuristics.
- **🏁 Competitive Benchmarking**: Compare any channel side-by-side with market competitors. Features automated "Winner" highlighting for key metrics.
- **📈 Global Trend Detection**: Scans the latest 20 videos for metadata patterns and trending tags across your niche.
- **📝 AI-Driven Summaries**: Expert-toned strategic summaries generated based on recent channel performance.
- **⚡ High-Performance Caching**: Multi-layered caching strategy (unstable_cache + Request Memoization) ensuring sub-100ms dashboard loads.
- **📱 Responsive UI**: A premium, "glassmorphism" inspired design system built with Tailwind CSS 4 and Material You color principles.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Components**: [React 19](https://react.dev/), [Lucide Icons](https://lucide.dev/), [Recharts](https://recharts.org/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with PostCSS
- **Data Layer**: [YouTube Data API v3](https://developers.google.com/youtube/v3)
- **Architecture**: Layered Clean Architecture (Services → Server Actions → UI Components)

---

## 📂 Project Structure

```bash
vidmetrics/
├── app/                  # Next.js 16 App Router
│   ├── actions/          # Specialized Server Actions (Channel, Intelligence, System)
│   ├── components/       # Atomic UI Components
│   └── dashboard/        # Main Dashboard Page & Layout
├── lib/                  # Core Business Logic
│   ├── types.ts          # Centralized Type Definitions (Source of Truth)
│   ├── utils.ts          # Intelligence Algorithms & Formatters
│   └── youtube.ts        # YouTube API Service with Cache Orchestration
├── public/               # Asset Storage
└── tailwind.config.ts    # Design System Configuration
```

---

## ⚙️ Setup & Installation

### 1. Prerequisites

- [Node.js 20+](https://nodejs.org/)
- [YouTube Data API Key](https://console.cloud.google.com/apis/library/youtube.googleapis.com)

### 2. Clone the Repository

```bash
git clone https://github.com/Moemen12/VidMetrics.git
cd vidmetrics
```

### 3. Environment Configuration

Create a `.env` file in the root directory:

```env
YOUTUBE_API_KEY=your_api_key_here
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Project

```bash
npm run dev
```

Navigate to `http://localhost:3000` and enter a YouTube handle (e.g., `@MKBHD`) to start.

---

## 🧠 Intelligence Algorithms

### Viral Hook Strength

Uses regex-based pattern recognition to scan video titles for high-converting elements:

- **Questions**: `?` in title.
- **Authority**: Keywords like "How to", "Secret", "Hack".
- **Negativity**: "Stop", "Mistake", "Avoid".
- **Listicles**: Titles starting with numbers.

### Engagement Velocity

Calculated by measuring the mean views of the last 5 videos against the total subscriber base, providing a "normalized" growth score independent of channel size.

```typescript
// (Average views of last 5 videos / Total subscribers) * 100
const velocity = (avgViews / subscriberCount) * 100;
```

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<p align="center">
Built with ❤️ for the Creator Economy
</p>
