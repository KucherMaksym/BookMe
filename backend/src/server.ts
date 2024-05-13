import express, {Request, Response, NextFunction} from 'express';
import cors from "cors";
import {dbConnection} from"./database.config";
import hotelRouter from  './routers/hotel.router'
import userRouter from "./routers/user.router";
import jwt from 'jsonwebtoken';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
const app = express();
import { createServer } from "http";
import {Server} from "socket.io";
import {messageModel} from "./models/message.model";

const httpServer = createServer(app);

const io = new Server(httpServer, {
    cors: {
        origin: ['http://192.168.0.168:4200', 'http://localhost:4200'],
        credentials: true
    }
});

dotenv.config();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: ["http://192.168.0.168:4200", "http://localhost:4200"],
    credentials: true
}))

app.use("/api/hotels", hotelRouter);
app.use("/api/users", userRouter);
app.use(cookieParser());


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

app.get('/protected', verifyToken, (req, res) => {
    res.send(true);
});

const chatRooms:any = {};

io.on("connection", (socket) => {
    console.log("Client connected");

    socket.on("disconnect", (socket) => {
        console.log("Client disconnected");
    })

    socket.on("joinChat", async (userId, recipientId) => {
        const userIds = [userId, recipientId]; // идентификаторы пользователей
        const roomId = userIds.sort().join('-');
        console.log(roomId);
        socket.join(roomId);
        const messages = await messageModel.find( {"roomId": roomId})
        if (messages) socket.emit("initMessages", messages);
    })

    socket.on("newMessage", (message) => {
        const { roomId, message: text, currentUser } = message;
        console.log({roomId, message: text, currentUser })
        messageModel.create({roomId, text, sender: currentUser})
        socket.to(roomId).emit("message", { roomId, text, currentUser });
    })

    socket.on("leaveRoom", (roomId) => {
        socket.leave(roomId);
    })
});


httpServer.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});