import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

export const routes = async (server: FastifyInstance, options: {}) => {
  server.get("/", (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Hello World");
  });
};
