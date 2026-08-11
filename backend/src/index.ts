import 'dotenv/config';
import { app } from './app.js';
import { connectDB } from './common/db/index.js';


async function startServer() {
    await connectDB();
    app.listen(process.env.PORT, () => {
        console.log(`Server is running: http://localhost:${process.env.PORT}`);
    })
}

startServer()
    .catch((err) => {
        console.log('Erro: ', err);
        process.exit(1);
    })