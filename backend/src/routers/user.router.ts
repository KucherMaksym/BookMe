import express, {Router} from 'express';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {UserModel} from "../models/user.model";
import dotenv from 'dotenv';
import expressAsyncHandler from "express-async-handler";


dotenv.config();
const app = express();

const router = Router();
router.use(cookieParser());





router.post('/login', async (req, res, next) => {
    const { email, password } = req.body;
    const userFromDB = await UserModel.findOne({ email });

    if (!userFromDB) {
        return res.status(401).send('пользователь не найден');
    }

    const isPasswordValid = await bcrypt.compare(password, userFromDB.password);

    if (!isPasswordValid) {
        return res.status(401).send('Неверный пароль');
    }


    const token = jwt.sign({ userID: userFromDB._id,  }, process.env.JWT_SECRET!, {
        expiresIn: 60 * 60 * 24 * 30 * 1000,
    });
    res.cookie('jwt', token,  { httpOnly: true, secure: false, sameSite: "strict",expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }); // установите secure: true в production
    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET!);
    res.json(decodedJWT);
});

router.post("/register", async (req, res) => {

    const { name, email, password } = req.body;

    const userExist = await UserModel.findOne({ email });
    if (userExist) {
        res.send({message: "user already exist"});
        return;
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    const user = {
        name: name,
        email: email,
        password: encryptedPassword,
    }
    console.log(user)

    const dbUser = await UserModel.create(user);

    const id = dbUser._id;

    const token = jwt.sign({ userID: id }, process.env.JWT_SECRET!, {
        expiresIn: 60 * 60 * 24 * 30 * 1000,
    });
    res.cookie('jwt', token,  { httpOnly: true, secure: false, sameSite: "strict",expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }); // установите secure: true в production

    const decodedJWT = jwt.verify(token, process.env.JWT_SECRET!);
    res.json(decodedJWT);
});



router.post('/logout', (req, res) => {
    res.clearCookie('jwt');
    res.json({ message: 'Успешный выход' });
});
router.post('/check', expressAsyncHandler(async (req, res) =>{
    const token = await req.cookies.jwt || req.headers.authorization;
    //console.log(token);
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        res.status(200).send(true)
    }
    catch (err) {
        res.status(200).send(false)
    }




}));

router.get('/protected', (req, res) => {
    const token = req.cookies.jwt;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!);
        // Доступ разрешен
    } catch (err) {
        // Неверный или истекший токен
    }
});


//expressAsyncHandler сам обрабатывает все возникшые ошибки
router.post("/profile", expressAsyncHandler(async (req, res) => {
    if (req.cookies.jwt) {
        const id = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET!);
        const idObject = JSON.parse(JSON.stringify(id));
        const userID = idObject.userID;
        const user = await UserModel.findById(userID);
        res.send(user);
    } else {
        res.send({message: "jwt wasn't found"});
    }
}));


router.patch("/patch/:id", expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    let newInfo = req.body;
    if (newInfo.password) {
        newInfo.password = await bcrypt.hash(newInfo.password, 10);
    }
    console.log(newInfo)
    await UserModel.findByIdAndUpdate(id, newInfo);
    const newUser = await UserModel.findByIdAndUpdate(id);
    res.send(newUser);
}))


router.get("/", expressAsyncHandler(async (req, res) => {
    const allUsers = await UserModel.find();
    res.send(allUsers);
}))

router.get("/:id", expressAsyncHandler(async (req, res) => {
    const user = await UserModel.findById(req.params.id);
    res.send(user);
}))

export default router