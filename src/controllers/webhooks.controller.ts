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
        text: "မင်္ဂလာပါလူကြီးမင်း။ ယနေ့ဘယ်လိုဝန်ဆောင်မှုများလိုအပ်ပါသလဲရှင့်။",
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
            const stream = response.data; // Ensure response.data is the stream
            let text = ""; // Initialize text as an empty string
            let buffer = ""; // Buffer to accumulate data chunks

            stream.on("data", (chunk: Buffer) => {
              // Convert chunk to string
              buffer += chunk.toString();

              // Process each complete message in the buffer
              let messages = buffer.split("\n\n"); // Assuming `\n\n` separates messages
              buffer = messages.pop()!; // Retain the last incomplete message in the buffer

              messages.forEach((message) => {
                if (!message || message === "undefined") return;

                // Process the clean message
                const cleanData = message.replace("data: ", "");
                req.log.info("Received data from Waddy: " + cleanData);
                text += cleanData;
              });
            });

            stream.on("end", () => {
              resolve(text);
            });

            stream.on("error", (err: Error) => {
              req.log.error("Stream error:", err); // Log stream errors
              reject(err); // Reject the promise on error
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
