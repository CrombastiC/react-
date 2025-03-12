// import Card from "./components/Card";
// import Card2 from "./components/Card2";
// const fn=(param:string)=>{
//   console.log(param)
// }
import { Modal } from "./components/Modal";
function App() {
  return (
    <>
      {/* <Card title="兄弟a" callBack={fn}>
        <div>
          <p>这是主体内容</p>
        </div>
      </Card>
      <Card2 title="兄弟b"></Card2>
      <Card title={"Another Title Here"}
        number={1}  
        el={<div>这是一个div</div>}
        isShow={true}
        empty={null}
        object={{name:"张三",age:18}}
        arr={[1,2,3]}
        func={()=>{console.log("这是一个函数")}}
      />
      <button onClick={()=>{window.onShow()}}>调用message</button>*/}

      {/* {createPortal(
        <div>这是一个弹窗</div>,
        document.body
      )} */}
      <div style={{width: '800px', height: '800px',position:'relative',border: '1px solid black'}}>
        <Modal />
      </div>
     
    </>
  )
}
export default App;
