const Emitter = require('events')

module.export = class Applicttion extends Emitter {
  constructor(){
    super();

    //middleWare初始化一个数组，用来存储后续可能的中间件
    this.middleWare = [];
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
}