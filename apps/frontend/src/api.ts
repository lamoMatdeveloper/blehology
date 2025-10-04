const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

export async function summarize(text: string): Promise<string> {
  const resp = await fetch(`${BACKEND_URL}/api/ai/summarize`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text })
  });
  if (!resp.ok) {
    const msg = await resp.text();
    throw new Error(`Summarize failed: ${resp.status} ${msg}`);
  }
  const data = await resp.json();
  return (data?.summary as string) || '';
}

export async function health(): Promise<boolean> {
  try {
    const resp = await fetch(`${BACKEND_URL}/api/health`);
    return resp.ok;
  } catch {
    return false;
  }
}

