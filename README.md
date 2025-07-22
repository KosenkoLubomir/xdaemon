# xDaemon Test App

## Installation

From the `frontend` directory:

```bash
npm install
```

## Start Development Server

From the `frontend` directory:

```bash
npm start
```

- Runs the app in development mode.
- Visit [http://localhost:3000](http://localhost:3000)
- The frontend proxies API requests to the backend at `http://localhost:4000`

---

## Backend Setup

> You need to have **Node.js** and **npm** installed.

From the `backend` directory:

```bash
npm install
npm start
```

- Starts the backend server at [http://localhost:4000](http://localhost:4000)

---

## Run Both Frontend & Backend Concurrently

From the **root directory**:

```bash
npm run dev
```

---

## Cypress Tests

Make sure both **frontend** and **backend** are running.

From the `frontend` directory:

### Open Cypress UI

```bash
npx cypress open
```

### Run Tests in Headless Mode

```bash
npm run cypress:run
```

---

## Build for Production

From the `frontend` directory:

```bash
npm run build
```

- Builds an optimized production version in the `build/` folder.