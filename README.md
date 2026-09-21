# DEV@Deakin - C2 Deployment Version

This version combines the C1 DEV@Deakin frontend requirements with the D1 backend and pricing functionality, ready for C2 deployment.

## Included Features

- DEV@Deakin homepage
- Profile, articles, featured articles, tutorials and photos
- C1 DEV@Deakin navigation with search field
- C1 New Post page
- Question and Article post forms with validation
- Login and registration using Firebase Authentication
- User profile page
- D1 Pricing page and upgrade flow
- Daily Insider subscription form
- ExpressJS backend
- SendGrid email integration
- Backend health endpoint
- Responsive layout

## Project Structure

- `src/` - React/Vite frontend
- `src/pages/NewPost.jsx` - C1 New Post functionality
- `src/pages/Pricing.jsx` - D1 Pricing functionality
- `backend/` - ExpressJS + SendGrid backend
- `public/_redirects` - Netlify SPA routing rule
- `netlify.toml` - Netlify build configuration
- `render.yaml` - Render backend deployment configuration

## Local Setup

### Frontend

```bash
npm install
npm run dev
```

The frontend normally runs on `http://localhost:5173`.

### Backend

```bash
cd backend
npm install
npm start
```

The backend normally runs on `http://localhost:3000`.

### Frontend environment variable

Create `.env` in the project root:

```env
VITE_API_URL=http://localhost:3000
```

### Backend environment variables

Create `backend/.env`:

```env
SENDGRID_API_KEY=your_sendgrid_api_key
FROM_EMAIL=your_verified_sender_email
FRONTEND_URL=http://localhost:5173
```

Do not commit either `.env` file.

## C2 Deployment

### Frontend - Netlify

The project is configured for Netlify with:

- Build command: `npm run build`
- Publish directory: `dist`
- Environment variable: `VITE_API_URL=<deployed backend URL>`

The `public/_redirects` file keeps React Router routes working after deployment.

### Backend - Render

The `render.yaml` file configures the backend as a free Node web service. Alternatively, create a Render Web Service manually with:

- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`
- Plan: Free

Set these environment variables in Render:

- `SENDGRID_API_KEY`
- `FROM_EMAIL`
- `FRONTEND_URL` (the deployed Netlify URL)

After the backend is deployed, test:

```text
https://YOUR-BACKEND-URL/api/health
```

Then set the Netlify `VITE_API_URL` variable to the backend URL and redeploy the frontend.
