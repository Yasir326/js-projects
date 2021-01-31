import { v4 as uuidv4 } from "uuid";
import moment from "moment";

let notes = [];

export const loadNotes = () => {
  const notesJSON = localStorage.getItem("notes");
  try {
    return notesJSON ? JSON.parse(notesJSON) : [];
  } catch (e) {
    return [];
  }
};

export const saveNotes = () => {
  localStorage.setItem("notes", JSON.stringify(notes));
};

export const getNotes = () => notes;
const updateTime = (note) => {
  note.updatedAt = moment.valueOf();
};

export const createNote = () => {
  const id = uuidv4();
  const timestamp = moment().valueOf();
  notes.push({
    id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  saveNotes();

  return id;
};

export const removeNote = (id) => {
  const noteIndex = notes.findIndex((note) => note.id === id);

  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
    saveNotes();
  }
};

export const sortNotes = (sortBy) => {
  if (sortBy === "byEdited") {
    return notes.sort((a, b) => b.updatedAt - a.updatedAt);
  } else if (sortBy === "byCreated") {
    return notes.sort((a, b) => b.createdAt - a.createdAt);
  } else if (sortBy === "alphabetical") {
    return notes.sort((a, b) =>
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );
  } else {
    return notes;
  }
};

export const updateNote = (id, updates) => {
  const note = notes.find((note) => note.id === id);

  if (!note) {
    return;
  }

  if (typeof updates.title === "string") {
    note.title = updates.title;
    updateTime(note);
  }

  if (typeof updates.body === "string") {
    note.body = updates.body;
    updateTime(note);
  }

  saveNotes();

  return note;
};


notes = loadNotes();

