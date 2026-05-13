# 🛒 E-commerce Inventory Management

A scalable e-commerce inventory solution designed for cloud-native deployment. This system provides a comprehensive interface for managing product stocks, pricing, and categories.

## 🚀 Key Features
- **Real-time Inventory:** Dynamic React components for immediate inventory tracking.
- **Relational Data Modeling:** Optimized MongoDB schemas for product attributes and categories.
- **Secure API Layer:** Express.js endpoints with error handling and request validation.
- **Deployment Hardening:** Standardized for manual deployment on Linux-based cloud instances.

## 🛠️ Technology Stack
- **Frontend:** React (Vite), Axios
- **Backend:** Node.js, Express, Mongoose
- **Database:** MongoDB (Local Community Edition)
- **Monitoring:** PM2 for process uptime

## 💻 Local Development Setup

### 1. Database Setup (MongoDB)
1. Ensure MongoDB is installed and running on your local machine.
2. Default connection: `mongodb://127.0.0.1:27017/ecommerce-db`
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
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce-db
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
- `GET /api/products` - List all inventory items.
- `POST /api/products` - Add new product to stock.
- `PUT /api/products/:id` - Update stock levels or pricing.
- `DELETE /api/products/:id` - De-list products.

## 🛠️ Troubleshooting (Local)
- **Version Mismatch:** Ensure you are using **Node.js 18+**. Older versions may not support Express 5 or modern ES6 features used in this project.
- **CORS Errors:** Ensure the backend has `cors` enabled and is pointing to the correct frontend port.
- **Mongo Error:** Verify that `mongod` service is active on your system. Use `127.0.0.1` instead of `localhost` in your `.env` if you experience connection timeouts.
- **Port Conflict:** If port 5000 or 5173 is occupied, change the ports in `.env` and `vite.config.js`.

---
*Developed for Academic Practical Examination - Cloud Computing & LP2.*
