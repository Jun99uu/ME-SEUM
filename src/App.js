import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Enter from "./routes/Enter";
import Home from "./routes/Home";

function App() {
  const [userName, setUserName] = useState("");
  const [userMbti, setUserMbti] = useState("");
  return (
    <Router>
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
      </Routes>
    </Router>
  );
}

export default App;
