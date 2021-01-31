import { updateNote, removeNote } from "./notes";
import { initialiseEditPage, dateLastEdited } from "./views";

const noteID = location.hash.substring(1);
const noteTitle = document.querySelector("#note-title");
const noteBody = document.querySelector("#note-body");
const removeEl = document.querySelector("#remove-note");
const lastEdited = document.querySelector("#last-edited");

initialiseEditPage(noteID);

noteTitle.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    title: e.target.value,
  });
  lastEdited.textContent = dateLastEdited(note.updatedAt);
});

noteBody.addEventListener("input", (e) => {
  const note = updateNote(noteID, {
    body: e.target.value,
  });
  lastEdited.textContent = dateLastEdited(note.updatedAt);
});

removeEl.addEventListener("click", () => {
  removeNote(noteID);
  location.assign("/index.html");
});

window.addEventListener("storage", (e) => {
  if (e.key === "notes") {
    initialiseEditPage(noteID);
  }
});
