// controllers/authController.js
const pool = require('../config/db');
const bcrypt = require('bcrypt');

exports.login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    const table = role === 'admin' ? 'admin' : 'pegawai';
    const result = await pool.query(`SELECT * FROM ${table} WHERE email = $1`, [email]);

    if (result.rows.length === 0) return res.status(404).json({ message: 'User not found' });

    const user = result.rows[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ message: 'Invalid credentials' });

    res.json({
      message: 'Login successful',
      user: {
        id: user.id || user.id_admin,
        name: user.name || user.username,
        role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
};
