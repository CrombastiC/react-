import React, { useContext, useState } from 'react';
//useContext可以获取上下文的值,主要是为了解决props传递的问题
//useContext接收一个context对象（React.createContext的返回值）并返回该context的当前值
//如果有多层context，内层会覆盖外层的context

interface IThemeContext {
  theme: string,
  setTheme: (theme: string) => void
}
//1.创建全局的上下文
const ThemeContext = React.createContext({} as IThemeContext);

const Child = () => {
  const theme = useContext(ThemeContext)
  console.log(theme, 'child');
  const styles = {
    width: '200px',
    height: '200px',
    backgroundColor: theme.theme === 'dark' ? '#000' : '#fff',
    color: theme.theme === 'dark' ? '#fff' : '#000',
    border: '1px solid #ccc'
  }
  return (
    <div>
      <div style={styles}>
        <button onClick={() => theme.setTheme(theme.theme === 'light' ? 'dark' : 'light')}>
          切换
        </button>
        child
      </div>
    </div>
  );
}
const Parent = () => {
  const theme = useContext(ThemeContext)
  console.log(theme, 'parent');
  const styles = {
    width: '200px',
    height: '200px',
    backgroundColor: theme.theme === 'dark' ? '#000' : '#fff',
    color: theme.theme === 'dark' ? '#fff' : '#000',
    border: '1px solid #ccc'
  }
  return (
    <div>
      <div style={styles}>parent</div>
      <Child />
    </div>
  );
}
//react18 ThemeContext.Provider
//react19 ThemeContext 去掉了Provider
function App() {
  const [theme, setTheme] = useState('light')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <div>
      <button onClick={toggleTheme}>切换</button>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Parent />
      </ThemeContext.Provider>
    </div>
  )

}
export default App;
