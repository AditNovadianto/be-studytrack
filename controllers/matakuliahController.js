import * as matakuliahModel from "../models/matakuliahModel.js";

// Create
export const createMatakuliah = async (req, res) => {
  const {
    nama_matakuliah,
    dosen_matakuliah,
    jam_mulai,
    jam_selesai,
    id_semester,
  } = req.body;

  try {
    const result = await matakuliahModel.createMatakuliah(
      nama_matakuliah,
      dosen_matakuliah,
      jam_mulai,
      jam_selesai,
      id_semester,
    );

    res.status(201).json({
      id: result.insertId,
      message: "Matakuliah created successfully",
    });
  } catch (error) {
    console.error("Error creating matakuliah:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Read
export const getAllMatakuliahBySemester = async (req, res) => {
  const { id_semester } = req.params;

  try {
    const matakuliah =
      await matakuliahModel.getAllMatakuliahBySemester(id_semester);

    res.status(200).json({ matakuliah: matakuliah });
  } catch (error) {
    console.error("Error fetching matakuliah:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update
export const updateMatakuliah = async (req, res) => {
  const { id_matakuliah } = req.params;

  const { nama_matakuliah, dosen_matakuliah, jam_mulai, jam_selesai } =
    req.body;

  try {
    const affectedRows = await matakuliahModel.updateMatakuliah(
      id_matakuliah,
      nama_matakuliah,
      dosen_matakuliah,
      jam_mulai,
      jam_selesai,
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Matakuliah not found or no changes made" });
    }

    res.status(200).json({ message: "Matakuliah updated successfully" });
  } catch (error) {
    console.error("Error updating matakuliah:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete
export const deleteMatakuliah = async (req, res) => {
  const { id_matakuliah } = req.params;

  try {
    const affectedRows = await matakuliahModel.deleteMatakuliah(id_matakuliah);

    if (affectedRows === 0) {
      return res.status(404).json({ error: "Matakuliah not found" });
    }

    res.status(200).json({ message: "Matakuliah deleted successfully" });
  } catch (error) {
    console.error("Error deleting matakuliah:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
