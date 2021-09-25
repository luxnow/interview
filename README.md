# 爆爆奢技术面试题

请 Fork 本项目，按以下要求完成项目后提交 Pull request。
请勿发送 zip 包。

## 项目内容

### 用户故事

1. 用户可以在网站上注册和登录。注册和登录时，只需填写昵称即可。
2. 用户可以修改自己的昵称，但不能跟其它人的昵称重复。

### 基本要求

1. 前端须使用 React 或 Vue 开发。
2. 后端须使用 Node.js 开发。为简化代码，请使用一个内存对象存储所有用户。不要使用数据库。
===>>> 后端使用 vercel的 [serverless](https://vercel.com/docs/concepts/functions/introduction) 服务, 之前没用过，初次使用, 代码在 `/api` 目录下。
可能serverless服务会被杀掉，所以使用MongoDB。

3. 须使用 Typescript 语言。
4. 须有单元测试。
===>> 使用http请求服务的模式测试， 由于本地连接到mongodb.com提供的免费mongodb测试实例比较慢，开发测试都比较麻烦。可以后续本地启动mongodb数据库来加快开发测试。

5. 不要拷贝自己或公司项目并在其上修改。
6. 请仔细审题，不要添加无关本面试题的代码，也不要忽略要求的功能。
7. README.md 须说明项目的启动方式及自动化测试方式。
8. 如使用了脚手架创建工程，请在 README 中说明。
===>> 前端使用了使用[vitesse](https://github.com/antfu/vitesse)，基本上是vue3业界的最佳实践的脚手架

### 进阶要求

- 前端界面自适应屏幕大小。
===>>> 使用tailwindcss自适应类 <https://tailwindcss.com/docs/responsive-design>
- 添加编辑器配置文件以方便开发。
===>>> 脚手架已自带，在我自己实践的项目中有做了其他一些进一步的改进优化(不仅是编辑器配置包括项目及开发的便利性、优雅性等），没有放在此代码中。可具体讨论代码分享

- 其它能体现您的技术水平的特点。
===>>>

1. 使用 vercel 服务前端及 serverless 函数
2. vitesse项目脚手架的深入理解及实践，已有实践上线项目
3. 熟悉tailwindcss写法
4. 成熟的 CI/CD 流程，及实际线上项目配置切换逻辑
5. 其他更多可以进一步讨论

## 如何使用

可以直接看在线版本： <https://luxnow-test-pied.vercel.app/>

```zsh
npm i -g pnpm # 使用 pnpm
pnpm i -g vercel # 添加 vercel cli
pnpm i # 安装项目依赖
vercel # 初始化 vercel 项目关联
vercel dev # api 项目本地运行
pnpm dev:vite # 本地运行前端
vercel --prod # 发布到 vercel 平台
pnpm test # 自动化测试 rest api
```

## 使用逻辑

1. 注册：填写 `user name` 点击 `Sign Up`
1. 登录：填写 `user name` 点击 `Login`
2. 更名：填写 `user name` 点击 `Update Name`

## 其他

今天第一次使用vercel的serverless，额外耗费了一些时间。
