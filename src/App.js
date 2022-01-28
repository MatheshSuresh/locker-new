import {BrowserRouter,Routes,Route} from "react-router-dom"
import Dashboard from './pages/dashboard/dashboard';
import Reports from './pages/reports/reports';
import Userprofile from './pages/user profile/userprofile';
import Employee from './pages/employee list/employee';
import AdminCtrl from './pages/superAdminCtrl/adminCtrl';
import Login from './pages/login/login';
import Register from './pages/register/register';
import Forgotpass from './pages/forgotpass/forgotPass';
import Newpass from './pages/forgotpass/newpass';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route exact path='/login' element={<Login />}/>
        <Route exact path='/forgotpass' element={<Forgotpass />}/>
        <Route exact path='/newpass' element={<Newpass />}/>
        <Route exact path='/register' element={<Register />}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/reports' element={<Reports/>}/>    
        <Route exact path='/userprofile' element={<Userprofile/>}/>
        <Route exact path='/empprofile' element={<Employee/>}/>
        <Route exact path='/AdminCtrl' element={<AdminCtrl/>}/>    
      </Routes>
    </BrowserRouter>
  );
}

export default App;
