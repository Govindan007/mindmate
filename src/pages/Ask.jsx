// src/pages/Ask.jsx
import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Ask() {
  const [question, setQuestion] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!question.trim()) return setError("Please type a question.");
    setLoading(true);

    try {
      await setDoc(doc(collection(db, "questions"), uuidv4()), {
        text: question.trim(),
        aiReply: null,          // filled by Cloud Function later
        counselorReply: null,   // filled on /admin page
        createdAt: serverTimestamp()
      });
      setSent(true);
      setQuestion("");
    } catch (err) {
      console.error(err);
      setError("Save failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return sent ? (
    <div className="p-4">
      <h2 className="text-xl font-semibold">✅ Question Submitted!</h2>
      <p>AI is generating a reply. Check back soon.</p>
    </div>
  ) : (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ask a Question</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField 
          id="askfield"
          variant='outlined'
          className="border rounded p-2 h-32"
          placeholder="Type your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <br /><br />
        {error && <p className="text-red-600">{error}</p>}
        <Button
          variant='contained' 
          color="success"
          id="askbutton"
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded py-2 hover:bg-blue-700"
        >
          {loading ? "Submitting…" : "Submit Anonymously"}
        </Button>
      </form>
    </div>
  );
}
