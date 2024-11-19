# Card Memory Game: A Novice ReactJS Project

## Table of Contents

1. [About](#about)
2. [Getting Started](#getting-started)
3. [Project Dependencies](#project-dependencies)
4. [Further Additions & Improvements](#future-additions--improvements)

## About

This React project forms part of [The Odin Project React course](https://www.theodinproject.com/lessons/node-path-react-new-memory-card). Its
purpose is to deepen skills in React, specifically in managing side effects with `useEffect` and interacting with third-party APIs.

The objective is to create a simple memory game using ReactJS. The game leverages hooks for state management and dynamically fetches data from an external API to enhance gameplay.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone https://github.com/JE-Richards/odin-memory-game
```

2. Navigate to the project directory:

```bash
cd your-repo
```

3. Install the [project dependencies](#project-dependencies)

```bash
npm install
```

4. To run the app:

```bash
npm run dev
```

5. Open the app in your browser at:

```bash
http://localhost:5173/
```

## Project Dependencies

The project was initialised using React with Vite, with package management handled by npm. For the full list of dependencies, see the [package.json](./package.json) file.

## Future Additions & Improvements

- **App:**
  - [ ] Implement Jest tests for `App`
  - [ ] Disable card clicks once the game is finished
  - [ ] Implement difficulty settings to adjust the number of cards.
- **Modal:**
  - [ ] Create a `Modal` component for game end. It should include:
    - [ ] A title displaying the game outcome
    - [ ] A button to reset the game
    - [ ] A button to close the modal without resetting the game
- **Loader:**
  - [ ] Implement a `Loader` component that displays while the game data is being loaded from the API.
