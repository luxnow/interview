import startServer from '../src/app';
import helpers from './helpers';

before(async () => {
  const dispatcher = await startServer().then((server) => server.app.callback());

  helpers({ dispatcher });
})
