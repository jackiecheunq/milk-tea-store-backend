import path from "path";
import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import adminRoutes from "./routes/admin.js";
import productsRoutes from "./routes/products.js";
import orderRoutes from "./routes/order.js";
const __dirname = path.resolve();
const app = express();
app.use(express.json()); // application/json
app.use("/public", express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use((_req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST, PUT, PATCH, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/products", productsRoutes);
app.use("/admin", adminRoutes);
app.use("/order", orderRoutes);
app.use((error, _req, res, _next) => {
    res
        .status(error.cause.code || 400)
        .json({ message: error.message || "Unknown Error" });
});
connect(process.env.MONGODB_STRING)
    .then((_result) => {
    app.listen(8080);
    console.log("listen on port 8080.");
})
    .catch((err) => console.log(err));
