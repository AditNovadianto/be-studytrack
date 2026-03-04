import * as pertemuanModel from "../models/pertemuanModel.js";

// Create
export const createPertemuan = async (req, res) => {
  const { nama_pertemuan, tanggal_pertemuan, id_matakuliah } = req.body;

  try {
    const result = await pertemuanModel.createPertemuan(
      nama_pertemuan,
      tanggal_pertemuan,
      id_matakuliah,
    );

    res.status(201).json({
      id: result.insertId,
      message: "Pertemuan created successfully",
    });
  } catch (error) {
    console.error("Error creating pertemuan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Read
export const getAllPertemuanByMatakuliah = async (req, res) => {
  const { id_matakuliah } = req.params;

  try {
    const pertemuan =
      await pertemuanModel.getAllPertemuanByMatakuliah(id_matakuliah);

    res.status(200).json({ pertemuan: pertemuan });
  } catch (error) {
    console.error("Error fetching pertemuan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Update
export const updatePertemuan = async (req, res) => {
  const { id_pertemuan } = req.params;

  const { nama_pertemuan, tanggal_pertemuan } = req.body;

  try {
    const affectedRows = await pertemuanModel.updatePertemuan(
      id_pertemuan,
      nama_pertemuan,
      tanggal_pertemuan,
    );

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Pertemuan not found or no changes made" });
    }

    res.status(200).json({ message: "Pertemuan updated successfully" });
  } catch (error) {
    console.error("Error updating pertemuan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Delete
export const deletePertemuan = async (req, res) => {
  const { id_pertemuan } = req.params;

  try {
    const affectedRows = await pertemuanModel.deletePertemuan(id_pertemuan);

    if (affectedRows === 0) {
      return res
        .status(404)
        .json({ error: "Pertemuan not found or already deleted" });
    }

    res.status(200).json({ message: "Pertemuan deleted successfully" });
  } catch (error) {
    console.error("Error deleting pertemuan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
