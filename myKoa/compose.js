function compose(middleWare){
  // 检查参数，middleWare必须是一个数组
  if(!Array.isArray(middleWare)){
    throw new TypeError('Middleware stack must be an array')
  }
  // 数组里的每一项必须是一个方法
  for(const fn of middleWare){
    if(typeof fn !== 'function'){
      throw new TypeError('Middleware must be composed of functions');
    }
  }
  // 返回一个方法，这个方法就是compose的结果
  //　外部可以通过调用这个方法来开启中间件的数组遍历
  //　参数形式和普通中间件一样，都是context和next
  return function(context, next){
    // 开始执行中间件，从数组第一个开始
    return dispatch(0);
    // 执行中间件方法
    function dispatch(i){
      // 取出需要执行的中间件
      let fn = middleWare(i);
      // 如果ｉ等于数组长度，说明数组执行完了
      if(i === middleWare.length){
        fn = next; //让Fn等于外部传进来的next;
      }
      // 如果没有外部传收尾的next,直接resolve
      if(!fn){
        return Promise.resolve()
      }
      // 执行中间件，注意传给中间件接收的参数应该是context和next
      // 传给中间件的next是dispatch.bind(null, i + 1)
      // 所以中间件里面调用next的时候其实调用的是dispatch(i + 1)，也就是执行下一个中间件
      try{
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)))
      }catch(err){
        return Promise.reject(err)
      }
    }
  }
}

module.exports = compose;
