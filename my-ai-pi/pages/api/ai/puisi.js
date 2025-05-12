import { OpenAI } from 'openai';

const openai = new OpenAI(process.env.OPENAI_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, jenis = 'puisi' } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // System message disesuaikan dengan jenis output
    const systemMessage = jenis === 'puisi' 
      ? "Anda adalah penyair profesional. Buatkan puisi indah dalam 3 bait tentang topik berikut. Gunakan bahasa yang puitis."
      : "Anda adalah ahli pantun. Buatkan pantun 4 baris dengan sampiran dan isi yang relevan tentang topik berikut.";

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemMessage },
        { role: "user", content: prompt }
      ],
      temperature: 0.7,
    });

    const result = response.choices[0].message.content;
    res.status(200).json({ puisi: result });

  } catch (error) {
    console.error('Error generating puisi:', error);
    res.status(500).json({ error: 'Failed to generate puisi' });
  }
}
