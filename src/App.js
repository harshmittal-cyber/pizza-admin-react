import { BrowserRouter as Router, Switch, Routes, Route } from "react-router-dom";
import Login from "./pages/StepAuth/Login";
import Signup from "./pages/StepAuth/Signup";
import PrivateRoute from './components/PrivateRoute'
import HomePage from './pages/HomePage'
import Dashboard from './Dashboard'
import Orders from "./pages/Orders";
import Menu from './pages/menu/Menu';
import ForgotPassword from './pages/ResetPassword/forgotPassword'
import ResetPassword from "./pages/ResetPassword/resetPassword";
import NotFound from './pages/NotFound'

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<Signup />} />
        <Route exact path='/forgotpassword' element={<ForgotPassword />} />
        <Route exact path={`/admin/password/reset/:token`} element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />}>
            <Route exact path='/' element={<HomePage />} />
            <Route exact path='/orders' element={<Orders />} />
            <Route exatc path='/menu' element={<Menu />} />
          </Route>
        </Route>

        <Route path={'*'} element={<NotFound />} />
      </Routes>
    </Router >
  );
}

export default App;
