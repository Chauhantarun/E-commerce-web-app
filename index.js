import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import authRouter from "./route/authRoute.js";
import cors from "cors";
import categoryRouter from "./route/categoryRoutes.js";
import productRouter from "./route/productRoutes.js";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "./client/build")));

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/product", productRouter);

app.use("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(process.env.PORT || 8081, () => {
  console.log("server is running on 8081");
});

mongoose
  .connect(process.env.DB)
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });
