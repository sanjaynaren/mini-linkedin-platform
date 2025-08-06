# ConnectHub - Mini LinkedIn-like Community Platform

A modern social networking platform built for the CIAAN Cyber Tech Pvt Ltd Full Stack Development Internship assessment.

## 🚀 Live Demo

[View Live Demo](https://your-deployed-url.netlify.app)

## 🛠 Tech Stack

**Frontend:**
- React 18 with TypeScript
- Vite (Build tool)
- Tailwind CSS (Styling)
- React Router (Navigation)
- React Hook Form + Zod (Form validation)
- Lucide React (Icons)
- date-fns (Date formatting)

**Backend & Database:**
- Supabase (Backend-as-a-Service)
- PostgreSQL (Database)
- Row Level Security (RLS)

**Deployment:**
- Netlify (Frontend hosting)

## ✨ Features

### Core Features
- **User Authentication**
  - Email/password registration and login
  - Secure session management
  - Protected routes

- **User Profiles**
  - Customizable profile with name, email, and bio
  - Profile editing functionality
  - Member since date display

- **Post Management**
  - Create text-based posts (up to 500 characters)
  - Real-time post feed
  - View posts by specific users

- **Social Features**
  - Public feed showing all posts
  - Author information with each post
  - Timestamp display with relative time

### Additional Features
- **Responsive Design**: Mobile-first approach with breakpoints for tablet and desktop
- **Modern UI/UX**: LinkedIn-inspired professional design
- **Loading States**: Smooth loading indicators throughout the app
- **Error Handling**: Comprehensive error messages and validation
- **Form Validation**: Client-side validation with helpful error messages
- **Security**: Row Level Security (RLS) policies for data protection

## 🏗 Database Schema

### Profiles Table
```sql
profiles (
  id: uuid (primary key, references auth.users)
  email: text (not null)
  full_name: text (not null)
  bio: text (nullable)
  avatar_url: text (nullable)
  created_at: timestamp
  updated_at: timestamp
)
```

### Posts Table
```sql
posts (
  id: uuid (primary key)
  author_id: uuid (foreign key to profiles.id)
  content: text (not null)
  created_at: timestamp
  updated_at: timestamp
)
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account

### Installation

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
   Run these SQL commands in your Supabase SQL editor:

   ```sql
   -- Create profiles table
   CREATE TABLE IF NOT EXISTS profiles (
     id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
     email text NOT NULL,
     full_name text NOT NULL,
     bio text,
     avatar_url text,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );

   -- Create posts table
   CREATE TABLE IF NOT EXISTS posts (
     id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
     author_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
     content text NOT NULL,
     created_at timestamptz DEFAULT now(),
     updated_at timestamptz DEFAULT now()
   );

   -- Enable RLS
   ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
   ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

   -- RLS Policies for profiles
   CREATE POLICY "Users can read all profiles"
     ON profiles FOR SELECT
     TO authenticated
     USING (true);

   CREATE POLICY "Users can update own profile"
     ON profiles FOR UPDATE
     TO authenticated
     USING (auth.uid() = id);

   CREATE POLICY "Users can insert own profile"
     ON profiles FOR INSERT
     TO authenticated
     WITH CHECK (auth.uid() = id);

   -- RLS Policies for posts
   CREATE POLICY "Anyone can read posts"
     ON posts FOR SELECT
     TO authenticated
     USING (true);

   CREATE POLICY "Users can create posts"
     ON posts FOR INSERT
     TO authenticated
     WITH CHECK (auth.uid() = author_id);

   CREATE POLICY "Users can update own posts"
     ON posts FOR UPDATE
     TO authenticated
     USING (auth.uid() = author_id);

   CREATE POLICY "Users can delete own posts"
     ON posts FOR DELETE
     TO authenticated
     USING (auth.uid() = author_id);
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Getting Started
Since this is a fresh installation, you'll need to create your first account:

1. **Create Your First Account:**
   - Navigate to the registration page (`/register`)
   - Fill out the form with your email, name, and password
   - After successful registration, you'll be automatically logged in

2. **Subsequent Logins:**
   - Use the email and password you registered with
   - The login form will remember your credentials for future sessions

### Navigation
- **Home**: View all posts from all users
- **Profile**: View and edit your profile, see your posts
- **Create Post**: Share your thoughts with the community

## 🎨 Design Decisions

- **Color Scheme**: Professional blue (#0A66C2) inspired by LinkedIn
- **Typography**: Clean, readable fonts with proper hierarchy
- **Layout**: Card-based design with subtle shadows and rounded corners
- **Interactions**: Smooth hover effects and transitions
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px

## 🔒 Security

- Row Level Security (RLS) policies ensure users can only access appropriate data
- Authentication tokens are handled securely by Supabase
- Form validation prevents malicious input
- Environment variables protect sensitive configuration

## 🚀 Deployment

The application is deployed on Netlify with automatic builds from the main branch.

**Build Command:** `npm run build`  
**Publish Directory:** `dist`

## 📝 Code Quality

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code linting with React and TypeScript rules
- **Component Architecture**: Modular, reusable components
- **Custom Hooks**: Shared logic extracted into custom hooks
- **Error Boundaries**: Comprehensive error handling

## 🔄 Future Enhancements

- Image uploads for posts and profile pictures
- Like and comment functionality
- User following/followers system
- Real-time notifications
- Post search and filtering
- Dark mode support

## 👨‍💻 Developer

Built by [Your Name] for the CIAAN Cyber Tech Pvt Ltd Full Stack Development Internship assessment.

**Contact:**
- Email: your.email@example.com
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]

---

*This project demonstrates modern web development practices including React, TypeScript, Supabase integration, responsive design, and professional UI/UX patterns.*