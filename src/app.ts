import fastify, { FastifyInstance } from "fastify";
import * as dotenv from "dotenv";

// PLUGINS
import { fastifyCors } from "@fastify/cors";
import fastifyFormbody from "@fastify/formbody";
import { fastifyHelmet } from "@fastify/helmet";

// CUSTOM DECORATORS
import { initTgBot, initWaddyApi } from "@/decorators/api";

// ROUTES
import { homeRoute } from "@/routes/home.route";
import { telegramRoute } from "@/routes/telegram.route";
import { webhookRoute } from "@/routes/webhooks.route";

enum ENVS {
  LOCAL = ".env.local",
  STAGING = ".env.staging",
  PRODUCTION = ".env.production",
}

const getEnvFile = (): string => {
  switch (process.env.NODE_ENV) {
    case "staging":
      return ENVS.STAGING;
    default:
      return ENVS.LOCAL;
  }
};

const server = fastify({
  logger: true,
});

export const bootstrapServer = async (): Promise<FastifyInstance> => {
  try {
    server.log.info(`This is ${process.env.NODE_ENV || "local"} environment`);

    if (process.env.NODE_ENV !== "production") {
      const envFilePath = getEnvFile();

      dotenv.configDotenv({
        path: envFilePath,
      });
    }
    // database and other necessary services registration
    await server.register(fastifyHelmet);
    await server.register(fastifyCors, {
      allowedHeaders: [
        "Authorization",
        "X-Telegram-Bot-Api-Secret-Token",
        "X-Telegram-Bot-Api-Secret-Token".toLowerCase(),
      ],
    });
    await server.register(fastifyFormbody);

    await initTgBot(server);
    await initWaddyApi(server);

    // routes registration
    await server.register(homeRoute);
    await server.register(telegramRoute, { prefix: "/api/telegram" });
    await server.register(webhookRoute, { prefix: "/webhooks" });

    return server;
  } catch (err) {
    throw err;
  }
};
