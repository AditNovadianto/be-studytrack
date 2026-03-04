import { db } from "../config/db.js";

// Create
export async function createSemester(
  nama_semester,
  status_semester,
  academic_year,
  nim_mahasiswa,
) {
  try {
    const [insertRes] = await db.query(
      "INSERT INTO semester (nama_semester, status_semester, academic_year, nim_mahasiswa) VALUES (?, ?, ?, ?)",
      [nama_semester, status_semester, academic_year, nim_mahasiswa],
    );

    return { insertId: insertRes.insertId };
  } catch (error) {
    console.error("Error creating semester:", error);
    throw error;
  }
}

// Read
export async function getAllSemesterByNim(nim_mahasiswa) {
  const [rows] = await db.query(
    "SELECT * FROM semester WHERE nim_mahasiswa = ?",
    [nim_mahasiswa],
  );

  return rows;
}

// Update
export async function updateSemester(
  id_semester,
  nama_semester,
  status_semester,
  academic_year,
  nim_mahasiswa,
) {
  const [result] = await db.query(
    `UPDATE semester SET
      nama_semester = ?,
      status_semester = ?,
      academic_year = ?
     WHERE id_semester = ? AND nim_mahasiswa = ?`,
    [nama_semester, status_semester, academic_year, id_semester, nim_mahasiswa],
  );

  return result.affectedRows;
}

// Delete
export async function deleteSemester(id_semester, nim_mahasiswa) {
  const [result] = await db.query(
    "DELETE FROM semester WHERE id_semester = ? AND nim_mahasiswa = ?",
    [id_semester, nim_mahasiswa],
  );

  return result.affectedRows;
}
