import { OpenAI } from 'openai';

// Inisialisasi koneksi ke berbagai penyedia AI
const aiProviders = {
  openai: new OpenAI(process.env.OPENAI_API_KEY),
  // Tambahkan provider lain seperti Anthropic, Gemini, dll.
};

export const generateStory = async (prompt) => {
  const response = await aiProviders.openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Anda adalah penulis cerita profesional. Buatkan cerita menarik berdasarkan prompt berikut."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    temperature: 0.7,
  });
  
  return response.choices[0].message.content;
};

export const generateCode = async (description) => {
  const response = await aiProviders.openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Anda adalah programmer ahli. Buatkan kode yang efisien berdasarkan deskripsi berikut."
      },
      {
        role: "user",
        content: description
      }
    ],
    temperature: 0.2,
  });
  
  return response.choices[0].message.content;
};

export const detectBugs = async (code) => {
  const response = await aiProviders.openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Anda adalah code reviewer ahli. Analisis kode berikut dan temukan bug, vulnerability, atau code smell."
      },
      {
        role: "user",
        content: code
      }
    ],
    temperature: 0.1,
  });
  
  return response.choices[0].message.content;
};
