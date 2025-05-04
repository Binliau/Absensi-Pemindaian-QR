// controllers/absensiController.js
const pool = require('../config/db');

exports.submitAbsensi = async (req, res) => {
  const { token, id_pegawai } = req.body;

  try {
    const qr = await pool.query('SELECT * FROM qr_code WHERE token_qr = $1', [token]);
    if (qr.rows.length === 0) return res.status(400).json({ message: 'Invalid QR token' });

    await pool.query(
      'INSERT INTO absensi (id_pegawai, token_qr, waktu) VALUES ($1, $2, NOW())',
      [id_pegawai, token]
    );

    res.json({ message: 'Absensi sukses' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal submit absensi' });
  }
};
