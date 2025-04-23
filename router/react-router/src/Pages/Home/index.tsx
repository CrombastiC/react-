import { NavLink, useLocation, useParams,useLoaderData,useSubmit,useNavigation, useActionData } from "react-router";
import { Form, Input, Button } from "antd";
export default function Home() {
  //1.使用useParams获取路由参数
  const { id } = useParams();
  //2.使用useLocation获取路由信息
  const location = useLocation();
  console.log(location.search);//获取路由参数,但是需要解码
  //3.使用useLoaderData获取路由数据
  const {data,success}=useLoaderData();
  console.log(data,success);
  const submit=useSubmit();
  const onFinish=(values:any)=>{
    submit(values,{
      method:'post',//默认是formdata
      encType:'application/json'
    });
  }
  const navigation=useNavigation();
  const actionData=useActionData();
  console.log(actionData);
  return (
    <div>
      <h1>Home</h1>
      <h2>id: {id}</h2>
      {/* 使用searchParams */}
      {/* <NavLink to="/about?id=123">Go to About</NavLink> */}
      {/*使用params */}
      <NavLink to="/about/beijing/20">Go to About</NavLink>
      {/* 使用state ,缺点只存在于当前会话,刷新后会丢失*/}
      {/* <NavLink to="/about" state={{ id: 123 }}>Go to About</NavLink> */}
      {data.map((item:any)=>(
        <div key={item.name}>
          <h2>{item.name}</h2>
          <h2>{item.age}</h2>
        </div>
      ))}


      <Form onFinish={onFinish}>
        <Form.Item label="name" name="name">
          <Input />
        </Form.Item>
        <Form.Item label="age" name="age">
          <Input />
        </Form.Item>
        <Form.Item>
          <Button loading={navigation.state==="submitting"} type="primary" htmlType="submit">Submit</Button>
        </Form.Item>
      </Form>
    </div>
  );
}
