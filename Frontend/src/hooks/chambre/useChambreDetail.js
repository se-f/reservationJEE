import { useState, useEffect } from "react";
import axios from "axios";

export const useChambreDetail = (chambreId) => {
  const [chambre, setChambre] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChambre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/chambre/${chambreId}`
        );
        setChambre(response.data);
      } catch (err) {
        setError("Error fetching chambre details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (chambreId) {
      fetchChambre();
    }
  }, [chambreId]);

  return { chambre, loading, error };
};
