import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";

const ReservationForm = () => {
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
      idchambre: queryParams.get("idchambre") || 0,
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
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/chambre/${idChambre}`
        );
        const chambreData = response.data;
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

    fetchData();
  }, [formData.chambre.idchambre]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
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

    fetchData();
  }, [formData.chambre.idchambre]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("formdata:", formData);
      const response = await axios.post(
        "http://localhost:8081/reservation",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Reservation created:", response.data);
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

  return (
    <div className="bg-[url('https://www.shutterstock.com/shutterstock/videos/21658243/thumb/1.jpg?ip=x480')] bg-no-repeat bg-cover h-full py-8">
      <form
        className="max-w-md mx-auto mt-8 mb-8 px-7 py-9 bg-white rounded-md"
        onSubmit={handleSubmit}
      >
        <h2 className=" text-3xl font-bold mb-6">Formulaire de Réservation</h2>

        {/* Date de début */}
        <div className="mb-4">
          <label htmlFor="date_debut" className="block text-gray-700">
            Date de début :
          </label>
          <input
            type="datetime-local"
            id="date_debut"
            name="date_debut"
            value={formData.date_debut}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md px-4 py-2 bg-slate-100"
            required
          />
        </div>

        {/* Date de fin */}
        <div className="mb-4">
          <label htmlFor="date_fin" className="block text-gray-700">
            Date de fin :
          </label>
          <input
            type="datetime-local"
            id="date_fin"
            name="date_fin"
            value={formData.date_fin}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md px-4 py-2 bg-slate-100"
            required
          />
        </div>

        {/* Nombre de personnes */}
        <div className="mb-4">
          <label htmlFor="nombre_personnes" className="block text-gray-700">
            Nombre de personnes :
          </label>
          <input
            type="number"
            id="nombre_personnes"
            name="nombre_personnes"
            value={formData.nombre_personnes}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md px-4 py-2 bg-slate-100"
            required
          />
        </div>

        {/* Chambre ID */}
        <div className="mb-4">
          <label htmlFor="idchambre" className="block text-gray-700">
            Numéro de la chambre :
          </label>
          <input
            type="number"
            id="idchambre"
            name="idchambre"
            value={formData.chambre.idchambre}
            onChange={handleChange}
            className="form-input mt-1 block w-full bg-gray-200 rounded-md px-4 py-2 cursor-not-allowed"
            required
            readOnly
          />
        </div>

        {/* Type de chambre */}
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700">
            Type de chambre :
          </label>
          <input
            type="text"
            id="type"
            name="type"
            value={formData.chambre.type}
            onChange={handleChange}
            className="form-input mt-1 block w-full bg-gray-200 rounded-md px-4 py-2 cursor-not-allowed"
            required
            readOnly
          />
        </div>

        {/* Prix */}
        <div className="mb-4">
          <label htmlFor="prix" className="block text-gray-700">
            Prix :
          </label>
          <input
            type="number"
            id="prix"
            name="prix"
            value={formData.chambre.prix}
            onChange={handleChange}
            className="form-input mt-1 block w-full bg-gray-200 rounded-md px-4 py-2 cursor-not-allowed"
            required
            readOnly
          />
        </div>

        {/* Username */}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700">
            {"Nom d'utilisateur :"}
          </label>
          <input
            type="text"
            id="username"
            name="username"
            readOnly
            value={formData.user.username}
            onChange={handleChange}
            className="form-input mt-1 block w-full rounded-md px-4 py-2 cursor-not-allowed bg-gray-200"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email :
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.user.email}
            onChange={handleChange}
            readOnly
            className="form-input mt-1 block w-full rounded-md px-4 py-2 bg-gray-200 cursor-not-allowed"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        >
          Réserver
        </button>
      </form>
    </div>
  );
};

export default ReservationForm;
