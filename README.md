# ChessSage: AI-powered Chess Analysis Engine

## Overview

This project provides a comprehensive analytics platform for Chess.com users. By entering a Chess.com profile, users receive detailed insights about their playing history, performance trends, and personalized recommendations powered by Stockfish analysis and Gemini NLP summarization.

---

## Status
Website deployed [here](https://chess-sage-neon.vercel.app) through Vercel.
> **Note:** The backend is currently under deployment, see [ChessSage-Backend GitHub](https://github.com/adityachopra0306/ChessSage-backend).  
> However, the repository contains a [Jupyter notebook](notebook/backend.ipynb) with the working backend code, demonstrating the entire analysis pipeline.

---

## Features and Program Flow

### 1. User Profile Input
- Chess.com profile name
- Stockfish analysis depth (default: 12)
- Optional custom Gemini API key for NLP
- Gemini answer customization:
  - Tone
  - Answer length
- If no custom key is provided, a random key is used.

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
  - Mistake/blunder count by game phase (opening, middlegame, endgame)
- Mistakes per phase
- Gemini API produces summaries for individual losses and patterns across all losses.

---

## System Architecture

- **Frontend**
  - User input forms
  - Data visualization (charts, heatmaps, eval graphs)
  - Interactive exploration of stats
- **Backend**
  - Chess.com API integration
  - Stockfish integration for analysis
  - Gemini NLP API for summaries
  - Data processing and storage
- **Analytics**
  - Win/loss pattern detection
  - Opening-specific performance trends
  - Blunder heatmaps
  - Evaluation progression

---

## Requirements

- Python 3.8+
- Stockfish engine (configurable depth)
- Access to Gemini NLP API (custom or default keys)
- Libraries:
  - React.js + Vite + TailwindCSS (Frontend)
  - requests (for Chess.com API)
  - stockfish, python-chess (for engine analysis)
  - pandas, numpy (for data processing)
  - fastapi (Backend)

---

## Planned Features

- Opening-specific win/loss progression over time
- Additional NLP-powered coaching recommendations
- Multi-user support with account management
- Cloud-based analysis queues for large-scale analysis

---

## License

This project is licensed under the MIT License.
