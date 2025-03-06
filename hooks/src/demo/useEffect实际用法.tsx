import { useEffect, useState } from "react"

interface UserData {
  name: string
  email: string
  username: string
  phone: string
  website: string
}
function App() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [userId, setUserId] = useState<string>('0')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
      .then(res => res.json())
      .then(res => {
        setUserData(res)
        setLoading(false)
      })
  }, [userId])
  return (
    <div>
      <input value={userId} onChange={(e) => { setUserId(e.target.value) }} type="text" />
      <div>
        {loading ? (<p>loading...</p>) : (<div>
          <p>name:{userData?.name}</p>
          <p>email:{userData?.email}</p>
          <p>username:{userData?.username}</p>
          <p>phone:{userData?.phone}</p>
          <p>website:{userData?.website}</p>
        </div>
        )}
      </div>

    </div>
  )
}
export default App
