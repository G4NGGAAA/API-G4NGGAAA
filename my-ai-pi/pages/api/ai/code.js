import { generateCode } from '../../../lib/ai';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { description, language = 'javascript' } = req.body;
    
    if (!description) {
      return res.status(400).json({ error: 'Description is required' });
    }

    const fullPrompt = `Buatkan kode ${language} untuk: ${description}`;
    const code = await generateCode(fullPrompt);
    res.status(200).json({ result: code });
  } catch (error) {
    console.error('Code generation error:', error);
    res.status(500).json({ error: 'Failed to generate code' });
  }
}
