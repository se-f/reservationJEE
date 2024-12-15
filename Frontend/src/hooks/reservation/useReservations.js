import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  listReservations,
  updateReservation,
  deleteReservation,
} from "../../services/ReservationService";

const useReservations = (token) => {
  const [reservations, setReservations] = useState([]);
  const [editedReservation, setEditedReservation] = useState(null);
  const [editedStatus, setEditedStatus] = useState("");
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  // Fetch reservations on mount or when state changes (delete, edit)
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await listReservations(token);
        setReservations(data);
      } catch (error) {
        toast.error("Error fetching reservations.");
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
        await deleteReservation(deleteId, token);
        setReservations((prevReservations) =>
          prevReservations.filter(
            (reservation) => reservation.id_reservation !== deleteId
          )
        );
        setDeleteConfirmation(false);
        setDeleteId("");
        toast.success("Reservation deleted successfully.");
      } catch (error) {
        toast.error("Error deleting reservation.");
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

      await updateReservation(editedReservation, token);
      setEditedReservation(null);
      setEditedStatus("");
      setDeleteConfirmation(false);
      setDeleteId("");
      toast.success("Reservation updated successfully.");
    } catch (error) {
      toast.error("Error updating reservation.");
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

  return {
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
    setDeleteConfirmation,
    setDeleteId,
  };
};

export default useReservations;
