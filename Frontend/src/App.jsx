import "./App.css";
import ListChambres from "./components/chambre/ListChambres";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/user/LoginPage";
import RegisterPage from "./components/user/RegisterPage";
import Navbar from "./components/Navbar";
import ChambreDetailPage from "./components/chambre/ChambreDetailPage";
import HomePage from "./components/Homepage";
import ReservationForm from "./components/reservation/ReservationForm";
import HistoriqueReservations from "./components/reservation/HistoriqueReservations";
import AdminReservations from "./components/reservation/AdminReservations";
import AdminUsers from "./components/user/AdminUsers";
import AdminChambres from "./components/chambre/AdminChambres";
import UserProfile from "./components/user/UserProfile";

function App() {
  return (
    <>
      <ToastContainer />
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/chambre" element={<ListChambres />}></Route>
          <Route path="/chambre/:chambreId" element={<ChambreDetailPage />} />
          <Route path="/historique" element={<HistoriqueReservations />} />
          <Route
            path="/admin/reservations"
            element={<AdminReservations />}
          ></Route>
          <Route path="/admin/users" element={<AdminUsers />}></Route>
          <Route path="/admin/chambres" element={<AdminChambres />}></Route>
          <Route path="/reserver" element={<ReservationForm />}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
