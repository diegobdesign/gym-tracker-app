# 💪 Gym Tracker App

A modern, AI-powered fitness tracking application built with Next.js 14, featuring personalized workout routines, progress tracking, and an intelligent AI assistant powered by Claude.

![Next.js](https://img.shields.io/badge/Next.js-16.0-black)
![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)

## ✨ Features

### 🤖 AI Fitness Assistant
- **Powered by Claude Sonnet 4.5** - Get intelligent, personalized fitness guidance
- **4 Specialized Features:**
  - 📋 **Routine Suggestions** - Personalized workout routines based on your goals and experience
  - 📊 **Workout Analysis** - Performance insights and trend analysis from your workout history
  - 🏋️ **Exercise Form Tips** - Proper technique guidance and safety recommendations
  - 💬 **General Q&A** - Answer any fitness-related questions
- **Context-Aware** - Uses your profile, workout history, and routines for personalized responses
- **Chat History** - Persistent conversations saved in localStorage
- **Markdown Support** - Rich formatting in AI responses

### 🎯 Core Functionality
- **Workout Tracking** - Log exercises, sets, reps, and weights
- **Exercise Library** - Browse 100+ exercises with detailed instructions
- **Custom Routines** - Create and manage personalized workout routines
- **Progress Tracking** - Monitor your fitness journey with stats and trends
- **Video Tutorials** - Embedded video players for exercise demonstrations (YouTube, Vimeo, direct URLs)
- **Mobile-First Design** - Optimized for mobile devices with responsive images

### 🎨 User Experience
- **Clean, Modern UI** - Built with Tailwind CSS and shadcn/ui components
- **Dark Mode Ready** - Elegant dark theme support
- **Celebration System** - Workout completion animations with confetti
- **Streak Tracking** - Visual streak counter with animated flame icons
- **Rest Timer** - Color-coded rest timer with haptic feedback

## 🚀 Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type-safe development
- **Tailwind CSS 4.0** - Utility-first CSS with OKLCH color space
- **shadcn/ui** - Beautiful, accessible UI components
- **Radix UI** - Unstyled, accessible component primitives

### State Management
- **TanStack Query v5** - Server state management
- **Zustand** - Client state management with persistence

### Backend & AI
- **Supabase** - PostgreSQL database, authentication, and storage
- **Anthropic Claude API** - AI-powered fitness assistant
- **Next.js API Routes** - Serverless API endpoints

### Additional Libraries
- **react-markdown** - Markdown rendering in chat
- **date-fns** - Date manipulation
- **canvas-confetti** - Celebration animations
- **lucide-react** - Icon library

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/diegobdesign/gym-tracker-app.git
cd gym-tracker-app
```

2. **Install dependencies:**
```bash
npm install
```

3. **Set up environment variables:**

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Anthropic API Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key
NEXT_PUBLIC_AI_ENABLED=true
```

4. **Run the development server:**
```bash
npm run dev
```

5. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000)

## 🔑 Getting API Keys

### Supabase
1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to Settings → API
4. Copy your project URL and anon key

### Anthropic Claude API
1. Sign up at [console.anthropic.com](https://console.anthropic.com)
2. Navigate to API Keys
3. Create a new API key
4. Copy your key (starts with `sk-ant-api03-`)

## 🗄️ Database Setup

The app uses Supabase with the following main tables:
- `profiles` - User profiles with fitness goals and preferences
- `exercises` - Exercise library with details and media
- `routines` - User-created workout routines
- `workouts` - Workout sessions and history
- `workout_exercises` - Exercises within workouts
- `workout_sets` - Individual sets with reps and weights
- `weight_logs` - Body weight tracking

## 📱 Features in Detail

### AI Assistant Architecture
- **Context Building** - Fetches user profile, recent workouts, routines, and exercise library
- **Rate Limiting** - 10 requests per minute per user (in-memory, upgradable to Redis)
- **Error Handling** - Graceful fallbacks and user-friendly error messages
- **Security** - API key stored server-side only, input validation, context sanitization

### Mobile-First Image Handling
- **Responsive Images** - `object-contain` on all breakpoints (no cropping)
- **Lazy Loading** - Images load as user scrolls
- **Portrait Support** - 3:4 aspect ratio optimized for exercise photos
- **Gradient Backgrounds** - Visual polish for image containers

### Video Player
- **Multi-Source Support** - YouTube, Vimeo, MP4, WebM, OGG
- **Auto-Detection** - Automatically embeds based on URL format
- **Responsive** - 16:9 aspect ratio with rounded corners
- **Fallback** - Shows link if URL format isn't recognized

## 🛠️ Development

### Build for Production
```bash
npm run build
npm start
```

### Lint Code
```bash
npm run lint
```

### Type Check
```bash
npx tsc --noEmit
```

## 📄 Project Structure

```
gym-tracker/
├── app/
│   ├── (dashboard)/          # Dashboard routes
│   │   ├── dashboard/        # Main dashboard
│   │   ├── exercises/        # Exercise library
│   │   ├── routines/         # Routine management
│   │   ├── workout/          # Active workout
│   │   └── history/          # Workout history
│   ├── api/
│   │   └── ai/               # AI API routes
│   │       ├── chat/         # Claude chat endpoint
│   │       └── context/      # User context endpoint
│   └── (auth)/               # Authentication routes
├── components/
│   ├── ai-assistant/         # AI chat components
│   ├── exercises/            # Exercise components
│   ├── routines/             # Routine components
│   ├── workout/              # Workout components
│   ├── shared/               # Shared components
│   └── ui/                   # shadcn/ui components
├── hooks/                    # Custom React hooks
├── lib/
│   ├── ai/                   # AI logic and prompts
│   ├── stores/               # Zustand stores
│   ├── types/                # TypeScript types
│   ├── queries/              # Supabase queries
│   └── supabase/             # Supabase client
└── public/                   # Static assets
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **Claude AI** by Anthropic - Powering the AI fitness assistant
- **Supabase** - Backend infrastructure
- **shadcn/ui** - Beautiful UI components
- **Vercel** - Deployment platform

## 📧 Contact

Diego Bauer - [@diegobdesign](https://github.com/diegobdesign)

Project Link: [https://github.com/diegobdesign/gym-tracker-app](https://github.com/diegobdesign/gym-tracker-app)

---

**Built with ❤️ using Next.js and Claude AI**
