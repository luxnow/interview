import Server from './server';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors';
import routers from './routes'

export default async function startServer(): Promise<Server> {
  const server = new Server({});

  server.use(cors());

  server.use(bodyParser({
    enableTypes: [
      'json',
      'form',
      'text',
    ]
  }));

  server.use(...routers);

  return server;
}

