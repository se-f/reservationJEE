import axios from "axios";

const BASE_URL = "http://localhost:8081/reservation";

export const listReservations = () => {
  return axios.get(BASE_URL);
};


export const updateReservation = async (reservation, token) => {
  await axios.put(BASE_URL, reservation, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteReservation = async (id, token) => {
  await axios.delete(`${BASE_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Function to fetch reservations for a user
export const fetchReservationsForUser = async (username, token) => {
  try {
    const response = await axios.get(
      `http://localhost:8081/reservation/guest/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error("Error fetching reservations");
  }
};



export const createReservation = async (formData, token) => {
  try {
    const response = await axios.post(`${BASE_URL}/reservation`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating reservation:", error);
    throw error;
  }
};
