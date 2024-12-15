import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { createReservation } from "../../services/ReservationService";
import { fetchChambreData } from "../../services/ChambreService";
import { fetchUserData } from "../../services/UserService";
import { toast } from "react-toastify";

export const useReservationForm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const idChambre = queryParams.get("idchambre");
  const username = localStorage.getItem("username");
  const token = localStorage.getItem("token");

  const initialFormData = {
    date_debut: "",
    date_fin: "",
    nombre_personnes: 1,
    status: "ON_HOLD",
    chambre: {
      idchambre: idChambre || 0,
      type: "",
      prix: "",
    },
    user: {
      username: localStorage.getItem("username") || "",
      email: "",
      password: "",
    },
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    const fetchChambre = async () => {
      try {
        const chambreData = await fetchChambreData(idChambre);
        setFormData((prevFormData) => ({
          ...prevFormData,
          chambre: {
            ...prevFormData.chambre,
            idchambre: chambreData.idchambre,
            type: chambreData.type,
            prix: chambreData.prix,
            disponibilite: chambreData.disponibilite,
            description: chambreData.description,
            image: chambreData.image,
          },
        }));
      } catch (error) {
        console.error("Error fetching chambre data:", error);
      }
    };

    fetchChambre();
  }, [idChambre]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await fetchUserData(username, token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          user: {
            ...prevFormData.user,
            iduser: userData.iduser,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            username: userData.username,
          },
        }));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (username) {
      fetchUser();
    }
  }, [username, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createReservation(formData, token);
      console.log("Reservation created:", response);
      toast.success("Réservation créée avec succès", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error creating reservation:", error);
      toast.error("Error creating reservation, check dates", {
        position: "bottom-center",
      });
    }
  };

  return { formData, handleChange, handleSubmit };
};
