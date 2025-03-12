import { useState } from "react";
//主要是针对表单的定义
function App(){
const [value,setValue]=useState('')
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
setValue(e.target.value)
}
return (
    <div>
        <input
            type="text"
            value={value}
            onChange={handleChange}
        />
        <p>{value}</p>
    </div>
);
}
export default App;
