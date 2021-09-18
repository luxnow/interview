import Koa from 'koa';
import Router from '@koa/router';

export default class Server {
  app: Koa;
  start: () => void;
  terminate: () => void;
  use: (...middleware: (Koa.Middleware|Router.Middleware)[]) => Server;

  constructor(options: {
    port?: number;
    hostname?: string;
    logger?: Console;
  }) {
    const { port = 80, hostname = 'localhost', logger = console } = options || {}

    this.app = new Koa()

    process
      .on('warning', (warning) => {
        logger.warn('warning', warning.message || warning)
      })
      .on('exit', (code) => {
        logger.info('exit:', code)
      })
      .on('uncaughtException', (error: Error & { code: number }) => {
        logger.error('uncaughtException', error)
        process.emit('exit', error.code || 1)
      })
      .on('unhandledRejection', (reason, promise) => {
        promise.catch((error) => {
          logger.error('unhandledRejection', error)
        })
        process.emit('warning', new Error(JSON.stringify(reason)))
      })

    this.start = () => {
      this.app.listen(port, hostname, () => {
        logger.log(`start successfully at ===> ${hostname}:${port}`)
      })
    }

    this.terminate = () => {
      process.emit('exit', 0)
    }

    this.use = (...middlewares) => {
      for (const middleware of middlewares) {
        this.app.use(middleware)
      }

      return this
    }
  }
}
