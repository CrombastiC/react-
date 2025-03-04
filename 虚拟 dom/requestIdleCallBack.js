const ImmediatePriority = 1;// 立即执行 级别最高 点击事件 输入框
const UserBlockingPriority = 2;// 用户交互 滚动 拖拽
const NormalPriority = 3;// 正常 render 列表 动画 网络请求
const LowPriority = 4;// 低优先级 分析统计
const IdlePriority = 5;// 空闲 console.log


function getcurrentTime() {
  return performance.now();
}
class SimpleScheduler {
  constructor() {
    /**
     * 任务队列
     * callback 回调函数
     * priorityLevel 优先级
     * expirationTime 过期时间
     */
    this.taskQueue = [];
    this.isPerformingWork = false;//是否正在执行任务
    const channel = new MessageChannel();
    this.port = channel.port2;//发送端
    channel.port1.onmessage = this.performWorkUntilDeadline.bind(this);//接收端
  }
  /**
   * 
   * @param {优先级} priorityLevel 
   * @param {回调函数} callback 
   */
  scheduleCallback(priorityLevel, callback) {
    const currentTime = getcurrentTime();
    let timeout;
    //根据优先级设置超时时间
    //超时时间越短 优先级越高
    switch (priorityLevel) {
      case ImmediatePriority:
        timeout = -1;
        break;
      case UserBlockingPriority:
        timeout = 250;
        break;
      case LowPriority:
        timeout = 10000;
        break;
      case IdlePriority:
        timeout = 1073741823;//32位系统最大值
        break;
      case NormalPriority:
      default:
        timeout = 5000;
        break;
    }
    const task = {
      callback,
      priorityLevel,
      expirationTime: currentTime + timeout
    }
    this.push(this.taskQueue, task);
    this.schedulePerformWorkUntilDeadline();
  }
  schedulePerformWorkUntilDeadline() {
    if (!this.isPerformingWork) {
      this.isPerformingWork = true;
      this.port.postMessage(null);//发送消息
    }

  }
  performWorkUntilDeadline() {
    this.isPerformingWork = true;
    this.workLoop();
    this.isPerformingWork = false;
  }
  workLoop() {
    let currentTask = this.peek(this.taskQueue);
    while (currentTask) {
      let cb = currentTask.callback;
      cb && cb();
      this.pop(this.taskQueue);
      currentTask = this.peek(this.taskQueue);
    }
  }
  push(queue, task) {
    queue.push(task);
    queue.sort((a, b) => a.expirationTime - b.expirationTime);//从小到大排序
  }
  peek(queue) {
    return queue[0] || null;

  }
  pop(queue) {
    return queue.shift();
  }
}

const s = new SimpleScheduler();
s.scheduleCallback(UserBlockingPriority, () => {
  console.log('3')
  });
s.scheduleCallback(ImmediatePriority, () => {
console.log('2')
});


