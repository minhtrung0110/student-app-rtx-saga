# Student Operations & Kanban Workspace

![Build Status](https://img.shields.io/badge/build-unknown-lightgrey)
![License](https://img.shields.io/badge/license-not%20specified-lightgrey)
![Node Version](https://img.shields.io/badge/node-LTS-blue)
![Tech Stack](https://img.shields.io/badge/stack-React%20%7C%20TypeScript%20%7C%20Redux%20Saga-61dafb)
![Last Commit](https://img.shields.io/badge/last%20commit-unknown-lightgrey)

## Project Description
A production-ready single-page application for managing student records and tracking project tasks in a Kanban-style board. The app provides a protected admin experience with a dedicated student management module (list, create, update, delete, filter) and a task board with drag-and-drop columns. It is designed for education-focused organizations or internal admin teams that need both student data operations and lightweight project task tracking.

## Features
- Authentication flow with protected routes and cookie-based session check.
- Student management with list view, search, status filters, create/update forms, and deletion confirmation.
- Kanban task board with columns, task cards, and drag-and-drop reordering.
- Column and task CRUD operations integrated with API services.
- Modular feature structure with shared components (layout, modals, skeleton loading, avatars).

## Tech Stack
**Frontend**
- React 18 + TypeScript
- React Router v6
- Ant Design
- styled-components

**State Management / Side Effects**
- Redux Toolkit
- Redux Saga

**API / Utilities**
- Axios (REST client)
- react-beautiful-dnd
- Lodash
- UUID

**Backend / Database**
- External REST APIs (MockAPI for students and a local Kanban API service).

## Project Architecture
This is a single-repo React SPA organized by feature modules. Redux Toolkit handles state, while Redux Saga orchestrates async flows with API clients. Routing is protected by a PrivateRoute component that checks for a login cookie.

```
src/
  api/           # Axios clients and REST API wrappers
  app/           # Redux store setup, root saga, typed hooks
  components/    # Shared UI components and layout
  config/        # Route paths and server base URLs
  features/      # Feature modules (auth, student, task)
  models/        # TypeScript models/interfaces
  utils/         # Shared utilities (DnD helpers, helpers)
```

## Folder Structure
- `src/app`: Redux store configuration and root saga.
- `src/api`: API clients for students, tasks, columns, and projects.
- `src/features/auth`: Auth flow (login, logout, protected route behavior).
- `src/features/student`: Student list, filter, and form workflows.
- `src/features/task`: Kanban task board with columns, tasks, and drag-and-drop.
- `src/components`: Layout and shared UI components.
- `src/config`: Route definitions and server base URLs.
- `src/models`: TypeScript types used across the app.

## Installation & Setup
**Prerequisites**
- Node.js (LTS)
- Yarn or npm

**Install dependencies**
```bash
yarn install
# or
npm install
```

## Environment Variables
This project does not require environment variables by default. API base URLs are defined in:
- `src/config/server.ts`

Update those values to point to your backend services.

## Running the Project
**Development**
```bash
yarn start
# or
npm run start
```

**Production build**
```bash
yarn build
# or
npm run build
```

## Scripts
- `start`: Run the development server.
- `build`: Create an optimized production build.
- `test`: Run tests in watch mode.
- `eject`: Eject Create React App configuration.

## Roadmap
- Replace mock login with real authentication (JWT/OAuth).
- Add role-based access control (Admin, Teacher, Student).
- Improve task board performance with virtualized lists.
- Expand analytics (student trends, task throughput).

## Contribution Guidelines
1. Fork the repository and create a feature branch.
2. Follow the existing code style and ESLint/Prettier conventions.
3. Keep feature scope focused and add tests where applicable.
4. Open a pull request with a clear description of the change.

## License
MIT (recommended). No license file was found in the repository.

## Author
Author: Nguyen Duc Minh Trung  \
Email: minhtrung4367@gmail.com  \
LinkedIn: https://www.linkedin.com/in/minhtrung0110/  \
Phone: +84 707 624 367
