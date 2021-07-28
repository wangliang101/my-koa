// https://zhuanlan.zhihu.com/p/280813365
// https://github.com/dennis-jiang/Front-End-Knowledges/blob/master/Examples/Node.js/KoaCore/index.js
const Koa = require('koa')
const app = new Koa;

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

app.use((ctx) => {
  ctx.body = 'Hello World'
})

const port = 3000;
app.listen(port, () => {
  console.log(`server is running on http://127.0.0.1:${port}`)
})