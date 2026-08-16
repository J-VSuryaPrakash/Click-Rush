# ClickRush

ClickRush is a real-time browser-based clicking game where players have **60 seconds** to achieve the highest possible score.

Players can register and log in, start a game session, play the game, submit their score, and compete on daily and weekly leaderboards.

---

## Features

- User registration and login
- JWT-based authentication with refresh tokens
- Protected API routes
- 60-second game sessions
- Server-side game session tracking
- Score submission and validation
- Personal best score tracking
- Daily leaderboard
- Weekly leaderboard
- User game history
- User rank information
- Global leaderboard
- PostgreSQL database
- Drizzle ORM
- REST API

---

## Tech Stack

### Frontend

- React
- TypeScript
- TanStack Query
- Tailwind CSS

### Backend

- Node.js
- Express.js
- TypeScript
- Drizzle ORM
- PostgreSQL
- Zod
- JWT
- HTTP-only cookies

### Database

- PostgreSQL

---

## Project Architecture

```text
ClickRush
│
├── frontend/
│   └── React + TypeScript application
│
└── backend/
    ├── src/
    │   ├── modules/
    │   │   ├── auth/
    │   │   ├── game/
    │   │   ├── user/
    │   │   ├── dailyLeaderboard/
    │   │   └── weeklyLeaderboard/
    │   │
    │   ├── common/
    │   │   ├── db/
    │   │   ├── middleware/
    │   │   └── utils/
    │   │
    │   └── app.ts
    │
    └── drizzle/
```

---

# Game Flow

The basic ClickRush game flow is:

```text
User
 │
 ├── Register / Login
 │
 ├── Start Game
 │      │
 │      └── Backend creates game session
 │
 ├── Play for 60 seconds
 │
 ├── Game Ends
 │
 ├── Submit Score
 │      │
 │      ├── Validate game session
 │      ├── Validate score
 │      ├── Complete game
 │      ├── Update personal best
 │      ├── Update daily leaderboard
 │      └── Update weekly leaderboard
 │
 └── View Results / Leaderboards
```

The backend is responsible for maintaining the game session and determining whether the session is still valid.

---

# Database Schema

ClickRush currently uses five main database concepts:

1. Users
2. Game Sessions
3. Daily Leaderboards
4. Weekly Leaderboards

---

## Users

The `users` table stores account information and the player's personal best score.

Important fields:

| Field | Description |
|---|---|
| `id` | Unique user ID |
| `username` | Player username |
| `email` | Unique email address |
| `passwordHash` | Hashed password |
| `bestScore` | Player's highest score |
| `bestScoreAt` | Time when the best score was achieved |
| `refreshToken` | Refresh token used for authentication |
| `createdAt` | Account creation time |

---

## Game Sessions

The `game_sessions` table represents individual games played by users.

Each game session contains:

- User
- Game status
- Start time
- Expiration time
- End time
- Score

### Game Status

Game sessions can have one of three statuses:

```text
ACTIVE
COMPLETED
EXPIRED
```

### Example

When a player starts a game:

```text
status     = ACTIVE
startedAt  = current time
expiresAt  = current time + 60 seconds
score      = 0
```

After the player submits the score:

```text
status     = COMPLETED
endedAt    = current time
score      = submitted score
```

If the session expires without being completed:

```text
status = EXPIRED
```

---

# Leaderboards

ClickRush supports two leaderboard periods.

## Daily Leaderboard

The daily leaderboard stores the best score achieved by each user for a particular date.

The combination of:

```text
userId + leaderboardDate
```

is unique.

This means one user has only one daily leaderboard record per day.

Example:

```text
User A
2026-08-16 → 150
```

If the same user later achieves:

```text
200
```

the daily leaderboard record can be updated to:

```text
User A
2026-08-16 → 200
```

---

## Weekly Leaderboard

The weekly leaderboard works similarly but uses the start date of the week.

The combination of:

```text
userId + weekStart
```

is unique.

Example:

```text
User A
Week starting 2026-08-10 → 850
```

---

# API

Base API path:

```text
/api
```

---

# Authentication API

Authentication endpoints are available under:

```text
/api/auth
```

## Register

```http
POST /api/auth/register
```

Creates a new user account.

### Middleware

```text
validate(RegisterDTO)
```

---

## Login

```http
POST /api/auth/login
```

Authenticates an existing user.

### Middleware

```text
validate(LoginDTO)
```

---

## Logout

```http
POST /api/auth/logout
```

Logs out the currently authenticated user.

### Middleware

```text
authMiddleware
```

---

## Refresh Token

```http
POST /api/auth/tokenrefresh
```

Creates a new access token using the refresh token.

---

## Current User

```http
GET /api/auth/me
```

Returns information about the currently authenticated user.

### Middleware

```text
authMiddleware
```

---

# Game API

Game endpoints are available under:

```text
/api/game
```

---

## Start Game

```http
POST /api/game/games/start
```

Creates a new game session.

### Middleware

```text
authMiddleware
```

The backend creates a game session with:

```text
status    = ACTIVE
score     = 0
startedAt = current time
expiresAt = current time + 60 seconds
```

The returned game ID is used when completing the game.

---

## Complete Game

```http
POST /api/game/games/:gameId/complete
```

Submits the player's final score.

### Middleware

```text
authMiddleware
validate(ScoreDTO)
```

The backend should verify:

1. The user is authenticated.
2. The game belongs to the authenticated user.
3. The game exists.
4. The game is still active.
5. The game has not already been completed.
6. The submitted score is valid.
7. The game has not exceeded its expiration time.

After successful completion, the game session is marked as:

```text
COMPLETED
```

---

