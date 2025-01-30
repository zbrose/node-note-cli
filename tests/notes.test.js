import { expect, jest } from "@jest/globals";

jest.unstable_mockModule("../src/db.js", () => ({
  insertDB: jest.fn(),
  getDB: jest.fn(),
  saveDB: jest.fn(),
}));

const { insertDB, getDB, saveDB } = await import("../src/db.js");
const { createNote, getAllNotes, removeNote } = await import("../src/notes.js");

beforeEach(() => {
  insertDB.mockClear();
  getDB.mockClear();
  saveDB.mockClear();
});

test("creates new note in db", async () => {
  const note = {
    content: "test note",
    tags: ["test-tag"],
    id: Date.now(),
  };
  insertDB.mockResolvedValue(note);
  const result = await createNote(note.content, note.tags);
  expect(result.content).toEqual(note.content);
});

test("gets all notes", async () => {
  const mockDB = {
    notes: ["note1", "note2", "note3"],
  };
  getDB.mockResolvedValue(mockDB);
  const result = await getAllNotes();
  expect(result).toEqual(mockDB.notes);
});

test("removes a note by id", async () => {
  const notes = [
    { id: 1, content: "note 1" },
    { id: 2, content: "note 2" },
    { id: 3, content: "note 3" },
  ];

  saveDB.mockResolvedValue(notes);

  const idToRemove = 4;
  const result = await removeNote(4);
  expect(result).toBeUndefined();
});
