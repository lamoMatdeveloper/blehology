// Copies env vars from Documentos/Claves/API.env into app .env files.
// - Backend gets all variables.
// - Frontend only gets variables prefixed with VITE_.
import fs from 'fs';
import path from 'path';

const root = process.cwd();
const sourcePath = path.join(root, 'Documentos', 'Claves', 'API.env');
const backendEnv = path.join(root, 'apps', 'backend', '.env');
const frontendEnv = path.join(root, 'apps', 'frontend', '.env');
const iaEnv = path.join(root, 'apps', 'IA', '.env');

function parseEnv(text) {
  const out = {};
  const lines = text.split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const idx = trimmed.indexOf('=');
    if (idx === -1) continue;
    const key = trimmed.slice(0, idx).trim();
    let val = trimmed.slice(idx + 1);
    // Remove optional surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    out[key] = val;
  }
  return out;
}

function toEnvFile(obj) {
  return Object.entries(obj)
    .map(([k, v]) => `${k}=${v}`)
    .join('\n') + '\n';
}

function main() {
  if (!fs.existsSync(sourcePath)) {
    console.error(`Source env not found: ${sourcePath}`);
    process.exit(1);
  }
  const raw = fs.readFileSync(sourcePath, 'utf8');
  const env = parseEnv(raw);

  // Write backend .env (all vars)
  fs.mkdirSync(path.dirname(backendEnv), { recursive: true });
  fs.writeFileSync(backendEnv, toEnvFile(env));
  console.log(`Wrote ${backendEnv}`);

  // Write frontend .env (only VITE_*)
  const fe = Object.fromEntries(Object.entries(env).filter(([k]) => k.startsWith('VITE_')));
  if (Object.keys(fe).length) {
    fs.mkdirSync(path.dirname(frontendEnv), { recursive: true });
    fs.writeFileSync(frontendEnv, toEnvFile(fe));
    console.log(`Wrote ${frontendEnv}`);
  } else {
    console.log('No VITE_* variables found for frontend');
  }

  // Write IA service .env (all vars)
  fs.mkdirSync(path.dirname(iaEnv), { recursive: true });
  fs.writeFileSync(iaEnv, toEnvFile(env));
  console.log(`Wrote ${iaEnv}`);

}

main();
