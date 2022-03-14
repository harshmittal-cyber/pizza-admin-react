import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/StepAuth/Login";
import Signup from "./pages/StepAuth/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
