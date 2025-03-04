import './App.css'

function App(){

  //1.插值语句 jsx tsx {} 字符串 数字 数组(普通类型) 元素 三元表达式 api 调用 
  //2.差值语句支持对象的做法 把对象进行序列化 JSON.stringify(obj)
  //3.事件如何添加 使用驼峰命名的方式 onClick={fn} onChange={fn} 如果需要传递参数 onClick={()=>fn(参数)}
  //4.如何支持泛型 使用泛型的方式 <T> 传递参数 但是需要<T,>
  //5.如何绑定属性 使用驼峰命名的方式 className={} style id={id}
  //6.如何绑定多个 class 使用模板语法 `${}` 模板语法支持多个变量 `${a} ${b}`
  //7.如何绑定style 使用对象的方式 style={{color:'red',fontSize:'20px'}}
  //8.如何添加 html 代码片段 使用 dangerouslySetInnerHTML={{__html:html}} 标签内不能有内容
  //9.如何遍历数组 使用 map 方法进行遍历
  
  const arr=[1,2,3,4,5]
  return(
    <>
      <div>
        {arr.map((item,index)=><p id='v' key={index}>{item}</p>)}
      </div>
    </>
  )
}
export default App
