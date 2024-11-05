import Fastify from "fastify";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", (request, reply) => {
  reply.send({ message: "Hello World from Fastify" });
});

fastify.listen({ port: 3001 }, function (error, address) {
  if (error) {
    fastify.log.error(error);
    process.exit(1);
  }
});
