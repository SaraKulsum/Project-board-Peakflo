# Project Board - Task Management Application

A modern task management application built with React, TypeScript, and Material-UI. The application allows users to manage tasks across different status columns with drag-and-drop functionality and persistent storage.

## Features

### Core Functionality

- **Drag and Drop**: Easily move tasks between different status columns
- **Task Management**:
  - Add new tasks to any status column
  - View task details in a dedicated page
  - Edit task title, description, and status
  - Delete tasks from the details page
- **Status Columns**:
  - Three default statuses: "Not Started", "In Progress", "Completed"
  - Display count of tasks in each status
- **Data Persistence**: All data is automatically saved to localStorage

### Project Structure

```
src/
├── components/
│   ├── StatusSection.tsx    # Status column component
│   └── Tasks.tsx            # Draggable task card component
├── pages/
│   ├── Home.tsx             # Main board view
│   └── Details.tsx          # Task details page
├── store.ts                 # Zustand store
│
└── App.tsx                  # Main application component
```

## Technologies Used

- **React**: Frontend framework
- **TypeScript**: Type safety and better developer experience
- **@dnd-kit/core**: Drag and drop functionality
- **Material-UI**: UI components and styling
- **Zustand**: State management with persistence
- **React Router**: Navigation and routing
- **Firebase**: Hosting

## Installation

1. Clone the repository:

```bash
git clone https://github.com/SaraKulsum/Project-board-Peakflo.git
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

## Usage

### Creating a New Task

1. Click the "New" button under any status column
2. Fill in the task details in the opened page
3. Save the task

### Moving Tasks

1. Click and hold any task card
2. Drag it to the desired status column
3. Release to drop

### Editing Tasks

1. Click on any task card
2. Edit the task details in the dedicated page
3. Save changes or delete the task

### Data Persistence

- All changes are automatically saved to localStorage
- Data persists across page refreshes and browser sessions

## Dependencies

```json
{
  "dependencies": {
    "@dnd-kit/core": "^6.0.0",
    "@mui/material": "^5.0.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "react-router-dom": "^6.0.0",
    "zustand": "^4.0.0",
    "firebase": "^11.2.0"
  }
}
```
