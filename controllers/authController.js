import { db } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isValidBakrieEmail } from "../utils/emailValidator.js";

const signToken = (user) => {
  if (!process.env.JWT_SECRET) throw new Error("JWT_SECRET is not set");
  return jwt.sign(
    {
      sub: user.id_user,
      nama_mahasiswa: user.nama_mahasiswa,
      email_mahasiswa: user.email_mahasiswa,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "15min",
      issuer: "my-app",
      audience: "my-app-users",
      algorithm: "HS256",
    },
  );
};

const sanitizeUser = (u) => ({
  nim_mahasiswa: u.nim_mahasiswa,
  nama_mahasiswa: u.nama_mahasiswa,
  email_mahasiswa: u.email_mahasiswa,
  status_mahasiswa: u.status_mahasiswa,
  id_platform: u.id_platform,
});

// --- SIGN UP ---
export const signUp = async (req, res) => {
  const {
    nim_mahasiswa,
    nama_mahasiswa,
    email_mahasiswa,
    password_mahasiswa,
    status_mahasiswa,
  } = req.body;

  try {
    // Validasi email domain
    if (!isValidBakrieEmail(email_mahasiswa)) {
      return res.status(400).json({
        error: "Email must use @student.bakrie.ac.id domain",
      });
    }

    // 1) cek user sudah ada?
    const [existRows] = await db.query(
      "SELECT nim_mahasiswa FROM mahasiswa WHERE email_mahasiswa = ? LIMIT 1",
      [email_mahasiswa],
    );

    if (existRows.length > 0) {
      return res.status(409).json({ error: "Mahasiswa already exists" });
    }

    // 2) hash password
    const hashed = await bcrypt.hash(password_mahasiswa, 10);

    // 3) insert user
    const [insertRes] = await db.query(
      "INSERT INTO mahasiswa (nim_mahasiswa, nama_mahasiswa, email_mahasiswa, password_mahasiswa, status_mahasiswa, id_platform) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nim_mahasiswa,
        nama_mahasiswa,
        email_mahasiswa,
        hashed,
        status_mahasiswa,
        1,
      ],
    );

    // 4) ambil user baru
    const [newUserRows] = await db.query(
      "SELECT nim_mahasiswa, nama_mahasiswa, email_mahasiswa, status_mahasiswa, id_platform FROM mahasiswa WHERE nim_mahasiswa = ?",
      [nim_mahasiswa],
    );

    const newUser = newUserRows[0];

    // 5) buat token
    const token = signToken(newUser);

    return res.status(201).json({ user: sanitizeUser(newUser), token });
  } catch (err) {
    console.error("signUp error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

// --- SIGN IN ---
export const signIn = async (req, res) => {
  const { email_mahasiswa, password_mahasiswa } = req.body;

  try {
    // Validasi email domain
    if (!isValidBakrieEmail(email_mahasiswa)) {
      return res.status(400).json({
        error: "Email must use @student.bakrie.ac.id domain",
      });
    }

    // 1) ambil user
    const [rows] = await db.query(
      "SELECT nim_mahasiswa, nama_mahasiswa, email_mahasiswa, password_mahasiswa, status_mahasiswa, id_platform FROM mahasiswa WHERE email_mahasiswa = ? LIMIT 1",
      [email_mahasiswa],
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Mahasiswa not found" });
    }

    const user = rows[0];

    // 2) verifikasi password
    const ok = await bcrypt.compare(
      password_mahasiswa,
      user.password_mahasiswa,
    );

    if (!ok) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // 3) buat token
    const token = signToken(user);

    return res.status(200).json({ user: sanitizeUser(user), token });
  } catch (err) {
    console.error("signIn error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllMahasiswa = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT nim_mahasiswa, nama_mahasiswa, email_mahasiswa, status_mahasiswa, id_platform FROM mahasiswa",
    );

    return res.status(200).json({ users: rows });
  } catch (err) {
    console.error("getAllMahasiswa error:", err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
