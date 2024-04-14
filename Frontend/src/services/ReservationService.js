import axios from 'axios';

const RESERVATION_API_BASE_URL = "http://localhost:8081/reservation";

export const listReservations = () => {
    return axios.get(RESERVATION_API_BASE_URL)
}