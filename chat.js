
export default async function handler(req, res) {
  const { messages } = req.body;
  const apiKey = process.env.OPENAI_API_KEY;

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages,
      }),
    });

    const data = await completion.json();
    if (data.error) {
      return res.status(500).json({ reply: "GPT Error: " + data.error.message });
    }

    res.status(200).json({ reply: data.choices[0].message.content });
  } catch (e) {
    res.status(500).json({ reply: "Server error" });
  }
}
