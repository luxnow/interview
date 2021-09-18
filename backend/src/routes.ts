import Router from '@koa/router';
import * as controllers from './controllers';

const router = new Router({
  prefix: '/api'
});

for (const controller of Object.values(controllers)) {
  controller(router);
}

export default [
  router.middleware(),
  router.allowedMethods({ throw: true })
]
