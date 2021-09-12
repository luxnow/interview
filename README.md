# egg-vue-typescript boilerplate

Single Page Application Isomorphic Example for Egg + Vue, Front-End and Node of The Application are Written in TypeScript.

## Document

- https://easyjs.cn


## QuickStart

- Development
  
  run following db scipt ,then change dialect string at config.default.ts

  CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL COMMENT '用户名',
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


```bash
$ npm install -g easywebpack-cli
$ easy init
$ npm install
$ npm run dev
$ open http://localhost:7001
```

- Test

```bash
$ npm run test

```
- Publish

```bash
npm run tsc
npm run build
npm start
```



## License

[MIT](LICENSE)
