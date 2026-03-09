import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    id_matakuliah: { type: Number, required: true },
    id_pertemuan: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Note", noteSchema);
