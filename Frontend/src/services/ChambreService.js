import axios from 'axios';

const CHAMBRE_API_BASE_URL = "http://localhost:8081/chambre";

export const listChambres = () => {
    return axios.get(CHAMBRE_API_BASE_URL)
}