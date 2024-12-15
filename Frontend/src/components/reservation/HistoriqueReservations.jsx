import useReservationsForUser from "../../hooks/reservation/useReservationsForUser";

const HistoriqueReservations = () => {
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  // Use the custom hook to fetch reservations
  const { reservations, loading, error } = useReservationsForUser(username, token);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

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
              className="bg-white shadow-md rounded-lg p-6 flex items-center bg-slate-200"
            >
              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  Réservation n.{reservation.id_reservation}
                </h1>
                <p className="mb-5">Chambre {reservation.chambre.idchambre}</p>
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
