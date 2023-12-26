import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import MyBookings from "./pages/user/MyBookings";
import Home from "./pages/user/Home";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Users from "./pages/admin/Users";
import Cabs from "./pages/admin/Cabs";
import Paths from "./pages/admin/Paths";
import Bookings from "./pages/admin/Bookings";
import NotFound from "./pages/user/NotFound";
import Navbar from "./components/Navbar";


function App() {
  return (
    <>
    <div id="bg-image"></div>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/mybookings" element={<MyBookings/>}/>

        <Route path="/admin/users" element={<Users/>}/>
        <Route path="/admin/cabs" element={<Cabs/>}/>
        <Route path="/admin/paths" element={<Paths/>}/>
        <Route path="/admin/bookings" element={<Bookings/>}/>

        <Route path="/*" element={<NotFound/>}/>

      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
