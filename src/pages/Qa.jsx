// src/pages/Qa.jsx
import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";

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
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Student Q&A</h1>
      {questions.length === 0 ? (
        <p>No questions yet.</p>
      ) : (
        questions.map((q) => (
          <div
            key={q.id}
            className="mb-6 border border-gray-300 rounded p-4 shadow"
          >
            <p className="font-semibold mb-2">🧠 Question:</p>
            <p className="mb-4">{q.text}</p>

            <p className="font-semibold mb-2 text-green-700">🤖 AI Reply:</p>
            <p className="mb-4 whitespace-pre-wrap">
              {q.aiReply || "AI is thinking…"}
            </p>

            {q.counselorReply && (
              <>
                <p className="font-semibold mb-2 text-blue-700">
                  👨‍🏫 Counselor Reply:
                </p>
                <p className="whitespace-pre-wrap">{q.counselorReply}</p>
              </>
            )}
          </div>
        ))
      )}
    </div>
  );
}
