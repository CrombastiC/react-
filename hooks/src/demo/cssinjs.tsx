// import Card from "./components/Card";
// import Card2 from "./components/Card2";
// const fn=(param:string)=>{
//   console.log(param)
// }
// import { Modal } from "./components/Modal";
import styled, { createGlobalStyle, keyframes } from 'styled-components'
// import styled from './app.module.less'

const Button = styled.button<{ primary?: boolean }>`
  background-color: ${props => props.primary ? 'blue' : 'red'};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`
// 继承

const LinkButton=styled(Button)`
  background-color: green;
`
//属性
const Input=styled.input.attrs<{defaultValue:string}>(props=>{
  return {
    type: 'password',
    placeholder: '请输入密码',
    defaultValue: props.defaultValue,
  }
})`
  border: 1px solid red;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`
//全局样式，全局样式一般是单独封装到一个文件的
const GlobalStyle=createGlobalStyle`
  body{
    background-color: skyblue;
  }
`
// 动画
const rotate=keyframes`
  from{
    transform: rotate(0deg);
  }
  to{
    transform: rotate(360deg);
  }
`
const Box=styled.div`
  width: 100px;
  height: 100px;
  background-color: red;
  animation: ${rotate} 2s linear infinite;
`
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
      {/* <div style={{width: '800px', height: '800px',position:'relative',border: '1px solid black'}}>
        <Modal />
      </div>
     <div className={styled.app}>app
      <button className={styled.buttonBlue}></button>
      <button className={styled['button-blue']}></button>
      <button className={'button-red'}></button>
     </div> */}


      <GlobalStyle />
      <Box />
      <Button primary>点击我</Button>
      <Input defaultValue="123"/>
      <LinkButton>点击我</LinkButton>
    </>
  )
}
export default App;
