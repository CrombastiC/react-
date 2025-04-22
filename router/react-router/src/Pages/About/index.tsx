import { NavLink, useParams, useSearchParams, useLocation } from "react-router";

export default function About() {
  const [searchParams, setSearchParams] = useSearchParams();
  //获取searchParams
  const id = searchParams.get("id");
  //获取params
  const { city, age } = useParams();
  //获取state
  const location = useLocation();
  const state = location.state;
  console.log(state);
  return (
    <div>
      <h1>About</h1>
      <NavLink to="/home">Go to Home</NavLink>
      <h2>id: {id}</h2>
      <h2>city: {city}</h2>
      <h2>age: {age}</h2>
      <h2>state: {state}</h2>
      <button onClick={() => setSearchParams({ id: "456" })}>Change id</button>
    </div>
  )
}
