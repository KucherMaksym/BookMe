import express, { Request, Response, NextFunction } from 'express';
import cors from "cors";
import {dbConnection} from"./database.config";
import hotelRouter from  './routers/hotel.router'
import userRouter from "./routers/user.router";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";



dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: ["http://192.168.0.168:4200", "http://localhost:4200"],
    credentials: true
}))

app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use(cookieParser());



// Подключение к MongoDB
dbConnection();

interface AuthRequest extends Request {
    user?: any;
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.headers.authorization || req.cookies.jwt;

    if (!token) {
        return res.status(403).send(false);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        console.log(decoded);
        req.user = decoded;
    } catch (err) {
        return res.status(401).send('Invalid Token');
    }

    return next();
};

// Защищенный маршрут
app.get('/protected', verifyToken, (req, res) => {
    res.send(true);
});
// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});