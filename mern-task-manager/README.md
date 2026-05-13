# ✅ Enterprise Task Management System

A productivity-focused task orchestration platform. This application demonstrates a modern MERN stack architecture with a focus on task prioritization and state synchronization.

## 🚀 Key Features
- **State Management:** Real-time task status toggling and priority filtering.
- **RESTful Orchestration:** Decoupled API architecture for high-performance task management.
- **Data Sovereignty:** Local MongoDB integration for secure, isolated data storage.
- **Cloud Optimized:** Lightweight design suitable for 1vCPU cloud instances.

## 🛠️ Technology Stack
- **Frontend:** React, Axios, Productivity Theme
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Instance)
- **Deployment:** PM2 for high availability

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)
1. Ensure MongoDB is installed and running on your local machine.
2. Default connection: `mongodb://127.0.0.1:27017/task-db`
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
   MONGO_URI=mongodb://127.0.0.1:27017/task-db
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

## 📊 API Interface
- `GET /api/tasks` - Fetch all task assignments.
- `POST /api/tasks` - Create new task.
- `PUT /api/tasks/:id` - Update task status or priority.
- `DELETE /api/tasks/:id` - Archive/Remove task.

## 🛠️ Troubleshooting (Local)
- **Version Mismatch:** Ensure you are using **Node.js 18+**. Older versions may not support the modern syntax in this project.
- **CORS Errors:** Ensure the backend has `cors` enabled.
- **Mongo Error:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid IPv6 resolution issues.
- **Node Version:** Recommended Node.js version 18.x or 20.x.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
