import { server } from './app'

server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("HTTP server running!");
});
