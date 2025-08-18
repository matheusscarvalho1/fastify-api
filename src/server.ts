import { server } from './app'


// Na maioria das plataformas de deploy gerenciado, precisam dessa instrução 'host: '0.0.0.0''
server.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
  console.log("HTTP server running!");
});
