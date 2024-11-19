import { FastifyRequest } from "fastify/types/request";
import { FastifyReply } from "fastify/types/reply";
import { TelegramUpdate } from "@/lib/types";

export const handleTelegramWebhook = async (
  req: FastifyRequest,
  res: FastifyReply,
) => {
  try {
    req.log.info("[TG/WEBHOOK]: " + JSON.stringify(req.body));
    const payload = req.body as TelegramUpdate;

    if (!payload.message.text) return res.status(200).send("Success");

    const { from, chat } = payload.message;

    if (payload.message.text === "/start") {
      await req.tgBot.post("/sendMessage", {
        chat_id: chat.id,
        text: "Hello",
      });
      return res.status(200).send("Success");
    }

    // use the `from` object for analytics and thread handling later
    const waddyResponse = await new Promise((resolve, reject) => {
      try {
        req.waddyApi
          .post(
            "/basic",
            {
              message: payload.message.text,
            },
            {
              responseType: "stream",
            },
          )
          .then((response) => {
            const stream = response.data;
            let text: string;

            stream.on("data", (data: string) => {
              if (data === "undefined") return;
              data = data.replace("data: ", "").replace("\n\n", "");
              text += data;
            });

            stream.on("end", () => {
              resolve(text);
            });
          });
      } catch (err: any) {
        req.log.error("[WADDY/ERROR]: " + err.message);
        reject(null);
      }
    });
    req.log.info("[GENERATED RESPONSE]: " + waddyResponse);

    await req.tgBot.post("/sendMessage", {
      chat_id: chat.id,
      text: waddyResponse,
    });

    return res.status(200).send("Success");
  } catch (err: any) {
    return res.status(500).send(err.message);
  } finally {
    // cleanup redis etc. if necessary
  }
};
