import express from 'express';
import cors from 'cors';
import connectDB from './configS/connectDB.js'; 
import dotenv from 'dotenv';
import passport from 'passport';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import authRoute from './routes/authRoute.js';
import googleAuth from './routes/googleAuth.js';
import "./configs/passort.js";


dotenv.config();

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URL}),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));
app.use(cookieParser());
app.use(cors());
connectDB();


app.use(passport.initialize());
app.use(passport.session());


app.get("/", (req, res) => res.send("API is running"));
app.use("/api/auth",authRoute);
app.use("/auth",googleAuth)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));