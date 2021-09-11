
import * as Koa from 'koa';
import router from './router';

const port: number = 3001

const app = new Koa();
app.use(router.routes());

app.listen(port, () => {
    console.log(`Your app running on http://localhost:${port}`)
})