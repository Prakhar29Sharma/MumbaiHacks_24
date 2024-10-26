const express = require('express');
const dotenv = require("dotenv");
const Groq = require("groq-sdk");
dotenv.config();
const router = express.Router();
const { YoutubeTranscript } = require('youtube-transcript');
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

function getGroqChatCompletion(query) {
  return groq.chat.completions.create({
    messages: [
      {
        role: "user",
        content: query,
      },
    ],
    model: "llama3-8b-8192",
  });
}


router.get('/', (req, res) => {
	const { videoId } = req.query;
	YoutubeTranscript.fetchTranscript(videoId)
	.then((response) => {
		console.log(response);
		const textContent = response.map((obj) => {
			return obj.text;
		}).join(' ');

		const promptTemplate = `Summarize the following youtube video transcript : \n ${textContent}`;

		const chatCompletion = getGroqChatCompletion(promptTemplate).then((response) => {
			const chatResponse = response.choices[0]?.message?.content || "";
			res.json(chatResponse);
		});
	})
	.catch((error) => {
		console.log(error);
		res.status(500).json({ error: 'Failed to fetch transcript' });
	});
});

module.exports = router;