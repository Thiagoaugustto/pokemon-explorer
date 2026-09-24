# ⚡ Pokémon Explorer

A modern, responsive Next.js application for browsing and collecting Pokémon, built with TypeScript, App Router, TanStack Query, Zustand, and Styled Components.

---

## 🚀 Features

- **Multi-page Routing:** Built using Next.js App Router (`/`, `/collection`, `/pokemon/[name]`).
- **Shiny Sprite Rules:** Automatically displays the Shiny variant for Grass-type Pokémon.
- **Collection Management:** Catch and release Pokémon with timestamps using Zustand.
- **Optimized Data Fetching:** Efficient caching and state management via TanStack Query.
- **Clean UI & Design:** Left-aligned card layout, official Pokémon type color tags, and responsive design.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **State Management:** [Zustand](https://github.com/pmndrs/zustand)
- **Data Fetching:** [TanStack Query](https://tanstack.com/query) (React Query)
- **Styling:** [Styled Components](https://styled-components.com/)
- **API:** [PokéAPI](https://pokeapi.co/)

---

## 📦 Getting Started

### Prerequisites

Ensure you have **Node.js 18+** installed on your machine.

### Installation

1. Clone the repository:
   ```bash
   git clone [https://github.com/Thiagoaugustto/pokemon-explorer.git](https://github.com/Thiagoaugustto/pokemon-explorer.git)
   cd pokemon-explorer

2. Install dependencies:
   npm install

3. Run the development server:
   npm run dev

4. Open http://localhost:3000 in your browser to view the application.

---

## 📜 Available Scripts

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the application for production.
- `npm run start` - Starts the production server.
- `npm run lint` - Runs ESLint to check for code issues.