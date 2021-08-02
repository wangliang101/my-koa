const Emitter = require('events');
const compose = require('./compose');
const context = require('./context');

module.export = class Applicttion extends Emitter {
  constructor(){
    super();

    //middleWare初始化一个数组，用来存储后续可能的中间件
    this.middleWare = [];
    this.context = context;
  }

  use(fn){
    // 中间件必须是函数，否则就报错
    if(typeof fn !== 'function'){
      throw new TypeError('middleware must be a function')
    }
　　// 直接把函数放到middleware数组
　　this.middleWare.push(fn);
   // 类实例方法返回this可以实现链式调用
   return this;
  }

  createContext(req, res){
    const context = Object.create(this.context);
    context.app = this;
    context.req = req;
    context.res = res;

    return context;
  }

  listen(...args){
    const server = http.createServer(this.callback());
    return server.listen(...args)
  }

  callback(){
    const fn = compose(this.middleWare)
    // callback的返回值必须符合http.createServer参数形式
    //　即　(req, res) => {}
    const handleRequest = (req, res) => {
      const ctx = this.createContext(req, res);
      return this.handleRequest(ctx, fn)
    }
    return handleRequest;
  }
}