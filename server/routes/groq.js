const express = require('express');
const dotenv = require("dotenv");
const Groq = require("groq-sdk");

dotenv.config();

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
const MAX_HISTORY_LENGTH = 10;
let conversationHistory = [];

const router = express.Router();

router.post('/', async (req, res) => {
  const userMessage = req.body.message;
  conversationHistory.push({ role: "user", content: userMessage });

  if (conversationHistory.length > MAX_HISTORY_LENGTH) {
    conversationHistory.shift();
  }

  try {
    const response = await groq.chat.completions.create({
      messages: conversationHistory,
      model: "llama3-8b-8192",
    });

    const reply = response.choices[0]?.message?.content || "No response";
    conversationHistory.push({ role: "assistant", content: reply });

    res.json({ reply });
  } catch (error) {
    console.error("Error in chat completion:", error);
    res.status(500).json({ error: "Failed to get response" });
  }
});

module.exports = router;