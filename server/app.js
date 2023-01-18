import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import BookStoreDataBase from "./configure/BookStoreDataBase.js"
import BookRoute from './routes/BookRoute.js'
import multer from "multer";
const upload = multer({dest:'uploads'})
import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.get("/",(_req,res)=>{
    res.send("Hello World")
})

// DataBase Connected
BookStoreDataBase();

// to serve images for public
app.use('/uploads',express.static("uploads"));


// Middleware
app.use('/books',upload.single('image'),BookRoute)

export default app