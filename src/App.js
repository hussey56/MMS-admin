import Account from "./Pages/Account";
import Employee from "./Pages/Employee";
import Event from "./Pages/Event";
import Finance from "./Pages/Finance";
import Home from "./Pages/Home";
import Inventory from "./Pages/Inventory";
import Login from "./Pages/Login";
import Reservation from "./Pages/Reservation";
import Signup from "./Pages/Signup";

import {BrowserRouter,Routes,Route} from 'react-router-dom'

function App() {

  return (
<>
{/* <ReserveContext>
<AdminState> */}


<BrowserRouter>
<Routes>
  <Route path="/" element={<Login/>}/>
  
  <Route path="/home" element={<Home/>}/>

  <Route path="/events" element={<Event/>}/>
  <Route path="/requests" element={<Reservation/>}/>
  <Route path="/inventory" element={<Inventory/>}/>
  <Route path="/signup" element={<Signup/>}/>
  <Route path="/account" element={<Account/>}/>
  <Route path="/employees" element={<Employee/>}/>
  <Route path="/finance" element={<Finance/>}/>
  <Route path="*" element={<><h2 className="text-center">404 <br /> PAGE NOT FOUND</h2></>}/>
  <Route path="/down" element={<><h1 className="text-center">500 <br />SERVER IS DOWN</h1></>}/>
</Routes>

</BrowserRouter>
{/* </AdminState>

</ReserveContext> */}
</>
  );
}

export default App;