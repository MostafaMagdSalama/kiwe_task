import express from "express";
import dotenv from "dotenv";
import { initDB } from "./src/config/DB";
import AuthRouter from './src/routes/auth.router'

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Health Check
app.get("/", (req, res) => {
    res.send("Weather API is running!");
});


// handle routes 

app.use("/auth", AuthRouter)


// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    initDB();
});
