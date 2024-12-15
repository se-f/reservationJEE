import axios from "axios";

const API_URL = "http://localhost:8081/chambre";

export const fetchChambres = () => {
  return axios.get(API_URL);
};

export const fetchChambreData = async (idChambre) => {
  try {
    const response = await axios.get(`${API_URL}/chambre/${idChambre}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching chambre data:", error);
    throw error;
  }
};

export const deleteChambre = async (id, token) => {
  await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateChambre = async (id, updatedChambre, token) => {
  await axios.put(`${API_URL}/${id}`, updatedChambre, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addChambre = async (newChambre, token) => {
  await axios.post(API_URL, newChambre, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getFilteredChambres = async (filters) => {
  let apiUrl = API_URL;
  let queryParams = [];

  if (filters.dateDebut && filters.dateFin && filters.type) {

    apiUrl += `/disponible/type/${filters.type}/date`;
    queryParams.push(`dateArrivee=${filters.dateDebut}`);
    queryParams.push(`dateDepart=${filters.dateFin}`);

  } else if (filters.dateDebut && filters.dateFin) {

    apiUrl += "/disponible/date";
    queryParams.push(`dateArrivee=${filters.dateDebut}`);
    queryParams.push(`dateDepart=${filters.dateFin}`);

  } else if (filters.availability && filters.type) {

    apiUrl += `/disponible/type/${filters.type}`;

  } else if (filters.type) {

    apiUrl += `/type/${filters.type}`;

  } else if (filters.availability) {

    apiUrl += "/disponible";
    
  }

  if (queryParams.length > 0) {
    apiUrl += `?${queryParams.join("&")}`;
  }

  const response = await axios.get(apiUrl);
  return response.data;
};
