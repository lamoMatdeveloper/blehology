import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

// CORS
const origins = (process.env.CORS_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
app.use(cors({
  origin: origins.length ? origins : true,
}));

app.use(express.json({ limit: '2mb' }));

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'backend', time: new Date().toISOString() });
});

// AI summarize endpoint
app.post('/api/ai/summarize', async (req, res) => {
  try {
    const { text, max_tokens = 250 } = req.body || {};
    if (!text || typeof text !== 'string') {
      return res.status(400).json({ error: 'Missing "text" string in body' });
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return res.status(501).json({ error: 'OPENAI_API_KEY not configured on server' });
    }

    const summary = await summarizeWithOpenAI({ apiKey, text, max_tokens });
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'AI summarization failed' });
  }
});

// Basic publications search stub (to be implemented)
app.get('/api/publications/search', async (req, res) => {
  const q = (req.query.q || '').toString();
  // TODO: implement search over ingested metadata / embeddings
  res.json({ query: q, results: [] });
});

app.listen(port, () => {
  console.log(`[backend] listening on http://localhost:${port}`);
});

async function summarizeWithOpenAI({ apiKey, text, max_tokens }) {
  const body = {
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a concise scientific summarizer.' },
      { role: 'user', content: `Summarize the following scientific text:\n\n${text}` }
    ],
    temperature: 0.2,
    max_tokens,
  };

  const resp = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const txt = await resp.text();
    throw new Error(`OpenAI error ${resp.status}: ${txt}`);
  }

  const data = await resp.json();
  const content = data?.choices?.[0]?.message?.content || '';
  return content.trim();
}

