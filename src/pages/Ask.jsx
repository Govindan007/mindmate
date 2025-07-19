// src/pages/Ask.jsx
import { useState } from "react";
import { collection, doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { v4 as uuidv4 } from "uuid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

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
        aiReply: null,
        counselorReply: null,
        createdAt: serverTimestamp(),
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
    <div className="p-4 flex flex-col items-center justify-center min-h-[60vh]">
      <h2 className="text-2xl font-bold text-green-600 mb-2">✅ Submitted!</h2>
      <p className="text-gray-600 text-center">
        Your anonymous question has been received. AI is generating a reply.
        Please check back later.
      </p>
    </div>
  ) : (
    <div id="askpage">
      <Typography variant="h4" className="askhead">
        Submit Your Concern
      </Typography>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <TextField
          multiline
          minRows={4}
          id="askfield"
          variant="outlined"
          placeholder="What's on your mind today? Your identity is never recorded."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          fullWidth
        />
        <br /><br />
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <Button
          variant="contained"
          type="submit"
          disabled={loading}
          className="btn"
        >
          {loading ? "Submitting…" : "Ask Anonymously"}
        </Button>
        <p className="text-xs text-gray-500 text-center mt-1">
          Your question will be visible to counselors. AI will try to help you instantly.
        </p>
      </form>
    </div>
  );
}
