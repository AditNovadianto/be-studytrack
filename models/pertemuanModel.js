import { db } from "../config/db.js";

// Create
export async function createPertemuan(
  nama_pertemuan,
  tanggal_pertemuan,
  id_matakuliah,
) {
  try {
    const [insertRes] = await db.query(
      "INSERT INTO pertemuan (nama_pertemuan, tanggal_pertemuan, id_matakuliah) VALUES (?, ?, ?)",
      [nama_pertemuan, tanggal_pertemuan, id_matakuliah],
    );

    return { insertId: insertRes.insertId };
  } catch (error) {
    console.error("Error creating pertemuan:", error);
    throw error;
  }
}

// Read
export async function getAllPertemuanByMatakuliah(id_matakuliah) {
  const [rows] = await db.query(
    "SELECT * FROM pertemuan WHERE id_matakuliah = ?",
    [id_matakuliah],
  );

  return rows;
}

// Update
export async function updatePertemuan(
  id_pertemuan,
  nama_pertemuan,
  tanggal_pertemuan,
) {
  const [result] = await db.query(
    `UPDATE pertemuan SET
    nama_pertemuan = ?,
    tanggal_pertemuan = ?
     WHERE id_pertemuan = ?`,
    [nama_pertemuan, tanggal_pertemuan, id_pertemuan],
  );

  return result.affectedRows;
}

// Delete
export async function deletePertemuan(id_pertemuan) {
  const [result] = await db.query(
    "DELETE FROM pertemuan WHERE id_pertemuan = ?",
    [id_pertemuan],
  );

  return result.affectedRows;
}
