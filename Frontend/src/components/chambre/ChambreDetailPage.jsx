import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function ChambreDetailPage() {
  const [chambre, setChambre] = useState([]);

  const { chambreId } = useParams();
  useEffect(() => {
    const fetchChambre = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/chambre/${chambreId}`
        );
        setChambre(response.data);
      } catch (error) {
        console.error("Error fetching chambre:", error);
      }
    };

    fetchChambre();
  }, []);

  return (
    <div className="h-[91vh] flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 py-8 flex flex align-center justify-center">
        <div className="w-4/5 pr-6">
          <img
            src={chambre.image}
            alt={chambre.type}
            className="rounded-lg mb-4"
          />
        </div>
        <div className="w-1/2 pl-4 ">
          <h1 className="text-5xl font-bold mb-4">{chambre.type}</h1>
          <p className="text-gray-700 mb-4">{chambre.description}</p>

          <h2 className="text-xl text-gray-700  font-bold mb-2">
            Équipements :
          </h2>
          <ul className=" list-inside mb-4 text-gray-700 ">
            <li>Connexion Wi-Fi gratuite</li>
            <li>Télévision à écran plat</li>
            <li>Climatisation réglable</li>
            <li>Salle de bains privative</li>
            <li>Service en chambre</li>
            <li>Espace de travail confortable</li>
            <li>Cafetière et théière</li>
          </ul>

          <p className="text-gray-700 mb-4">Prix: {chambre.prix} €</p>
          <p className="text-gray-700 mb-4">
            {chambre.disponibilite ? "Disponible" : "Non disponible"}
          </p>
          <a
            href={`/reserver?idchambre=${chambre.idchambre}`}
          >
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Réserver
            </button>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ChambreDetailPage;
