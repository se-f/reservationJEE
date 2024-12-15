import useReservations from "../../hooks/reservation/useReservations";

const AllReservations = () => {
  const token = localStorage.getItem("token");
  const {
    reservations,
    editedReservation,
    editedStatus,
    deleteConfirmation,
    deleteId,
    handleDelete,
    handleEdit,
    handleSave,
    handleChange,
    handleStatusChange,
    setDeleteId,
    setDeleteConfirmation,
  } = useReservations(token);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Admin - Réservations</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">User</th>
            <th className="border border-gray-400 px-4 py-2">Date de début</th>
            <th className="border border-gray-400 px-4 py-2">Date de fin</th>
            <th className="border border-gray-400 px-4 py-2">Chambre</th>
            <th className="border border-gray-400 px-4 py-2">Nb pers</th>
            <th className="border border-gray-400 px-4 py-2">Prix</th>
            <th className="border border-gray-400 px-4 py-2">STATUS</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id_reservation}>
              <td className="border border-gray-400 px-4 py-2">
                {reservation.id_reservation}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {reservation.user.username}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedReservation &&
                editedReservation.id_reservation ===
                  reservation.id_reservation ? (
                  <input
                    type="text"
                    value={editedReservation.date_debut}
                    onChange={(e) => handleChange(e, "date_debut")}
                  />
                ) : (
                  reservation.date_debut
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedReservation &&
                editedReservation.id_reservation ===
                  reservation.id_reservation ? (
                  <input
                    type="text"
                    value={editedReservation.date_fin}
                    onChange={(e) => handleChange(e, "date_fin")}
                  />
                ) : (
                  reservation.date_fin
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {reservation.chambre.type}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {reservation.nombre_personnes}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {reservation.chambre.prix}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedReservation &&
                editedReservation.id_reservation ===
                  reservation.id_reservation ? (
                  <input
                    type="text"
                    value={editedStatus}
                    onChange={handleStatusChange}
                  />
                ) : (
                  reservation.status
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {deleteConfirmation &&
                reservation.id_reservation === deleteId ? (
                  <button
                    onClick={() => handleDelete(deleteId)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Confirmer
                  </button>
                ) : (
                  <>
                    {!editedReservation ||
                    editedReservation.id_reservation !==
                      reservation.id_reservation ? (
                      <button
                        onClick={() => handleEdit(reservation)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                      >
                        Modifier
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                      >
                        Enregistrer
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setDeleteId(reservation.id_reservation);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Supprimer
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllReservations;
