import moment from "moment";
import { getFilters } from "./filters";
import { sortNotes, getNotes } from "./notes";

export const generateNoteDom = (note) => {
  const noteEl = document.createElement("a");
  const textEl = document.createElement("P");
  const statusEl = document.createElement("p");

  //Setup note title
  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = " Unamed note";
  }

  textEl.classList.add("list-item__title");

  noteEl.appendChild(textEl);
  noteEl.setAttribute("href", `edit.html#${note.id}`);
  noteEl.classList.add("list-item");

  statusEl.textContent = dateLastEdited(note.updatedAt);
  statusEl.classList.add("list-item__subtitle");
  noteEl.appendChild(statusEl);

  return noteEl;
};

export const renderNotes = () => {
  const notesEl = document.querySelector("#notes");
  const filters = getFilters();

  const notes = sortNotes(filters.sortBy);
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  notesEl.innerHTML = "";

  if (filteredNotes.length > 0) {
    filteredNotes.forEach((note) => {
      const noteElement = generateNoteDom(note);
      document.querySelector("#notes").appendChild(noteElement);
    });
  } else {
    const emptyMessage = document.createElement("p");
    emptyMessage.textContent = "No notes to show";
    emptyMessage.classList.add("empty-message");
    notesEl.appendChild(emptyMessage);
  }
};

export const initialiseEditPage = (noteID) => {
  const noteTitle = document.querySelector("#note-title");
  const noteBody = document.querySelector("#note-body");
  const lastEdited = document.querySelector("#last-edited");
  const notes = getNotes();
  const note = notes.find((note) => note.id === noteID);

  if (!note) {
    location.assign("/index.html");
    return;
  }
  noteTitle.value = note.title;
  noteBody.value = note.body;
  lastEdited.textContent = dateLastEdited(note.updatedAt);
};

export const dateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;
