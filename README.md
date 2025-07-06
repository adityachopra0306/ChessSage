# ChessSage: AI-powered Chess Analysis Engine

![status](https://img.shields.io/badge/status-Partially--Deployed-DAA520)
![frontend](https://img.shields.io/badge/Frontend-React.js-blue)
![build](https://img.shields.io/badge/Build-Vite-purple)
![styling](https://img.shields.io/badge/Styling-TailwindCSS-38b2ac)
![license](https://img.shields.io/badge/license-MIT-brightgreen)


This project provides a comprehensive analytics platform for Chess.com users. By entering a Chess.com profile, users receive detailed insights about their playing history, performance trends, and personalized recommendations powered by Stockfish analysis and Gemini NLP summarization.

---

## Status
Website deployed [here](https://chess-sage-neon.vercel.app) through Vercel.
> **Note:** The backend is currently under deployment, see [ChessSage-Backend GitHub](https://github.com/adityachopra0306/ChessSage-backend).  
> However, the repository contains a [Jupyter notebook](notebook/backend.ipynb) with the working backend code, demonstrating the entire analysis pipeline.

---

## Tech Stack

- **Frontend**: React.js, Vite, TailwindCSS
- **Backend** (external): FastAPI, Stockfish, Gemini API

---

## Features and Program Flow

### 1. User Profile Input
- Chess.com profile name
- Stockfish analysis depth (default: 12)
- Optional custom Gemini API key for NLP
- Gemini answer customization:
  - Tone
  - Answer length

---

### 2. Basic User Details View
After retrieving the user's Chess.com data:
- Profile metadata:
  - Name
  - Country
  - Profile URL
- Game history:
  - Total number of games played
  - Win/loss ratio
  - Frequency of playing as white vs black
  - Leading causes of losses per game mode
  - Tactics/puzzle rating
- Per game mode stats:
  - Number of games
  - Win/loss ratio as white and black
  - First game: date and starting rating
  - Latest game: date and current rating
  - Best game: date and rating at that time
  - Option for detailed analysis if more than 20 games are played
- Gemini API generates a natural language summary of these stats.

---

### 3. Game-mode Detailed Stats
Available upon user request for any game mode:
- All basic details above
- Top openings played as white and black
- Win/loss ratio per opening
- Average opponent rating per opening
- Loss reasons breakdown (time, resignation, checkmate)
- Progression charts:
  - Rating progression over time
  - Accuracy progression over time
  - Win rate progression over time
  - (Planned) Opening-specific improvement trends
- Option to initiate a detailed analysis of the last 10 losses
- Gemini API produces a natural language summary of these detailed stats.

---

### 4. Detailed Game Analysis
Focuses on the user’s last 10 losses:
- For each game:
  - Metadata:
    - Opponent name
    - Opponent rating
    - Date
    - Move count
    - Loss reason
  - Game PGN with annotations:
    - Blunders/mistakes/inaccuracies
    - Stockfish eval ratings for moves
    - Eval graph
  - Explanation of mistakes:
    - Best moves suggested
    - Reasons for errors
  - Opening details and accuracy
  - Time-per-move analysis
  - Mistake/blunder counts by game phase (opening, middlegame, endgame)
- Mistakes per phase
- Gemini API produces summaries for individual losses and patterns across all losses.

---

## Requirements

To run this frontend locally, you need:

- **Node.js** (version 18 or higher recommended)
- **npm** or **yarn** package manager

### Key Technologies Used

- **React.js** – Frontend framework
- **Vite** – Development bundler and build tool
- **TailwindCSS** – Utility-first CSS framework
- **Axios** – For making API requests to the backend
- **Recharts** – For visualizing analytics

---

## Installation

```bash
# Clone the repository
git clone https://github.com/adityachopra0306/ChessSage.git
cd ChessSage

# Install dependencies
npm install

# Run the dev server
npm run dev
```

## Planned Features

- Opening-specific win/loss progression over time
- Additional NLP-powered coaching recommendations
- User Auth and Account Management
- Cloud-based analysis queues for large-scale analysis

---

## License

This project is licensed under the MIT License. See the [License File](./LICENSE) for details.
