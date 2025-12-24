import fastify from "fastify";
import { fastifySwagger } from "@fastify/swagger";

import {
  validatorCompiler,
  serializerCompiler,
  type ZodTypeProvider,
  jsonSchemaTransform,
} from "fastify-type-provider-zod";

import { coursesRoutes } from "./routes/courses/routes";
import { authRoutes } from "./routes/login/routes";


import scalarAPIReference from "@scalar/fastify-api-reference";
import fastifySwaggerUi from "@fastify/swagger-ui";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
      options: {
        translateTime: "HH:MM:ss Z",
        ignore: "pid,hostname,reqId",
      },
    },
  },
}).withTypeProvider<ZodTypeProvider>();

if (process.env.NODE_ENV === "development") {
  server.register(fastifySwagger, {
    openapi: {
      info: {
        title: "APIs Fastify",
        version: "1.0.0",
      },
    },
    transform: jsonSchemaTransform,
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/docs",
    uiConfig: {
      docExpansion: "full",
      deepLinking: false,
    },
    staticCSP: true,
    transformStaticCSP: (header) => header,
  });

  // server.register(scalarAPIReference, {
  //   routePrefix: '/docs',
  //   configuration: {
  //     theme: 'kepler',
  //   }
  // })
}

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.get("/", (request, reply) => {
  return reply.send({ message: "Hello World!" });
});

server.register(coursesRoutes);
server.register(authRoutes);

export { server }
