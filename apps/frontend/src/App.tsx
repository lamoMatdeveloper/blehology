import { useEffect, useState } from 'react';
import { summarize, health } from './api';

export default function App() {
  const [ok, setOk] = useState<boolean | null>(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    health().then(setOk);
  }, []);

  const run = async () => {
    setLoading(true);
    setError('');
    setSummary('');
    try {
      const s = await summarize(text);
      setSummary(s);
    } catch (e: any) {
      setError(e.message || 'Error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 900, margin: '2rem auto', padding: '0 1rem', fontFamily: 'Inter, system-ui, Arial' }}>
      <h1>Nasa BioScience Explorer</h1>
      <p style={{ color: ok ? 'green' : ok === false ? 'crimson' : 'gray' }}>
        Backend: {ok === null ? 'checking…' : ok ? 'online' : 'offline'}
      </p>

      <label htmlFor="input" style={{ fontWeight: 600 }}>Texto científico a resumir</label>
      <textarea
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Pega aquí un abstracto, resultados o conclusiones…"
        rows={10}
        style={{ width: '100%', display: 'block', marginTop: 8 }}
      />

      <button onClick={run} disabled={!text || loading} style={{ marginTop: 12 }}>
        {loading ? 'Resumiendo…' : 'Resumir con IA'}
      </button>

      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      {summary && (
        <div style={{ marginTop: 16 }}>
          <h2>Resumen</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{summary}</pre>
        </div>
      )}
    </div>
  );
}

