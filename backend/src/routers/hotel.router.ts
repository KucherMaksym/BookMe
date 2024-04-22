import { Router } from 'express';
import expressAsyncHandler from 'express-async-handler';
import {HotelModel} from "../models/hotel.model";
import multer from "multer";
import path from "path"
import fs from 'fs';


const router = Router();



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Директория для сохранения файлов

        //cb(null, '../frontend/src/assets/'); // Директория для сохранения файлов
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}${file.originalname.trim()}`);
    },
});

const upload = multer({ storage });


router.get("/getAll", expressAsyncHandler (async (req, res) => {

    const hotels = await HotelModel.find({});
    res.send(hotels);

}));


router.post("/new-hotel", upload.array("images"), expressAsyncHandler(async (req, res) => {

    //ваще нипон
    // const imagePaths = req.files?.map(file => file.path);
    const filePaths: string[] = [];

    // Проверяем, что req.files является массивом
    if (Array.isArray(req.files)) {
        filePaths.push(...req.files.map(file => file.filename));
    }


    const {name, description, pricePerAdult, pricePerKid, location} = req.body;

    const newHotel = {
        id: '',
        name,
        description,
        pricePerAdult,
        pricePerKid,
        isFree: true,
        location,
        images: filePaths
    }

    try{
        const dbHotel = await HotelModel.create(newHotel);
        res.send(dbHotel);
    }    catch (error) {
        console.log(error);
    }
}))

export default router;