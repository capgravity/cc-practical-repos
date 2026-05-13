# 🎟️ Global Event Registration System

An event management and registration portal for high-traffic cloud environments. This system demonstrates robust data handling and modern UI/UX design.

## 🚀 Key Features
- **Dynamic Registration:** Responsive React forms for efficient event data capture.
- **Backend Validation:** Express-level schema validation for data integrity.
- **Self-Contained DB:** Utilizes a local MongoDB instance for rapid read/write operations.
- **Manual Deployment:** Fully optimized for terminal-based setup on Azure/AWS VMs.

## 🛠️ Technology Stack
- **Frontend:** React, Axios, Eventful Theme
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Community Server)
- **Execution:** PM2 Process Management

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)
1. Ensure MongoDB is installed and running on your local machine.
2. Default connection: `mongodb://127.0.0.1:27017/event-db`
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
   MONGO_URI=mongodb://127.0.0.1:27017/event-db
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
- `GET /api/events` - Retrieve all event details.
- `POST /api/events` - Register a new event.
- `PUT /api/events/:id` - Edit event schedules/metadata.
- `DELETE /api/events/:id` - Cancel/Remove event record.

## 🛠️ Troubleshooting (Local)
- **Version Mismatch:** Ensure you are using **Node.js 18+**. The dependencies in this project are optimized for modern Node runtimes.
- **Database not found:** Ensure the `event-db` is correctly specified in your `.env`.
- **Frontend API URL:** Use `127.0.0.1` instead of `localhost` in your `.env` to avoid connection drops.
- **Node Modules:** If errors occur, delete `node_modules` and `package-lock.json` and run `npm install` again.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
