# competencias-web1

## Backend (Express)

Endpoints:
- `GET /api/health`
- `GET /api/logs`, `GET /api/logs/recent`, `GET /api/logs/latest-by-sensor`
- `GET /api/trucks/state`
- `GET /api/truck-events`
- `POST /api/truck-events`

### Persistencia: archivo (por defecto)

Usa `server/data/truck-events.json`.

Arranque:
- `npm run dev:server`

### Persistencia: Firebase (Firestore)

1) Instala dependencias:
- `npm i`

2) Crea un proyecto Firebase y habilita Firestore.

3) Configura credenciales (elige una opción):
- Opción A: descarga un Service Account JSON y define `FIREBASE_SERVICE_ACCOUNT_PATH` (recomendado).
- Opción B: usa `FIREBASE_PROJECT_ID`, `FIREBASE_CLIENT_EMAIL`, `FIREBASE_PRIVATE_KEY` (con `\\n`).

4) Habilita el driver:
- `STORAGE_DRIVER=firebase`

5) (Opcional) Migra los eventos locales a Firestore:
- `npm run seed:firebase`

Colecciones usadas:
- `truckEvents` (documento id = `eventoId`, ej: `mov-0001`)
- `metadata/truckEvents` (contador `nextSequence`)

