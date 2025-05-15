import express, { Request, Response } from 'express';
import multer from 'multer';
import pdfParse from 'pdf-parse';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import fetch from 'node-fetch';

dotenv.config();

const app = express();
const port = 5000;
const upload = multer({ dest: 'uploads/' });

app.use(cors());

app.post('/parse', upload.single('resume'), async (req: Request, res: Response): Promise<void> => {
  try {
    const file = req.file;
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const dataBuffer = fs.readFileSync(file.path);
    const pdfText = (await pdfParse(dataBuffer)).text;
    fs.unlinkSync(file.path);

const prompt = `Extract and return the following fields in a valid JSON format only  with this structure:

{
  "fullName": string,
  "email": string,
  "phoneNumber": string,
  "skills": string[],
  "education": [{ "degree": string, "institution": string, "year": string }],
  "experience": [{ "role": string, "company": string, "duration": string }]
}

Resume content:
${pdfText}
`;


    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-70b-8192',
        messages: [
          { role: 'system', content: 'You are a helpful assistant that extracts structured data from resumes.' },
          { role: 'user', content: prompt }
        ]
      })
    });

    const groqData = await groqRes.json();
    const content = groqData.choices[0].message.content;

    console.log(content);
    
    try {
      const startIndex = content.indexOf('{');
      const endIndex = content.lastIndexOf('}');
      
      if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
        throw new Error('Could not find JSON object in the response');
      }
      
      const jsonString = content.substring(startIndex, endIndex + 1);
      const parsed = JSON.parse(jsonString);
      console.log(parsed);
      
      res.json(parsed);
    } catch (err: any) {
      res.status(500).json({ error: 'Failed to parse JSON from response', details: err.message, raw: content });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});