import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import router from "./routes/auth.route.js"
import { sessionRoutes } from "./routes/sessionRoutes.js";
import cors from "cors"

const app = express()

dotenv.config()

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}))

app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/auth", router);
app.use("/api/sessions", sessionRoutes);  
const PORT = process.env.PORT
app.listen(PORT, () => {
    ConnectDB();
    console.log("Server is running on port: ", PORT);
});