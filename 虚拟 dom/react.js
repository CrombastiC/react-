// jsx->babel/swc->React.createElement
const React = {
  createElement(type, props, ...children) {
    return {
      type,
      props: {
        ...props,
        children: children.map((child) => {
          if (typeof child === 'object') {
            return child;
          } else {
            return this.createTextElement(child)
          }
        })
      }
    }
  },
  createTextElement(text) {
    return {
      type: 'TEXT_ELEMENT',
      props: {
        nodeValue: text,
        children: []
      }
    }
  }
}

const vdom = React.createElement('div', { id: 'app' },
  React.createElement('span', null, 'hello'),
  React.createElement('span', null, 'world')
)
console.log(vdom)
//完成虚拟 dom 转 fiber 结构和时间切片

let nextUnitOfWork = null;//下一个工作单元
let wipRoot = null;//当前正在工作的 fiber树
let currentRoot = null;//旧的 fiber 树
let deletions = null;//存储需要删除的fiber节点 {a,b,c,d}=>{a,b,c}
function render(element, container) {
  //初始化根节点
  wipRoot = {
    dom: container,
    props: {
      children: [element]
    },
    alternate: currentRoot//旧的fiber树
  }
  deletions = [];
  nextUnitOfWork = wipRoot;
}
function createDom(fiber) {
  const dom = fiber.type === 'TEXT_ELEMENT' ?
    document.createTextNode('') :
    document.createElement(fiber.type);
  updateDom(dom, {}, fiber.props);//挂载新属性
  return dom;
}

function updateDom(dom, prevProps, nextProps) {
  //清除旧的属性
  Object.keys(prevProps).filter(
    name => name !== 'children'
  ).forEach(name => {
    dom[name] = '';
  })
  //添加新的属性
  Object.keys(nextProps).filter(
    name => name !== 'children'
  ).forEach(name => {
    dom[name] = nextProps[name];
  })
}

function workLoop(deadline) {
  let shouldYield = false;
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
    //小于 1ms 时，说明当前帧已经没有时间了，需要让出时间片
    shouldYield = deadline.timeRemaining() < 1;
  }
  //nextUnitOfWork 为空时，说明当前帧已经没有任务了 需要提交
  if (!nextUnitOfWork && wipRoot) {
    commitRoot();
  }
  requestIdleCallback(workLoop)
}

requestIdleCallback(workLoop)

function performUnitOfWork(fiber) {
  if (!fiber.dom) {
    fiber.dom = createDom(fiber);
  }
  const elements = fiber.props.children;
  //遍历子节点
  reconcileChildren(fiber, elements);

  if (fiber.child) {
    return fiber.child;
  }
  let nextFiber = fiber
  while (nextFiber) {
    if (nextFiber.sibling) {
      //返回兄弟
      return nextFiber.sibling
    }
    //如果没有兄弟,返回父节点 向上查找
    nextFiber = nextFiber.parent
  }
  return null;
}

function createFiber(element, parent) {
  return {
    type: element.type,
    props: element.props,
    parent,
    dom: null,
    child: null,
    sibling: null,
    alternate: null,
    effectTag: null
  }
}

function reconcileChildren(fiber, elements) {
  //形成 fiber 树
  //diff 算法
  let index = 0;
  let prevSibling = null;
  let oldFiber = fiber.alternate && fiber.alternate.child;//旧的 fiber 树
  while (index < elements.length || oldFiber !== null) {
    const element = elements[index];
    //1.复用
    let newFiber = null;
    const sameType = oldFiber && element && element.type === oldFiber.type;
    if (sameType) {
      console.log('复用', element)
      newFiber = {
        type: oldFiber.type,
        props: element.props,
        parent: fiber,
        dom: oldFiber.dom,
        alternate: oldFiber,
        effectTag: 'UPDATE'
      }
    }
    //2.新增
    if (element && !sameType) {
      console.log('新增', element)
      newFiber = createFiber(element, fiber);
      newFiber.effectTag = 'PLACEMENT';//新增
    }
    //3.删除
    if (oldFiber && !sameType) {
      console.log('删除', oldFiber)
      oldFiber.effectTag = 'DELETION';//删除
      deletions.push(oldFiber);
    }
    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }
    if (index === 0) {
      fiber.child = newFiber;
    } else if (element) {
      prevSibling.sibling = newFiber;
    }
    prevSibling = newFiber;
    index++;
  }

}
function commitRoot() {
  deletions.forEach(commitWork);
  commitWork(wipRoot.child);
  currentRoot = wipRoot;//更新旧的 fiber 树
  wipRoot = null;//重置
}
function commitWork(fiber) {

  if (!fiber) {
    return;
  }

  const domParent = fiber.parent.dom;
  if (fiber.effectTag == 'PLACEMENT') {
    domParent.appendChild(fiber.dom);
  } else if (fiber.effectTag == 'UPDATE') {
    updateDom(fiber.dom, fiber.alternate.props, fiber.props)
  } else if (fiber.effectTag == 'DELETION') {
    domParent.removeChild(fiber.dom)
  }
  commitWork(fiber.child);
  commitWork(fiber.sibling);
}


render(React.createElement('div', { id: 'root' },
  React.createElement('h1', null, 'hello'),
  React.createElement('h1', null, 'world')
), document.getElementById
  ('root'

  ))

setTimeout(() => {
  render(React.createElement('div', { id: 'root' },
    React.createElement('h1', null, 'hello'),
    React.createElement('h1', null, 'world'),
    React.createElement('h1', null, 'hello'),
    React.createElement('h1', null, 'world')
  ), document.getElementById('root'))
}
  , 2000)

