# Excaliraw

Excaliraw is a real-time collaborative drawing application that enables multiple users to sketch, annotate, and create visual content together on a shared canvas. The project is architected as a monorepo using **Turborepo** and **pnpm workspaces**, ensuring modular separation between the frontend, backend services, and shared libraries.

---

## Features

- **Real-Time Collaboration** — Multiple users can join a shared room and see each other's drawings update live via WebSocket connections.
- **Vector Drawing Tools** — A custom-built canvas engine supporting rectangles, circles, ellipses, straight lines, and freehand pencil sketches.
- **Image Support** — Drag-and-drop image uploads directly onto the canvas with hit-testing and selection capabilities.
- **Pan & Zoom Navigation** — Scroll-based panning, middle-click drag, and a dedicated hand tool for navigating large canvases.
- **Element Selection** — Click to select individual shapes with a visual selection box and corner handles.
- **Asynchronous Persistence** — Drawing events are queued through a Redis-backed BullMQ pipeline and persisted to PostgreSQL by a background worker, keeping the WebSocket server responsive under load.
- **Authentication & Authorization** — User registration and login with bcrypt password hashing and JWT-based session management.
- **Room Management** — Create named drawing rooms and retrieve saved canvas history on reconnection.

---

## Tech Stack

| Layer             | Technologies                                      |
| :---------------- | :------------------------------------------------ |
| **Frontend**      | Next.js 15, React 19, TailwindCSS v4, Lucide Icons |
| **HTTP API**      | Node.js, Express, CORS                            |
| **WebSocket**     | Node.js, `ws` library                             |
| **Queue**         | Redis, BullMQ                                     |
| **Database**      | PostgreSQL, Prisma ORM                            |
| **Validation**    | Zod                                               |
| **Auth**          | JSON Web Tokens, bcrypt                           |
| **Monorepo**      | Turborepo, pnpm workspaces                        |

---

## Project Structure

```
draw-app/
├── apps/
│   ├── excaliraw-frontend/    # Next.js client application
│   ├── http-backend/          # Express REST API server
│   └── ws-backend/            # WebSocket server + BullMQ worker
├── packages/
│   ├── db/                    # Prisma schema and database client
│   ├── common/                # Shared Zod validation schemas
│   ├── backend-common/        # Shared backend configuration (JWT, etc.)
│   ├── typescript-config/     # Shared TSConfig presets
│   └── eslint-config/         # Shared ESLint configuration
├── docker-compose.yml
├── turbo.json
└── pnpm-workspace.yaml
```

---

## Prerequisites

Ensure the following are installed on your machine before proceeding:

- [Node.js](https://nodejs.org/) v18 or higher
- [pnpm](https://pnpm.io/installation) v9 or higher
- [Docker](https://www.docker.com/) (for Redis and optionally PostgreSQL)
- A PostgreSQL database (local via Docker or a hosted provider)

---

## Installation

**1. Clone the repository**

```bash
git clone https://github.com/PriyanshuLamkhade/draw-app.git
cd draw-app
```

**2. Install dependencies**

```bash
pnpm install
```

**3. Set up environment variables**

Create a `.env` file inside `packages/db/` and `apps/http-backend/` with the following:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/excaliraw?schema=public"
```

Add the JWT secret to `apps/http-backend/.env`:

```env
JWT_SECRET="your-secret-key"
```

**4. Start infrastructure services**

```bash
docker-compose up -d
```

This starts a Redis instance required by the BullMQ queue system.

**5. Initialize the database**

```bash
pnpm --filter @repo/db prisma generate
pnpm --filter @repo/db prisma db push
```

**6. Start the development servers**

```bash
pnpm dev
```

Once running, the services are available at:

| Service           | URL                      |
| :---------------- | :----------------------- |
| Frontend          | `http://localhost:3000`   |
| HTTP API          | `http://localhost:3001`   |
| WebSocket Server  | `ws://localhost:8080`     |

---

## Available Scripts

| Command              | Description                                          |
| :------------------- | :--------------------------------------------------- |
| `pnpm dev`           | Start all services in development mode               |
| `pnpm build`         | Build all applications and packages for production   |
| `pnpm lint`          | Run ESLint checks across the entire monorepo         |
| `pnpm format`        | Format all source files with Prettier                |
| `pnpm check-types`   | Run TypeScript type checking across all workspaces   |

---

## License

This project is private and not currently published under an open-source license.
