import React, { useEffect, useState } from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { addDoc, deleteDoc, doc, onSnapshot, setDoc } from "firebase/firestore";
import { notescollection, db } from "./components/firebaseReact";

export default function App() {
  const [notes, setNotes] = React.useState([]);
  const [currentNoteId, setCurrentNoteId] = React.useState("");
  const [tempText, setTempText] = useState("");

  const currentNote =
    notes.find((note) => note.id === currentNoteId) || notes[0];
  useEffect(() => {
    if (currentNote) {
      setTempText(currentNote?.body);
    }
  }, [currentNote]);

  React.useEffect(() => {
    const unscribe = onSnapshot(notescollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unscribe;
  }, [notes]);
  const sortedArr = notes.sort(
    (obj1, obj2) =>
      Number(obj2.updatedAt || obj2.createdAt) -
      Number(obj1.updatedAt || obj1.createdAt)
  );
  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notescollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const noteRef = doc(db, "notes", currentNoteId);
    await setDoc(
      noteRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  async function deleteNote(noteId) {
    const deleteNote = doc(db, "notes", noteId);
    await deleteDoc(deleteNote);
  }
  useEffect(() => {
    if (!currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes]);
  useEffect(() => {
    const timeoutID = setTimeout(() => {
      if (tempText !== currentNote.body) {
        updateNote(tempText);
      }
    }, 500);
    return () => clearTimeout(timeoutID);
  }, [tempText]);

  return (
    <main>
      {notes.length > 0 ? (
        <Split sizes={[30, 70]} direction="horizontal" className="split">
          <Sidebar
            notes={sortedArr}
            currentNote={currentNote}
            setCurrentNoteId={setCurrentNoteId}
            newNote={createNewNote}
            deleteNote={deleteNote}
          />
          <Editor tempText={tempText} updateNote={updateNote} />
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button className="first-note" onClick={createNewNote}>
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}
