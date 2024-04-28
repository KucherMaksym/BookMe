import { Router, Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { HotelModel, Hotel } from "../models/hotel.model";
import multer from "multer";
import admin from "firebase-admin";
import path from 'path';

// Инициализация Firebase Admin SDK
let serviceAccount = require("../booking-e5728-firebase-adminsdk-8q5g0-94b5ecdf00.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: "gs://booking-e5728.appspot.com"
});
const bucket = admin.storage().bucket();

const router = Router();

const storage = multer.memoryStorage(); // Использование памяти для хранения загружаемых файлов
const upload = multer({ storage });

router.get("/getAll", expressAsyncHandler(async (req, res) => {
    const hotels = await HotelModel.find({});
    res.send(hotels);
}));

router.get("/:id", expressAsyncHandler(async (req, res) => {
    const hotel = await HotelModel.findById(req.params.id);
    res.send(hotel);
}));

router.post("/new-hotel", upload.array("images"), expressAsyncHandler(async (req: Request, res: Response) => {
    const { name, description, pricePerAdult, pricePerKid, location } = req.body;

    // Загрузка файлов в Firebase Storage и получение их URL-адресов
    const imageUrls = await Promise.all(
        (req.files as Express.Multer.File[]).map(async (file) => {
            const fileRef = bucket.file(`uploads/${Date.now()}-${path.basename(file.originalname)}`);
            const stream = fileRef.createWriteStream({
                metadata: {
                    contentType: file.mimetype
                }
            });

            stream.end(file.buffer);

            const signedUrlResponse = await fileRef.getSignedUrl({
                action: 'read',
                expires: '03-09-2491' // Укажите нужную дату истечения срока действия URL
            });
            return signedUrlResponse[0]; // Извлекаем URL-адрес из объекта GetSignedUrlResponse
        })
    );

    const newHotel: Partial<Hotel> = {
        name,
        description,
        pricePerAdult,
        pricePerKid,
        isFree: true,
        location,
        images: imageUrls
    };

    try {
        const dbHotel = await HotelModel.create(newHotel);
        res.send(dbHotel);
    } catch (error) {
        console.log(error);
    }
}));

export default router;