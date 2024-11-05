import OpenAI from "openai";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

interface IBody {
  message: string;
}

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_API_KEY,
  organization: process.env.OPEN_AI_ORGANIZATION_ID,
});

// This is the only model which i allow for default-project
const model = "gpt-4o-mini";

export const routes = async (server: FastifyInstance, options: {}) => {
  server.post(
    "/",
    async (request: FastifyRequest<{ Body: IBody }>, reply: FastifyReply) => {
      try {
        const { message } = request.body;
        // Send request to OpenAI API
        const completion = await openai.chat.completions.create({
          model,
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            {
              role: "user",
              content: message,
            },
          ],
        });
        // Send back the generated text to the client
        return reply.send(completion.choices[0].message.content);
      } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Something went wrong" });
      }
    }
  );

  server.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send({ message: "Hello World" });
  });
};
