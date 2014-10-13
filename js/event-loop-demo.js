// JS本身是一个单线程的语言，为了保证异步的调用，JS解释器引擎内部会维护一个栈，
// 只要栈内还有任务执行，就会先执行栈内任务，等到栈内任务结束后再检查消息队列（
// 任务队列，事件队列）并执行对应的回调

// !node event-loop-demo.js
(function (global) {
    var fn = function (msg) {
        console.time(msg)
        return function () {
          console.timeEnd(msg)
        }
    }
    var MSG = "GLOBAL"
    console.time(MSG)
    setTimeout(fn("我先执行"), 0)
    setTimeout(fn("我后执行"), 0)
    process.nextTick(fn("我虽然在第三个，但是第一个执行"))
    process.nextTick(fn("我虽然在第四个，但是第二个执行"))
    console.timeEnd(MSG)
}(this));

