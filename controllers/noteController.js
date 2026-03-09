import Note from "../models/noteModel.js";

// Create
export const createNote = async (req, res) => {
  const { title, content, id_matakuliah, id_pertemuan } = req.body;

  try {
    const newNote = new Note({ title, content, id_matakuliah, id_pertemuan });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Read
export const getAllNotesByMatakuliahAndPertemuan = async (req, res) => {
  const { id_matakuliah, id_pertemuan } = req.params;

  try {
    const notes = await Note.find({ id_matakuliah, id_pertemuan });

    res.status(200).json(notes);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
