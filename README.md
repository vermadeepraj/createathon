

# **CREATEATHONE - Code Challenge Platform **  

An interactive learning platform where users can participate in coding and knowledge challenges, with seamless integration between a web interface. The platform will focus on delivering learning content, tracking progress, and fostering community engagement.
A web application where users can discover, attempt, and track progress on coding challenges of varying difficulty levels.

## Features

- **User Authentication**: Register and login to track your progress
- **Challenge Discovery**: Browse challenges by category and difficulty level
- **Challenge Details**: View comprehensive information about each challenge
- **Progress Tracking**: Track completion of individual tasks within challenges
- **Leaderboard**: View top performers and their rankings
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

This project is built with modern web technologies:

- **React** - UI library
- **TypeScript** - Type safety
- **Vite** - Fast build tool and development server
- **React Router** - Navigation and routing
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - UI component library
- **Recharts** - Charting library for data visualization

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd code-challenge-platform
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```sh
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:8080
   ```

## Project Structure

```
├── public/             # Static assets
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── auth/       # Authentication components
│   │   ├── challenge/  # Challenge-related components
│   │   └── ui/         # UI components and layout
│   ├── hooks/          # Custom React hooks
│   ├── lib/            # Utility functions
│   ├── pages/          # Page components
│   ├── App.tsx         # Main application component
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
└── README.md           # Project documentation
```

## Usage

### Authentication

- Use the demo account:
  - Email: demo@example.com
  - Password: password

Or create a new account by registering.

### Exploring Challenges

1. Navigate to the Challenges page
2. Browse challenges by category or difficulty
3. Click on a challenge to view details
4. Track your progress by completing tasks 

## **Deployment Link**
https://createathon.vercel.app/
