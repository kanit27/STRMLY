require("dotenv").config();
const express = require("express");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const authRouter = require("./routes/authRouter");
const videoRouter = require("./routes/videoRouter");

const app = express();

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB connection error:", err));

app.use(helmet());
app.use(cors({
  origin: [
    "http://localhost:5173", // Vite dev server
    // "http://localhost:3000", // If you test frontend on backend port
    // "https://your-frontend-domain.com" // <-- Replace with your deployed frontend URL
  ],
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please try again later." }
});
app.use(limiter);

app.use("/api/auth", authRouter);
app.use("/api/videos", videoRouter);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});