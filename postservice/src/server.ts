import { createConnection } from "typeorm";
import Redis from "ioredis";
import createApp from "./app";
import { DB_OPTION, REDIS_SETTING, PORT } from "./config";

const main = async () => {
  try {
    const connection = await createConnection();
    console.log(connection.name);
    console.log(DB_OPTION);
    await connection.runMigrations();
    const redisClient = new Redis(REDIS_SETTING);
    const app = createApp(redisClient);
    app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

main().catch(console.error);
