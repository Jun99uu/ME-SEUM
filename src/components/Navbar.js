import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  console.log(location.pathname);
  if (location.pathname === "/") {
    return null;
  }
  return (
    <div>
      <ul>
        <li>
          <Link to="/home">ME-SEUM</Link>
        </li>
        <li>
          <Link to="/MBTI">MBTI</Link>
        </li>
        <li>
          <Link to="/fortune">Today's Fortune</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
