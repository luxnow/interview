import Vue from 'vue';

export default class App {
  config: any;
  constructor(config) {
    this.config = config;
  }

  bootstrap() {
    if (EASY_ENV_IS_NODE) {
      return this.server();
    }
    return this.client();
  }

  create(initState) {
    const { entry, createRouter } = this.config;
    const router = createRouter();
    return {
      router,
      render: h => { // not use ...entry, why ?
        return h(entry);
      },
    };
  }

  fetch(vm): Promise<any> {
    const { router } = vm;
    const matchedComponents = router.getMatchedComponents();
    if (!matchedComponents) {
      return Promise.reject('No Match Component');
    }
    return Promise.all(
      matchedComponents.map((component: any) => {
        const options = component.options;
        return null;
      })
    );
  }

  client() {
    Vue.prototype.$http = require('axios');
    const vm = this.create(window.__INITIAL_STATE__);
    vm.router.afterEach(() => {
      this.fetch(vm);
    });
    const app = new Vue(vm);
    app.$mount('#app');
    return app;
  }

  server() {
    return context => {
      const vm = this.create(context.state);
      const { router } = vm;
      router.push(context.state.url);
      return new Promise((resolve, reject) => {
        router.onReady(() => {
          this.fetch(vm).then(() => {
            return resolve(new Vue(vm));
          });
        });
      });
    };
  }
}