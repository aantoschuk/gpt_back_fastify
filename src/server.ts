import "dotenv/config";

import Fastify from "fastify";

import { routes } from "./routes";

const fastify = Fastify({
  logger: true,
});

fastify.register(routes);

const start = async () => {
  try {
    await fastify.listen({ port: 3001, host: "0.0.0.0" });
    // console.log(process.env.OPEN_AI_API_KEY);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
