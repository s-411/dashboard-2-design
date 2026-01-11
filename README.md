# Dream 100 Web

A web application for tracking engagement with your top 100 creators across Instagram, YouTube, X (Twitter), and TikTok.

## Tech Stack

- **Frontend:** Vite + React 18 + TypeScript
- **Styling:** Tailwind CSS
- **Routing:** React Router
- **Backend:** Supabase (Auth + Database)
- **Icons:** Lucide React

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Supabase account with existing database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your Supabase credentials:
   ```
   VITE_SUPABASE_URL=https://lvengkxqdgtgskyegbek.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Features

- **Authentication:** Email/password signup and login with Supabase Auth
- **Creator Management:** Add creators from Instagram, YouTube, X, or TikTok by pasting their profile URL
- **Daily Engagement Tracking:** Track likes and comments for each creator
- **Progress Dashboard:** See today's completion percentage and current streak
- **Dark/Light Mode:** Toggle between dark and light themes
- **Responsive Design:** Works on desktop and tablet

## Database Schema

This app connects to an existing Supabase database with the following tables:
- `profiles` - User profile data
- `creators` - Creator profiles to track
- `engagement_logs` - Daily engagement records
- `folders` - Creator organization
- `user_settings` - User preferences

## Deployment

This app is configured for Vercel deployment. Simply connect your GitHub repo to Vercel and add the environment variables.

## License

MIT
