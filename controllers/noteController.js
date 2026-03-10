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

// Update
export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      id,
      { title, content },
      { returnDocument: "after" },
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete
export const deleteNote = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedNote = await Note.findByIdAndDelete(id);

    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
