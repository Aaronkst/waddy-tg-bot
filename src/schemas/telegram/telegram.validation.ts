import { FastifySchema } from "fastify";

export type SetWebhookT = {
  webhook: string;
};

export const setWebhookValidator: FastifySchema["body"] = {
  type: "object",
  properties: {
    webhook: { type: "string" },
  },
};
