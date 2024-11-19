import { FastifyInstance } from "fastify";
import { responseSerialization } from "@/schemas/response.serialization";
import { setWebhookValidator } from "@/schemas/telegram/telegram.validation";
import { setWebhook, whoami } from "@/controllers/telegram.controller";

export const telegramRoute = async (fastify: FastifyInstance) => {
  fastify.get("/whoami", whoami);
  fastify.post(
    "/set-webhook",
    {
      schema: {
        body: setWebhookValidator,
        response: responseSerialization("response", "boolean"),
      },
    },
    setWebhook,
  );
};
