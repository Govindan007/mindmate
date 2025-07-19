// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export default function Admin() {
  const [questions, setQuestions] = useState([]);
  const [reply, setReply] = useState({});
  const [status, setStatus] = useState({});
  const [editMode, setEditMode] = useState({});

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) =>
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  const saveReply = async (id) => {
    if (!reply[id]?.trim()) return;
    setStatus((s) => ({ ...s, [id]: "saving" }));
    try {
      await updateDoc(doc(db, "questions", id), {
        counselorReply: reply[id].trim(),
      });
      setStatus((s) => ({ ...s, [id]: "done" }));
      setReply((r) => ({ ...r, [id]: "" }));
      setEditMode((e) => ({ ...e, [id]: false }));
    } catch (err) {
      console.error(err);
      setStatus((s) => ({ ...s, [id]: "err" }));
    }
  };

  const deleteQuestion = async (id) => {
    try {
      await deleteDoc(doc(db, "questions", id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const startEdit = (id, currentReply) => {
    setReply((r) => ({ ...r, [id]: currentReply }));
    setEditMode((e) => ({ ...e, [id]: true }));
  };

  return (
    <div id="adminpage">
      <h1 className="admin-heading">🧑‍💼 Counselor Dashboard</h1>
      {questions.map((q) => (
        <div key={q.id} id="eachquestion">
          <p id="qhead">🧠 Question:</p>
          <p id="reply">{q.text}</p>

          <p id="qhead">🤖 AI Reply:</p>
          <p id="reply">{q.aiReply || "AI is thinking…"}</p>

          <p id="qhead">👨‍🏫 Your Reply:</p>
          {q.counselorReply && !editMode[q.id] ? (
            <>
              <p id="reply">{q.counselorReply}</p>
              <div className="admin-actions">
                <Button className="btn" variant="outlined" onClick={() => startEdit(q.id, q.counselorReply)}>
                  Edit Reply
                </Button>
                <Button
                  variant="outlined"
                  className="btn danger"
                  onClick={() => deleteQuestion(q.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          ) : (
            <>
              <TextField
                multiline
                minRows={3}
                maxRows={5}
                fullWidth
                placeholder="Type your reply..."
                value={reply[q.id] || ""}
                onChange={(e) =>
                  setReply((r) => ({ ...r, [q.id]: e.target.value }))
                }
              />
              <div className="admin-actions">
                <Button
                  variant="contained"
                  className="btn"
                  onClick={() => saveReply(q.id)}
                  disabled={status[q.id] === "saving"}
                >
                  {status[q.id] === "saving" ? "Saving…" : "Save Reply"}
                </Button>
                <Button
                  variant="outlined"
                  className="btn danger"
                  onClick={() => deleteQuestion(q.id)}
                >
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
