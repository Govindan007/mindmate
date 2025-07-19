// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc, // ✅ Import deleteDoc
} from "firebase/firestore";
import { db } from "../firebaseConfig";

export default function Admin() {
  const [questions, setQuestions] = useState([]);
  const [reply, setReply] = useState({});
  const [status, setStatus] = useState({});

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
        counselorReply: reply[id].trim()
      });
      setStatus((s) => ({ ...s, [id]: "done" }));
      setReply((r) => ({ ...r, [id]: "" }));
    } catch (err) {
      console.error(err);
      setStatus((s) => ({ ...s, [id]: "err" }));
    }
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await deleteDoc(doc(db, "questions", id));
      console.log(`Deleted question with id: ${id}`);
    } catch (err) {
      console.error("Error deleting document:", err);
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Counselor Dashboard</h1>
      {questions.map((q) => (
        <div
          key={q.id}
          className="mb-8 border border-gray-400 rounded p-4 shadow"
        >
          <p className="font-semibold mb-1">🧠 Question:</p>
          <p className="mb-3">{q.text}</p>

          <p className="font-semibold mb-1 text-green-700">🤖 AI Reply:</p>
          <p className="mb-3 whitespace-pre-wrap">
            {q.aiReply || "AI is thinking…"}
          </p>

          <p className="font-semibold mb-1 text-blue-700">👨‍🏫 Your Reply:</p>
          {q.counselorReply ? (
            <p className="whitespace-pre-wrap mb-2">{q.counselorReply}</p>
          ) : (
            <>
              <textarea
                className="border rounded w-full h-24 p-2 mb-2"
                placeholder="Type your reply..."
                value={reply[q.id] || ""}
                onChange={(e) =>
                  setReply((r) => ({ ...r, [q.id]: e.target.value }))
                }
              />
              <button
                onClick={() => saveReply(q.id)}
                className="bg-blue-600 text-white rounded py-1 px-4 hover:bg-blue-700"
              >
                {status[q.id] === "saving" ? "Saving…" : "Save Reply"}
              </button>
              {status[q.id] === "done" && (
                <span className="text-green-600 ml-2">✔ Saved!</span>
              )}
              {status[q.id] === "err" && (
                <span className="text-red-600 ml-2">✖ Error</span>
              )}
            </>
          )}

          <div className="mt-4">
            <button
              onClick={() => deleteQuestion(q.id)}
              className="bg-red-600 text-white rounded py-1 px-4 hover:bg-red-700"
            >
              Delete Question
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
