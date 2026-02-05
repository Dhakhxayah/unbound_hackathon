import axios from "axios";

export async function callLLM({ prompt, model }) {
  const response = await axios.post(
    "https://api.getunbound.ai/v1/chat/completions",
    {
      model,
      messages: [
        {
          role: "system",
          content: "You are a deterministic function. Follow instructions exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ]
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.UNBOUND_API_KEY}`,
        "Content-Type": "application/json"
      },
      timeout: 30000
    }
  );

  return response.data.choices[0].message.content;
}
