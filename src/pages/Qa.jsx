// src/pages/Qa.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import Typography from "@mui/material/Typography";

export default function Qa() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "questions"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) =>
      setQuestions(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
    );
    return unsub;
  }, []);

  return (
    <div id="askpage">
      <Typography variant="h4" gutterBottom>Student Q&A</Typography>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        questions.map((q) => (
          <div key={q.id} id="eachquestion">
            <p id="qhead"><Typography variant="h6">🧠 Question:</Typography></p>
            <p id="reply">{q.text}</p>

            <p id="qhead"><Typography variant="h6">🤖 AI Reply:</Typography></p>
            <p id="reply">{q.aiReply || "AI is thinking…"}</p>

            {q.counselorReply && (
              <>
                <p id="qhead">
                  <Typography variant="h6">👨‍🏫 Counselor Reply:</Typography>
                </p>
                <p id="reply">{q.counselorReply}</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
