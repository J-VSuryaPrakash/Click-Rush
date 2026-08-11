import {
    date,
    index,
    integer,
    pgTable,
    text,
    timestamp,
    unique,
    uuid,
    varchar,
} from "drizzle-orm/pg-core";

import { relations } from "drizzle-orm/_relations";

/* USERS */

export const users = pgTable("users",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        username: varchar("username", { length: 30 }).notNull(),
        email: varchar("email", { length: 255 }).notNull(),
        passwordHash: varchar("password_hash", { length: 255 }).notNull(),
        bestScore: integer("best_score").notNull().default(0),
        bestScoreAt: timestamp("best_score_at", {
            withTimezone: true,
        }),
        refreshToken: text("refresh_token"),
        createdAt: timestamp("created_at", {
            withTimezone: true,
        }).defaultNow().notNull(),
    },
    (table) => [
        unique("users_email_unique").on(table.email)
    ]
);


/* GAME SESSIONS */

export const gameSessions = pgTable("game_sessions",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
            }),
        score: integer("score").notNull(),
        startedAt: timestamp("started_at", {
            withTimezone: true,
        }).notNull(),
        endedAt: timestamp("ended_at", {
            withTimezone: true,
        }).notNull(),
    }
);


/* DAILY LEADERBOARD */

export const dailyLeaderboards = pgTable("daily_leaderboards",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
            }),
        leaderboardDate: date("leaderboard_date").notNull(),
        score: integer("score").notNull(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        }).defaultNow().notNull(),
    },
    (table) => [
        unique("daily_leaderboard_user_date_unique").on(
            table.userId,
            table.leaderboardDate
        )
    ]
);


/* WEEKLY LEADERBOARD */

export const weeklyLeaderboards = pgTable(
    "weekly_leaderboards",
    {
        id: uuid("id").defaultRandom().primaryKey(),
        userId: uuid("user_id")
            .notNull()
            .references(() => users.id, {
                onDelete: "cascade",
            }),
        weekStart: date("week_start").notNull(),
        score: integer("score").notNull(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
        }).defaultNow().notNull(),
    },
    (table) => [
        unique("weekly_leaderboard_user_week_unique").on(
            table.userId,
            table.weekStart
        )
    ]
);