import { useEffect, useState } from "react";
import axios from "axios";

const HistoriqueReservations = () => {
  const [reservations, setReservations] = useState([]);
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        console.log("Fetching reservations for user:", username);
        const response = await axios.get(
          `http://localhost:8081/reservation/guest/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    if (username) {
      fetchReservations();
    }
  }, [username]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mt-8 mb-8 ml-4">
        Historique des réservations
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 gap-4 p-2 pb-10">
        {reservations.length > 0 ? (
          reservations.map((reservation) => (
            <div
              key={reservation.id_reservation}
              className="bg-white shadow-md rounded-lg p-6 flex items-center bg-slate-200 "
            >
              <div className="flex-1">
                <h1 className="text-2xl font-bold mb-5">
                  Réservation n.{reservation.id_reservation}
                </h1>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Date de début:</span>{" "}
                  {reservation.date_debut}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Date de fin:</span>{" "}
                  {reservation.date_fin}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Chambre:</span>{" "}
                  {reservation.chambre.type}
                </p>

                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Nombre de personnes:</span>{" "}
                  {reservation.nombre_personnes}
                </p>
                <p className="text-lg text-gray-700">
                  <span className="font-semibold">Prix:</span>{" "}
                  {reservation.chambre.prix} €
                </p>

                <p className="text-lg">
                  <span className="font-semibold">Status:</span>{" "}
                  {reservation.status}
                </p>
              </div>
              <img
                src={reservation.chambre.image}
                alt={reservation.chambre.type}
                className="w-64 h-64 object-cover ml-6 rounded-lg"
              />
            </div>
          ))
        ) : (
          <p className="text-lg">Aucune réservation trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default HistoriqueReservations;
