import dotenv from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import BookStoreDataBase from "./configure/BookStoreDataBase.js"
import BookRoute from './routes/BookRoute.js'

import cors from 'cors'

dotenv.config();

const app = express();
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DataBase Connected
BookStoreDataBase();



// Middleware
app.use('/books',BookRoute)

export default app