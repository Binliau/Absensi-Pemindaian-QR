// controllers/qrController.js
const pool = require('../config/db');
const QRCode = require('qrcode');
const { v4: uuidv4 } = require('uuid');

exports.generateQR = async (req, res) => {
  const token = uuidv4();

  try {
    const qrImage = await QRCode.toDataURL(token);

    await pool.query(
      'INSERT INTO qr_code (token_qr, id_admin, created_at) VALUES ($1, $2, NOW())',
      [token, 1] // for now hardcoded admin id
    );

    res.json({ token, qrImage });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to generate QR' });
  }
};
