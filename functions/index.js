// functions/index.js
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const fetch = require("node-fetch");

admin.initializeApp();
const db = admin.firestore();

exports.generateAIReply = functions.firestore
  .document("questions/{id}")
  .onCreate(async (snap, context) => {
    const question = snap.data().text;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta2/models/gemini-pro:generateContent?key=AIzaSyBqY7vB2h22izEmaRljw0d8EC0xyrRrFXA`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: question }] }]
          })
        }
      );

      const data = await response.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "No AI reply";

      await snap.ref.update({
        aiReply: reply
      });

    } catch (err) {
      console.error("Gemini/Firestore error:", err);
      await snap.ref.update({
        aiReply: "⚠️ AI generation failed."
      });
    }
  });
