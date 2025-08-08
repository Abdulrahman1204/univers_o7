import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import connectDB from "./configs/connectToDb";
import { errorHandler, notFound } from "./middlewares/error";
import compression from "compression";

// .env
dotenv.config();

// routes import
import authAdminRouter from "./routes/users/admins/Auth.route";
import authStudentRouter from "./routes/users/students/Auth.route";
import authTeacherRouter from "./routes/users/teachers/Auth.route";
import ctrlAdminRouter from "./routes/users/admins/Admin.route";
import ctrlStudentRouter from "./routes/users/students/Student.route";
import ctrlTeacherRouter from "./routes/users/teachers/Teacher.route";

// Validate required environment variables
["MONGO_URL", "JWT_SECRET_KEY", "NODE_ENV", "PORT"].forEach(
  (env) => {
    if (!process.env[env]) {
      throw new Error(`Missing required environment variable: ${env}`);
    }
  }
);

// Connection To Db
connectDB();

// Init App
const app = express();

// middleware
app.use(compression());
app.use(express.json());
app.use(helmet());
app.use(cookieParser());

//Cors Policy
app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is running in Univers_07");
});
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes
app.use("/api/auth/admin", authAdminRouter);
app.use("/api/auth/student", authStudentRouter);
app.use("/api/auth/teacher", authTeacherRouter);
app.use("/api/ctrl/admin", ctrlAdminRouter);
app.use("/api/ctrl/student", ctrlStudentRouter);
app.use("/api/ctrl/teacher", ctrlTeacherRouter);

// Error Handler Middleware
app.use(notFound);
app.use(errorHandler);

//Running The Server
const PORT: number = parseInt(process.env.PORT || "5000");
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
