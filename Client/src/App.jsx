import "./app.scss";
import { Route, Routes } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      {/* navbar  */}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />}/>
      </Routes>
    </div>
  );
}

export default App;
