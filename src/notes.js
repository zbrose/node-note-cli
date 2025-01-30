import { insertDB, getDB, saveDB } from "./db.js";

export const createNote = async (note, tags) => {
  const data = {
    tags,
    content: note,
    id: Date.now(),
  };
  await insertDB(data);
  return data;
};

export const getAllNotes = async () => {
  const db = await getDB();
  return db.notes;
};

export const findNotes = async (filter) => {
  const notes = await getAllNotes();
  return notes.filter((note) =>
    note.content.toLowerCase().includes(filter.toLowerCase())
  );
};

export const removeNote = async (id) => {
  const notes = await getAllNotes();
  const noteToRemove = notes.find((note) => note.id === id);

  if (noteToRemove) {
    const newNotes = notes.filter((note) => note.id !== id);
    await saveDB({ notes: newNotes });
    return `successfully deleted note with id: ${id}`;
  }
};

export const removeAllNotes = async () => {
  await saveDB({ notes: [] });
  return "successfully deleted all notes";
};
