import { FastifyInstance } from "fastify";
import { home } from "@/controllers/home.controller";

export const homeRoute = async (fastify: FastifyInstance) => {
  fastify.get("/", home);
};
