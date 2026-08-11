import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({ connectionString: process.env.DATABASE_URL! });

async function connectDB() {
    try {
        const client = await pool.connect();
        console.log('Database Connected Successfully.')
        client.release()
    }
    catch (error) {
        console.error('Error connecting to the database:', error);
        process.exit(1);
    }
}

const db = drizzle({ client: pool });

export { db, connectDB };

