import express from 'express';
import cors from "cors";
import {dbConnection} from"./database.config";
import hotelRouter from  './routers/hotel.router'


const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors({
    origin: "*",
    credentials: true
}))

app.use("/api/hotels", hotelRouter);
app.use('/uploads', express.static('uploads'));//метод по которому можно будет получить
// статичесские файлы из папки uploads при запросе http://localhost:3000/uploads/{{название файла}}

// Подключение к MongoDB
dbConnection()


// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});