import axios, { AxiosInstance } from "axios";
import { FastifyInstance } from "fastify";

declare module "fastify" {
  interface FastifyInstance {
    tgBot: AxiosInstance;
    waddyApi: AxiosInstance;
  }

  interface FastifyRequest {
    tgBot: AxiosInstance;
    waddyApi: AxiosInstance;
  }
}

export const initTgBot = async (fastify: FastifyInstance) => {
  const tgBot = axios.create({
    baseURL:
      process.env.TELEGRAM_BASE_URL + "/bot" + process.env.TELEGRAM_BOT_TOKEN,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });
  fastify.decorateRequest("tgBot", tgBot);
  fastify.decorate("tgBot", tgBot);
};

export const initWaddyApi = async (fastify: FastifyInstance) => {
  const waddyApi = axios.create({
    baseURL: process.env.WADDY_BASE_URL,
    timeout: 3000,
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*", // waddy returns `text/event-stream` but we'll accept all for now
      // "X-Api-Key": "uuid4"
    },
  });
  fastify.decorateRequest("waddyApi", waddyApi);
  fastify.decorate("waddyApi", waddyApi);
};
