import express from "express"
import colors from "colors"
import dotenv from 'dotenv'
import morgan from "morgan";
import connectDB from "./config/db.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json())
app.use(morgan('dev'))
app.get("/", (req, res) => {
    res.send("<h1>welcome</h1>")
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running ${process.env.DEV_MODE} on ${port}`.bgCyan.white)
})