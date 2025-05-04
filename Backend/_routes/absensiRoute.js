// routes/absensiRoute.js
const express = require('express');
const router = express.Router();
const { submitAbsensi } = require('../controllers/absensiController');

router.post('/scan-qr', submitAbsensi);

module.exports = router;
