import fastify from "fastify";

declare module 'fastify' {
 // Adiciona essas tipagens no FastifyRequest
 export interface FastifyRequest {
  user?: {
   sub:string
   role: 'student' | 'manager'
  }
 }
}