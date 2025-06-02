import analyzeExcel from '../utils/analyzeExcel.js';
import OpenAI from 'openai';
import Upload from '../models/Upload.js';


const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateInsight = async (req, res) => {
  try {
    const fileId = req.params.id;

    const file = await Upload.findById(fileId);

    if (!file) {
      return res.status(404).json({ error: 'File not found' });
    }

    // If file data is stored as buffer
    const buffer = file.buffer instanceof Buffer ? file.buffer : Buffer.from(file.buffer);


    if (!buffer) {
      return res.status(400).json({ error: 'File content is missing' });
    }

    const analysis = analyzeExcel(buffer);

    if (!analysis) {
      return res.status(400).json({ error: 'Empty or invalid Excel file' });
    }

    let prompt = `The uploaded Excel data contains the following columns and summary statistics:\n\n`;
    for (const [col, metric] of Object.entries(analysis.metrics)) {
      prompt += `- ${col}: total ${metric.sum.toFixed(2)}, average ${metric.avg.toFixed(2)}\n`;
    }
    prompt += `\nPlease provide a brief, insightful summary based on these statistics.`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 150,
    });

    const insight = completion.choices[0].message.content.trim();

    res.json({ insight, columns: analysis.columns, columnTypes: analysis.columnTypes });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate insight' });
  }
};