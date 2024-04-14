import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [editedReservation, setEditedReservation] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:8081/reservation", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("response:",response.data);
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [token, deleteConfirmation, editedReservation]);

  const handleDelete = async (id) => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      setDeleteId(id);
    } else {
      try {
        await axios.delete(`http://localhost:8081/reservation/${deleteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id_reservation !== deleteId
          )
        );
        setDeleteConfirmation(false);
        setDeleteId("");
        toast.success("Deleted successfully!", { position: "bottom-center" });
      } catch (error) {
        console.error("Error deleting reservation:", error);
      }
    }
  };

  const handleEdit = (reservation) => {
    setEditedReservation(reservation);
    setEditedStatus(reservation.status);
  };

  const handleSave = async () => {
    try {
      delete editedReservation.user.authorities;
      delete editedReservation.user.accountNonExpired;
      delete editedReservation.user.accountNonLocked;
      delete editedReservation.user.credentialsNonExpired;
      delete editedReservation.user.enabled;

      editedReservation.status = editedStatus;

      await axios.put(
        `http://localhost:8081/reservation`,
        editedReservation,
        {
          headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditedReservation(null);
      setEditedStatus("");
      setDeleteConfirmation(false);
      setDeleteId("");
      toast.success("Reservation updated!", { position: "bottom-center" });
    } catch (error) {
      console.error("Error updating reservation:", error);
    }
  };

  const handleChange = (e, field) => {
    setEditedReservation({
      ...editedReservation,
      [field]: e.target.value,
    });
  };

  const handleStatusChange = (e) => {
    setEditedStatus(e.target.value);
  };

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
                  <>
                    <button
                      onClick={() => handleDelete(deleteId)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Confirmer
                    </button>
                  </>
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
