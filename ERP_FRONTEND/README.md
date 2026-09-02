# NITDA ERP — Web

Frontend for the NITDA ERP platform. Built with Next.js 16, React 19, TypeScript and Tailwind CSS.

---

## Stack

- **Next.js 16** + **React 19** + **TypeScript**
- **Tailwind CSS v4** — styling
- **TanStack Query** — server state
- **Zustand** — client state
- **React Hook Form + Zod** — forms & validation
- **Axios** — HTTP client
- **Lucide React** — icons

---

## Getting Started

```bash
npm install
npm run dev
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

---

## CI/CD

Pushes to `production` trigger the GitHub Actions workflow which:
1. Type-checks and builds the project
2. SSHs into the VPS, pulls latest code, and rebuilds Docker

### Required GitHub Secrets

| Secret | Description |
|---|---|
| `SERVER_IP` | VPS IP address |
| `SERVER_USER` | SSH username |
| `SSH_PRIVATE_KEY` | Private SSH key |

### Required GitHub Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Backend API base URL |

---

## License

MIT
