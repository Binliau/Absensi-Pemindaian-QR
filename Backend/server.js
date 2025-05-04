// server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Pool } = require('pg');
const authRoute = require('./routes/authRoute');
const absensiRoute = require('./routes/absensiRoute');
const generateQR = require('./_routes/qrRoute');

dotenv.config(); // Load .env
const app = express();
app.use(cors());
app.use(express.json()); // Allow JSON request body
app.use('/api', authRoute);
app.use('/api', absensiRoute);
app.use('/api', generateQR);



// DB Connection
const { PGHOST, PGUSER, PGPASSWORD, PGDATABASE } = process.env;
const pool = new Pool({
    host: PGHOST,
    user: PGUSER,
    password: PGPASSWORD,
    database: PGDATABASE,
    port: 5432,
    ssl: {
        require: true,
    }
});
app.locals.db = pool;



app.get('/', (req, res) => {
    res.send('Welcome to the QR Code API!');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
