# Architecture Documentation: Monisha Matriculation School Rendadi Platform

## 1. System Overview

The application is structured as a client-server architecture with two main components:
- **Frontend Panel**: A feature-rich, interactive web application acting as the user interface for parents and students.
- **Backend API**: A Node.js and Express server that manages data and business logic.

This decoupling allows independent scaling, updates, and maintenance for the frontend and backend.

## 2. Technology Stack

### Programming Languages
- **JavaScript (ES6+)**: Used heavily across both the frontend React application and the backend Node.js server.
- **HTML5 & CSS3**: Rendered via React components and styled entirely using Tailwind CSS utilities.

### Frontend Technologies
- **Vite Setup**: Utilized as the primary build tool to ensure lightning-fast module replacement and efficient bundling.
- **React.js**: A progressive JavaScript framework for building user interfaces. Utilizes Functional Components and Hooks (e.g., `useState`, `useEffect`).
- **React Router DOM**: Handles the routing logic of the Single Page Application (SPA), ensuring smooth client-side navigation between pages like Admissions, Contact, or Academic Calendar.
- **Tailwind CSS**: A utility-first CSS framework for rapid and responsive UI development without standard stylesheets.
- **Framer Motion**: Incorporates dynamic micro-interactions, scroll animations, layout transitions, and page entrance effects for a premium feel.
- **Lucide React**: Vector icons utilized throughout the platform for visual cues and aesthetic alignment.

### Backend Technologies
- **Node.js**: The JS runtime environment executing backend services.
- **Express.js**: A fast, unopinionated web framework for Node.js used to define RESTful API endpoints.
- **CORS & dotenv**: Middleware for cross-origin requests bridging the frontend-backend communication and environment variable management.

## 3. Directory Structure

The repository split naturally reflects the separation of concerns:

```
d:\school platform\
├── backend/               # Server-side repository
│   ├── server.js          # Main entry file providing Express REST API routes
│   └── package.json       # Backend configurations & dependencies
├── frontend/              # Client-side repository (Vite + React)
│   ├── public/            # Static assets like images and logos
│   ├── src/               
│   │   ├── assets/        # Global style sheets & assets
│   │   ├── components/    # Reusable structural blocks (Navbar, Footer, Hero)
│   │   ├── pages/         # Container components linked to specific routes (e.g., Contact.jsx, Calendar.jsx)
│   │   ├── App.jsx        # Root React component integrating React Router 
│   │   ├── main.jsx       # DOM mounting and Context providers
│   │   └── index.css      # Tailwind base and custom theme definitions
│   ├── index.html         # Document template
│   ├── tailwind.config.js # Tailwind theme customized parameters
│   ├── vite.config.js     # Dev server & bundling configs
│   └── package.json       # Frontend scripts and dependencies
└── ...
```

## 4. Frontend Architecture

The React app follows a modular UI component pattern:
- **Container Pages**: Located in `src/pages/`. Each file acts as an independent context managing data-fetching, state, and displaying related domain knowledge (e.g., `Contact.jsx`, `ApplyOnline.jsx`).
- **Presentational Components**: Located in `src/components/`. Extracted functional components like `AdmissionProcedure.jsx` or `Values.jsx` mapping specific props to a visual layout. These are stateless mostly, purely dealing with aesthetics and structural rendering.
- **Animation Orchestration**: Handled deeply via `framer-motion` inside both Pages and Components, ensuring scrolling components "viewport once" mount dynamically.

## 5. Backend Architecture & API Flow

The express API handles logical requests structured on fundamental endpoints.
1. The **Frontend** initiates asynchronous calls (via standard `fetch` or custom hooks when necessary).
2. The **Express API** `server.js` parses the request via its integrated routing. 
3. **Mock Data Layer**: Currently handles lightweight mock responses for modules like announcements (`/api/announcements`) and health checks (`/api/health`).

## 6. Security and Scalability Parameters
- **Environment Handling**: Utilizes dotenv configuration out of the box so that API secrets will securely transition between diverse local/cloud environments.
- **Asset Optimization**: Vite optimizes static assets on build efficiently caching components and enabling smaller bundle distributions.
- **Responsive Layout**: Tailwind enforces strict adherence to mobile-first styling principles reducing break-points errors commonly seen with traditional CSS media queries.
