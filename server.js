require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const router = require('./routes/patient.route');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGDB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

app.use('/api/patient', router);

const PORT = process.env.PORT || 8081;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
