# ConnectHub - Mini LinkedIn-like Community Platform

## 🛠 Stack Used

**Frontend:**
- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Navigation)
- React Hook Form + Zod (Form validation)
- Lucide React (Icons)

**Backend & Database:**
- Supabase (Backend-as-a-Service)
- PostgreSQL (Database)
- Row Level Security (RLS)

**Deployment:**
- Netlify (Frontend hosting)

## 🚦 Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/connecthub
   cd connecthub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings > API to get your project URL and anon key
   - Copy `.env.example` to `.env` and fill in your Supabase credentials:
     ```
     VITE_SUPABASE_URL=your_supabase_project_url
     VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```

4. **Set up the database**
   Run the SQL migration file in your Supabase SQL editor:
   ```bash
   # Copy contents from supabase/migrations/01_initial_schema.sql
   # and run in Supabase SQL Editor
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

## 👤 Demo User Login

Since this is a fresh installation, you'll need to create your first account:

1. Navigate to the registration page (`/register`)
2. Fill out the form with your email, name, and password
3. After successful registration, you'll be automatically logged in
4. For subsequent logins, use the email and password you registered with

## ✨ Extra Features

- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Modern UI/UX**: LinkedIn-inspired professional design with smooth animations
- **Form Validation**: Client-side validation with helpful error messages
- **Loading States**: Smooth loading indicators throughout the app
- **Profile Editing**: Users can update their name and bio
- **Character Counter**: 500 character limit for posts with live counter
- **Security**: Row Level Security (RLS) policies for data protection
- **Error Handling**: Comprehensive error messages and validation
- **Real-time Updates**: Posts appear immediately after creation