# Daily Leaderboard API

Daily leaderboard endpoints are available under:

```text
/api/daily
```

## Get Daily Leaders

```http
GET /api/daily/dailyleaders
```

Returns the leaderboard for the current day.

### Middleware

```text
authMiddleware
```

The leaderboard can calculate player ranks dynamically using PostgreSQL window functions.

Example:

```text
Rank | Username | Score
-----------------------
1    | Player A | 250
2    | Player B | 220
3    | Player C | 190
```

---

# Weekly Leaderboard API

Weekly leaderboard endpoints are available under:

```text
/api/weekly
```

## Get Weekly Leaders

```http
GET /api/weekly/weeklyleaders
```

Returns the leaderboard for the current week.

### Middleware

```text
authMiddleware
```

The weekly leaderboard uses `weekStart` to determine which leaderboard period a record belongs to.

---

# User API

User endpoints are available under:

```text
/api/user
```

All user endpoints require authentication.

---

## Get User

```http
GET /api/user
```

Returns the authenticated user's information.

---

## Game History

```http
GET /api/user/history
```

Returns the user's previous game sessions.

This can be used to display:

- Previous scores
- Game dates
- Game status
- Game duration
- Completed/expired games

---

## User Ranks

```http
GET /api/user/ranks
```

Returns the authenticated user's leaderboard rankings.

This can contain information such as:

```text
Daily Rank
Weekly Rank
Best Score
```

---

## Global Leaders

```http
GET /api/user/leaders
```

Returns global leaderboard information.

---

# Authentication Flow

ClickRush uses access and refresh token authentication.

The general flow is:

```text
Login
  │
  ├── Access Token
  │
  └── Refresh Token
          │
          └── HTTP-only Cookie
```

Protected requests pass through:

```text
authMiddleware
```

If the access token expires, the frontend can request a new token through:

```http
POST /api/auth/tokenrefresh
```

The refresh token should remain inaccessible to client-side JavaScript when stored in an HTTP-only cookie.

---

# API Route Structure

The current Express route configuration is:

```ts
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/game/', gameRoutes);
app.use('/api/daily/', dailyLeaderRoutes);
app.use('/api/weekly', weeklyLeaderRoutes);
```

Resulting API structure:

```text
/api
│
├── auth
│   ├── POST   /register
│   ├── POST   /login
│   ├── POST   /logout
│   ├── POST   /tokenrefresh
│   └── GET    /me
│
├── user
│   ├── GET    /
│   ├── GET    /history
│   ├── GET    /ranks
│   └── GET    /leaders
│
├── game
│   ├── POST   /games/start
│   └── POST   /games/:gameId/complete
│
├── daily
│   └── GET    /dailyleaders
│
└── weekly
    └── GET    /weeklyleaders
```

---

# Leaderboard Ranking

Leaderboard ranks should be calculated on the server rather than stored permanently in the database.

PostgreSQL window functions can be used for this.

For example:

```sql
RANK() OVER (
    ORDER BY score DESC
)
```

This allows the leaderboard to dynamically calculate:

```text
1st
2nd
3rd
...
```

without storing a separate `rank` column.

This also means ranks automatically change when scores change.

---

# Game Session Design

A game session is intentionally stored on the backend.

Instead of trusting the frontend timer:

```text
Frontend Timer
       │
       │ 60 seconds
       ▼
Backend Game Session
       │
       ├── startedAt
       └── expiresAt
```

The backend can determine whether a submitted score belongs to a valid game session.

This prevents the frontend from being the only source of truth for game duration.

---

# Score Flow

When a player finishes a game:

```text
Player Score
     │
     ▼
POST /games/:gameId/complete
     │
     ▼
Validate Request
     │
     ▼
Validate Game Session
     │
     ▼
Complete Game
     │
     ├───────────────┐
     ▼               ▼
Update User       Update Leaderboards
Best Score        │
                  ├── Daily
                  └── Weekly
```

The user's `bestScore` should only be updated when the submitted score is greater than their existing personal best.

---

# Data Integrity

The database uses constraints to prevent duplicate leaderboard records.

### Daily

```text
UNIQUE(userId, leaderboardDate)
```

### Weekly

```text
UNIQUE(userId, weekStart)
```

This ensures that a user cannot have multiple leaderboard entries for the same period.

---

# Indexing

The game session table contains an index on:

```text
(status, expiresAt)
```

This is useful for operations that need to find active or expired games based on their expiration time.

```text
game_sessions_status_expires_at_idx
```

---

# Redis

Redis is **not currently required** for the core ClickRush implementation.

The current architecture uses PostgreSQL as the persistent source of truth for:

- Users
- Game sessions
- Scores
- Daily leaderboards
- Weekly leaderboards

Redis can be introduced later if ClickRush needs features such as:

- Distributed real-time game state
- High-frequency leaderboard updates
- Rate limiting
- Caching
- Multiple backend instances
- WebSocket state sharing
- Temporary game state

For the current version, keeping the architecture simple with PostgreSQL is intentional.

# Running the Project

## Backend

Install dependencies:

```bash
npm install
```

Configure environment variables:

```env
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
```

Run database migrations:

```bash
npx drizzle-kit migrate
```

Start the development server:

```bash
npm run dev
```

# Project Goal

The goal of ClickRush is to build a simple but production-oriented game backend that demonstrates how to handle:

- Authentication
- Protected APIs
- Game sessions
- Server-side validation
- Score persistence
- Leaderboards
- PostgreSQL
- ORM-based database access
- Client/server state synchronization
- Scalable backend architecture

The project is intentionally designed so that more advanced infrastructure can be introduced as the application's requirements grow.