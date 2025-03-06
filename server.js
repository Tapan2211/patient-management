const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');
const route = require('./routes/patient.route');
const authRoute = require('./routes/auth.route');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// Serve uploaded images
app.use('/uploads', express.static('uploads'));

app.use('/api/v1/patient', route);
app.use("/api/v1/auth", authRoute);
app.use(errorHandler);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));