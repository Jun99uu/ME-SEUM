import app from "./firebase";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Enter from "./routes/Enter";
import Home from "./routes/Home";
import About from "./routes/About";
import Mbti from "./routes/Mbti";
import Fun from "./routes/Fun";
import Navbar from "./components/Navbar";
import Admin from "./routes/Admin";

function App() {
  const [userName, setUserName] = useState("");
  const [userMbti, setUserMbti] = useState("");
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Enter setUserName={setUserName} setUserMbti={setUserMbti} />
          }
        ></Route>
        <Route
          path="/home"
          element={<Home userName={userName} userMbti={userMbti} />}
        ></Route>
        <Route
          path="/mbti"
          element={<Mbti userName={userName} userMbti={userMbti} />}
        ></Route>
        <Route
          path="/fun"
          element={<Fun userName={userName} userMbti={userMbti} />}
        ></Route>
        <Route
          path="/about"
          element={<About userName={userName} userMbti={userMbti} />}
        ></Route>
        <Route path="/admin" element={<Admin />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
