import { useState, useEffect } from "react";
import {
  fetchChambres,
  getFilteredChambres,
} from "../../services/ChambreService";

const useChambresFilter = () => {
  const [chambres, setChambres] = useState([]);
  const [chambreDisponibilite, setChambreDisponibilite] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchChambres();
        setChambres(response.data);
      } catch (error) {
        console.error("Error fetching chambres:", error);
      }
    };

    fetchData();
  }, []);

  const handleFilterChange = async (filters) => {
    try {
      const data = await getFilteredChambres(filters);
      setChambres(data);
      setChambreDisponibilite(filters.availability ? 1 : 0);
    } catch (error) {
      console.error("Error fetching filtered chambres:", error);
    }
  };

  return {
    chambres,
    chambreDisponibilite,
    handleFilterChange,
  };
};

export default useChambresFilter;
