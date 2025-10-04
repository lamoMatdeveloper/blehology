# Nasa BioScience Explorer – Monorepo

Estructura preparada para frontend + backend con integraciones de IA y manejo de secretos seguro.

## Estructura

- `apps/backend`: API con Express (Node 18+), endpoint de IA y CORS.
- `apps/frontend`: Vite + React (TS). Llama a la API para evitar exponer llaves.
- `Documentos/Claves/API.env`: archivo local de variables (NO se sube a GitHub).
- `scripts/sync-env.js`: copia variables a los `.env` de cada app (frontend solo recibe `VITE_*`).
- `.github/workflows/ci.yml`: pipeline básico de build.

## Variables de entorno

- Backend (`apps/backend/.env`):
  - `PORT` (por defecto `8000`)
  - `CORS_ORIGINS` (ej. `http://localhost:5173`)
  - `OPENAI_API_KEY` (solo backend)
- Frontend (`apps/frontend/.env`):
  - `VITE_BACKEND_URL` (ej. `http://localhost:8000`)

Sigue este flujo local:

1) Pon tus llaves en `Documentos/Claves/API.env`. Ejemplo:

```
OPENAI_API_KEY=sk-...
VITE_BACKEND_URL=http://localhost:8000
```

2) Ejecuta:

```
npm install
npm run sync-env
```

3) Arranca backend y frontend (en terminales separadas):

```
npm run dev:backend
npm run dev:frontend
```

- Backend: `http://localhost:8000`
- Frontend: `http://localhost:5173`

## Seguridad y buenas prácticas

- Nunca subas `.env` ni `Documentos/Claves/API.env` (ya ignorados en `.gitignore`).
- Llaves de IA y servicios externos SOLO en backend.
- El frontend usa `VITE_*` (solo configuración pública, p. ej. URL del backend).
- Para GitHub Actions/Deploy, usa GitHub Secrets (Settings → Secrets and variables → Actions).

## Endpoints iniciales (backend)

- `GET /api/health` → estado del servicio.
- `POST /api/ai/summarize` { `text` } → resumen usando OpenAI (requiere `OPENAI_API_KEY`).
- `GET /api/publications/search?q=` → stub para búsquedas (implementación futura).

## Próximos pasos sugeridos

- Ingesta y normalización de metadatos de las 608 publicaciones (parser + ETL).
- Indexación semántica (embeddings) para búsqueda y clustering de temas.
- Grafo de conocimiento (autores, misiones, organismos, resultados, gaps).
- Dashboards interactivos (tendencias, consenso vs. disenso, gaps).
- Caché de resultados de IA en backend (para ahorrar costos y latencia).

---
Hecho con foco en separar responsabilidades: IA y llaves en backend; UI limpia en frontend; y CI listo para builds.
