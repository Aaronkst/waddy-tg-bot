import { FastifyInstance } from "fastify";
import { handleTelegramWebhook } from "@/controllers/webhooks.controller";

export const webhookRoute = async (fastify: FastifyInstance) => {
  fastify.post("/telegram", handleTelegramWebhook);
};
