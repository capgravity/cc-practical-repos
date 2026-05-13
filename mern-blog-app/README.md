# 📝 MERN Blog Application

A robust Full-Stack blogging platform designed for distributed cloud environments. This application demonstrates a decoupled architecture with a focus on high availability and self-hosted database management.

## 🚀 Architectural Features
- **Decoupled Frontend:** Built with React.js using functional components and custom hooks for efficient state management.
- **RESTful Backend:** Express.js server implementing standard HTTP verbs for CRUD operations.
- **Self-Hosted Persistence:** Integrated with a local MongoDB instance to ensure full data sovereignty and zero dependency on managed cloud databases.
- **Cross-Origin Resource Sharing (CORS):** Fully configured middleware for secure cross-domain communication.

## 🛠️ Technology Stack
- **Frontend:** React (Vite), Axios, CSS3
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Instance)
- **Deployment:** PM2 Process Management

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)
1. Ensure MongoDB is installed and running on your local machine.
2. Default connection: `mongodb://127.0.0.1:27017/blog-db`
3. Use MongoDB Compass or `mongosh` to verify connectivity.

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/blog-db
   ```
4. Start the server:
   ```bash
   npm start
   ```
   The backend should now be running on `http://localhost:5000`.

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The frontend should now be accessible at `http://localhost:5173`.

## 📊 API Documentation
- `GET /api/blogs` - Fetch all published content.
- `POST /api/blogs` - Publish new content with server-side validation.
- `PUT /api/blogs/:id` - Update existing content by ID.
- `DELETE /api/blogs/:id` - Remove content from persistence layer.

## 🛠️ Troubleshooting (Local)
- **Version Mismatch:** Ensure you are using **Node.js 18+**. Newer dependencies like Express 5 require modern Node runtimes.
- **CORS Blocked:** Ensure `app.use(cors())` is present in `server.js`.
- **Database Connection:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid IPv6 resolution issues.
- **npm install errors:** Try clearing cache with `npm cache clean --force` or check Node version.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
