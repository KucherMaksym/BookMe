const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const cors = require('cors');



const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:4200",
    credentials: true
}))

// Подключение к MongoDB
mongoose.connect('mongodb://localhost:27017/booking-site', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Модель для хранения данных отеля
const HotelSchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String] // Массив путей к изображениям
});

const Hotel = mongoose.model('Hotel', HotelSchema);

// Настройка хранилища для загрузки изображений
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Директория для сохранения файлов
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Маршрут для загрузки изображений
app.post('/api/upload', upload.array('images'), async (req, res) => {
  const imagePaths = req.files.map(file => file.path);

  // Создание нового отеля с загруженными изображениями
  const newHotel = new Hotel({
    name: 'Hotel Name',
    description: 'Hotel Description',
    images: imagePaths
  });

  try {
    await newHotel.save();
    res.send('Изображения успешно загружены');
  } catch (err) {
    console.error(err);
    res.status(500).send('Ошибка при загрузке изображений');
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});