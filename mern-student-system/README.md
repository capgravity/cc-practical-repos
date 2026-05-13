# 🎓 Student Record Management System

A mission-critical administrative platform for academic record keeping. This project showcases the implementation of a MERN stack application optimized for self-contained cloud deployments.

## 🚀 Key Features
- **Data Integrity:** Strict Mongoose schemas for student metadata (Roll Number, Department, Email).
- **Responsive UI:** Modern React interface for seamless data entry and record visualization.
- **Production Persistence:** Uses a local MongoDB instance to avoid reliance on external SaaS providers.
- **Environment Agnostic:** Fully configurable through environment variables for local and cloud environments.

## 🛠️ Technology Stack
- **Frontend:** React, Axios, Modern CSS
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Self-Hosted)
- **Deployment:** PM2 (Production Process Manager)

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)
1. Ensure MongoDB is installed and running on your local machine.
2. Default connection: `mongodb://127.0.0.1:27017/student-db`
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
   MONGO_URI=mongodb://127.0.0.1:27017/student-db
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
- `GET /api/students` - Retrieve all student records.
- `POST /api/students` - Create new student entry.
- `PUT /api/students/:id` - Modify student information.
- `DELETE /api/students/:id` - Remove record from database.

## 🛠️ Troubleshooting (Local)
- **Version Mismatch:** Ensure you are using **Node.js 18+**. Newer dependencies like Express 5 require modern Node runtimes.
- **Port Conflict:** If port 5000 is occupied, change it in `.env` and update the frontend API call URL.
- **MongoDB Error:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid IPv6 resolution issues.
- **Node Version:** Recommended Node.js version 18.x or 20.x.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
