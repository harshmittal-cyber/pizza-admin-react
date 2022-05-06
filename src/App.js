import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import Login from "./pages/StepAuth/Login";
import Signup from "./pages/StepAuth/Signup";
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import Dashboard from './Dashboard'
import Orders from "./pages/Orders";
import Menu from './pages/menu/Menu';
import AddItem from "./pages/menu/AddItem";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />

        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />}>
            <Route exact path='/' element={<HomePage />} />
            <Route exatc path='/orders' element={<Orders />} />
            <Route exatc path='/menu' element={<Menu />} />
            <Route exact path='/additem' element={<AddItem />} />
          </Route>
        </Route>
      </Routes>
    </Router >
  );
}

export default App;
