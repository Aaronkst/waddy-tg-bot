import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import type { SetWebhookT } from "@/schemas/telegram/telegram.validation";

export const whoami = async (req: FastifyRequest, res: FastifyReply) => {
  const me = await req.tgBot.get("/getMe");
  return res.code(200).send(me.data);
};

export const setWebhook = async (req: FastifyRequest, res: FastifyReply) => {
  try {
    const { webhook } = req.body as SetWebhookT;
    const _setWebhook = await req.tgBot.post("/setWebhook", {
      url: webhook,
    });
    return res.code(200).send({
      response: _setWebhook.data.ok,
      message: _setWebhook.data.description,
    });
  } catch (err) {
    console.log(err);
  }
};
