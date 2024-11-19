// https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/#serialization

import { FastifySchema } from "fastify";

export const responseSerialization = (
  dataKeyName: string,
  type?: string,
): FastifySchema["response"] => {
  return {
    default: {
      type: "object",
      properties: {
        code: { type: "number" },
        message: { type: "string" },
      },
      required: ["message"],
    },
    "2xx": {
      type: "object",
      properties: {
        code: { type: "number", default: 200 },
        message: { type: "string", default: "success" },
        [dataKeyName]: {
          type: type || ["array", "object", "string", "number"],
        },
        count: { type: "number" },
      },
      required: [dataKeyName],
    },
  };
};
