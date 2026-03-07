import { db } from "../config/db.js";
import {
  createPertemuan,
  deletePertemuan,
  deletePertemuanByMatakuliah,
} from "./pertemuanModel.js";

// Create
export async function createMatakuliah(
  nama_matakuliah,
  dosen_matakuliah,
  jam_mulai,
  jam_selesai,
  id_semester,
) {
  try {
    const [insertRes] = await db.query(
      "INSERT INTO matakuliah (nama_matakuliah, dosen_matakuliah, jam_mulai, jam_selesai, id_semester) VALUES (?, ?, ?, ?, ?)",
      [nama_matakuliah, dosen_matakuliah, jam_mulai, jam_selesai, id_semester],
    );

    for (let index = 0; index < 14; index++) {
      createPertemuan(
        `Pertemuan ${index + 1}`,
        new Date(Date.now() + index * 7 * 24 * 60 * 60 * 1000), // Setiap pertemuan seminggu sekali
        insertRes.insertId,
      );
    }

    return { insertId: insertRes.insertId };
  } catch (error) {
    console.error("Error creating matakuliah:", error);
    throw error;
  }
}

// Read
export async function getAllMatakuliahBySemester(id_semester) {
  const [rows] = await db.query(
    "SELECT * FROM matakuliah WHERE id_semester = ?",
    [id_semester],
  );

  return rows;
}

// Update
export async function updateMatakuliah(
  id_matakuliah,
  nama_matakuliah,
  dosen_matakuliah,
  jam_mulai,
  jam_selesai,
) {
  const [result] = await db.query(
    `UPDATE matakuliah SET
    nama_matakuliah = ?,
    dosen_matakuliah = ?,
    jam_mulai = ?,
    jam_selesai = ?
     WHERE id_matakuliah = ?`,
    [nama_matakuliah, dosen_matakuliah, jam_mulai, jam_selesai, id_matakuliah],
  );

  return result.affectedRows;
}

// Delete
export async function deleteMatakuliah(id_matakuliah) {
  for (let index = 0; index < 14; index++) {
    deletePertemuanByMatakuliah(id_matakuliah);
  }

  const [result] = await db.query(
    "DELETE FROM matakuliah WHERE id_matakuliah = ?",
    [id_matakuliah],
  );

  return result.affectedRows;
}
