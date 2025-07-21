import express from "express"
import dotenv from "dotenv"
import { ConnectDB } from "./config/db.js"
import cookieParser from "cookie-parser"
import router from "./routes/auth.route.js"

const app = express()

dotenv.config()

app.use(express.json()); 
app.use(cookieParser()); 

app.use("/api/auth", router);

const PORT = process.env.PORT

app.listen(PORT, () => {
    ConnectDB();
    console.log("Server is running on port: ", PORT);
});

