import { useState, useEffect } from "react";
import { fetchReservationsForUser } from "../../services/ReservationService";

const useReservations = (username, token) => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const data = await fetchReservationsForUser(username, token);
        setReservations(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    if (username && token) {
      fetchReservations();
    }
  }, [username, token]);

  return { reservations, loading, error };
};

export default useReservations;
