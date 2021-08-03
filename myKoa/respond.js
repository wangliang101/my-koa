module.exports = function respond (ctx) {
  const res = ctx.res;   //取出res对象
  const body = res.body; //取出body

  return res.end(body) // 用res返回body
}