import { useRef } from "react";

//主要是针对表单的定义
function App() {
    const value = '123'
    const inputRef = useRef<HTMLInputElement>(null)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }
    const handleFileChange = () => {
        console.log(file.current?.files);
    }
    const file = useRef<HTMLInputElement>(null)
    return (
        <div>
            <input
                type="text"
                defaultValue={value}
                ref={inputRef}
                
                onChange={handleChange}
            />
            <p>{value}</p>
            {/* 特殊的非受控组件 并且不能改变成受控组件 */}
            <input ref={file} onChange={handleFileChange} type="file" />
        </div>
    );
}
export default App;
