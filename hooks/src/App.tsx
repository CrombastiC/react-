import { useLayoutEffect } from "react"

function App() {
  const scrollHandler = (e:React.UIEvent<HTMLDivElement>) => {
    console.log('scroll')
    const scrollTop =e.currentTarget.scrollTop
    window.history.replaceState({}, '', `?top=${scrollTop}`)
  }
  useLayoutEffect(()=>{
    const containter = document.getElementById('containter') as HTMLDivElement
    const top = window.location.search.split('=')[1]
    containter.scrollTop = Number(top)||0
  },[])
  return (
    <div onScroll={scrollHandler} id="containter" style={{height:'500px',overflow:'auto'}}>
      {
        Array.from({ length: 500 }).map((_, index) => {
          return <div key={index}>{index + 1}</div>
        })
      }
    </div>
  )
}
export default App
