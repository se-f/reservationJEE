import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const userToken = localStorage.getItem("token");
    setIsLoggedIn(userToken !== null);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    toast.success("Déconnexion réussie");
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);

    setIsLoggedIn(false);
  };

  return (
    <nav className="bg-white-500 p-5 flex items-center justify-between shadow">
      <div className="flex items-center">
        <a href="/">
          <img
            src="https://img.freepik.com/vecteurs-premium/modele-conception-vecteur-logo-icone-hotel_827767-3569.jpg"
            className="rounded-full rounded-br-lg ml-8 w-[50px]"
          />
        </a>
      </div>

      {/* Liens */}
      <div className="flex items-center space-x-10 mr-8">
        <a href="/chambre" className="text-black hover:text-gray-800">
          Chambres
        </a>
        <a href="/historique" className="text-black hover:text-gray-800">
          Mes réservations
        </a>
        {isLoggedIn ? (
          <>
            <a href="/profile" className="text-black hover:text-gray-800">
              Modifier profile
            </a>
            <button
              onClick={handleLogout}
              className="text-black hover:text-gray-800"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <a href="/login" className="text-black hover:text-gray-800">
            Se connecter
          </a>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
