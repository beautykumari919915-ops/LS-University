# LS University Portal

A full-stack, comprehensive educational institution portal built with React, Vite, Express, Tailwind CSS, and Firebase. (Note: Originally requested as Next.js 14, this uses an equivalent full-stack Express + Vite architecture required for this environment, featuring a server-side API routing and a client-side bundle.)

## Full-Stack Architecture Features

- **React Client-Side SPA**: Next.js App Router-equivalent dynamic routing via React Router.
- **Node/Express Backend API**: Dedicated backend routes for server-only logic (`/api/seed`).
- **CMS Admin Panel (`/admin`)**: Fully editable CMS. Manage Pages, Courses, Events, Certificates, Team, Placements, Exams, and Calendar.
- **Certificate Verification**: Public portal to verify authenticity of degrees and certificates.
- **Fee Payment**: Interface for online fee payment.
- **Mandatory Content**: Includes UGC/AICTE, Anti-ragging, RTI, ICC.

## Getting Started

1. **Setup Firebase**:
   - Create a Firebase project.
   - Enable **Firestore Database** and **Authentication** (Email/Password).
   
2. **Environment Variables**:
   Create a `.env` file at the root:
   ```env
   VITE_FIREBASE_API_KEY=your_key_here
   VITE_FIREBASE_AUTH_DOMAIN=your_domain_here
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   SEED_SECRET=my_secure_seed_token
   ```

3. **Install & Run**:
   ```bash
   npm install
   npm run dev
   ```

4. **Seed the Database (CRITICAL)**:

   **Method A: Authenticated Admin Panel (Recommended)**
   - Start the project and navigate to `/admin`.
   - Sign up or sign in using Firebase Auth.
   - Click the "Seed Demo Data" button in the Admin Sidebar to populate all demo content (12 Courses, 5 Certificates, 8 Placements, etc).

   **Method B: Backend Node Script**
   - Download your Service Account Key from Firebase and set it:
     `export GOOGLE_APPLICATION_CREDENTIALS="/path/to/key.json"`
   - Run `npm run seed` to perform an automated backend data push.

   **Method C: Express API Route**
   - You can hit the backend trigger (for CI/CD workflows) at:
     `GET /api/seed?secret=my_secure_seed_token`

## Deployment

1. Set your scripts in `package.json` to build the full backend + frontend bundle.
2. In Vercel or Cloud Run, set the `start` command to run the generated bundle (`npm start`).
3. Add all the `VITE_FIREBASE_*` and `SEED_SECRET` environment variables.
