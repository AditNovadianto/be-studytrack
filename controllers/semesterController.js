import * as semesterModel from "../models/semesterModel.js";

// Create
export const createSemester = async (req, res) => {
  const { nim_mahasiswa, nama_semester, status_semester, academic_year } =
    req.body;

  try {
    const result = await semesterModel.createSemester(
      nama_semester,
      status_semester,
      academic_year,
      nim_mahasiswa,
    );

    res.status(201).json({
      id_semester: result.insertId,
      message: "Semester created successfully",
    });
  } catch (error) {
    console.error("Error creating semester:", error);
    res.status(500).json({ error: "Failed to create semester" });
  }
};

// Read
export const getAllSemesterByNim = async (req, res) => {
  const { nim_mahasiswa } = req.params;

  try {
    const semester = await semesterModel.getAllSemesterByNim(nim_mahasiswa);

    res.status(200).json({ semester: semester });
  } catch (error) {
    console.error("Error fetching semester:", error);
    res.status(500).json({ error: "Failed to fetch semester" });
  }
};

export const getActiveSemester = async (req, res) => {
  const { nim_mahasiswa } = req.params;

  try {
    const semester = await semesterModel.getActiveSemester(nim_mahasiswa);

    res.status(200).json({ semester: semester });
  } catch (error) {
    console.error("Error fetching active semester:", error);
    res.status(500).json({ error: "Failed to fetch active semester" });
  }
};

// Update
export const updateSemester = async (req, res) => {
  const { id_semester } = req.params;

  const { nim_mahasiswa, nama_semester, status_semester, academic_year } =
    req.body;

  try {
    const affectedRows = await semesterModel.updateSemester(
      id_semester,
      nama_semester,
      status_semester,
      academic_year,
      nim_mahasiswa,
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Semester not found or no changes made" });
    }

    res.status(200).json({ message: "Semester updated successfully" });
  } catch (error) {
    console.error("Error updating semester:", error);
    res.status(500).json({ error: "Failed to update semester" });
  }
};

// Delete
export const deleteSemester = async (req, res) => {
  const { id_semester } = req.params;
  const { nim_mahasiswa } = req.body;

  try {
    const affectedRows = await semesterModel.deleteSemester(
      id_semester,
      nim_mahasiswa,
    );

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Semester not found" });
    }

    res.status(200).json({ message: "Semester deleted successfully" });
  } catch (error) {
    console.error("Error deleting semester:", error);
    res.status(500).json({ error: "Failed to delete semester" });
  }
};
