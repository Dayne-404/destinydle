import express from "express";
import cors from "cors";
import "dotenv/config";

import dailyWeaponRoute from "./routes/dailyWeapon.route.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET"],
    credentials: true,
  }),
);

app.use("/api/daily", dailyWeaponRoute);

// Correct way to start server
app.listen(PORT, (err) => {
  if (err) {
    console.error("Failed to start server:", err);
  } else {
    console.log(`Server is running on port ${PORT}`);
  }
});
