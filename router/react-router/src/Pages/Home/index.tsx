import { NavLink } from "react-router";
export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <NavLink to="/about">Go to About</NavLink>
    </div>
  );
}
