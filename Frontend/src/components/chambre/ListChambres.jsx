import { useEffect, useState } from "react";
import axios from "axios";
import ChambreSidebar from "./ChambreSidebar"; // Importez le composant Sidebar

function ListChambresComponent() {
  const [chambres, setChambres] = useState([]);

  const [chambreDisponibilite, setChambreDisponibilite] = useState(0);

  useEffect(() => {
    const fetchChambres = async () => {
      try {
        const response = await axios.get("http://localhost:8081/chambre");
        setChambres(response.data);
        chambres.map((chambre) => {
          console.log(chambre);
        });
      } catch (error) {
        console.error("Error fetching chambres:", error);
      }
    };

    fetchChambres();
  }, []);

  const handleFilterChange = async (filters) => {
    try {
      let apiUrl = "http://localhost:8081/chambre";
      let queryParams = [];

      console.log("Filters:", filters);

      setChambreDisponibilite(0);
      // Filtrer par date et type
      if (filters.dateDebut && filters.dateFin && filters.type) {
        console.log("Date début:", filters.dateDebut);
        console.log("Date fin:", filters.dateFin);
        apiUrl += `/disponible/type/${filters.type}/date`;

        queryParams.push(`dateArrivee=${filters.dateDebut}`);
        queryParams.push(`dateDepart=${filters.dateFin}`);

        if (queryParams.length > 0) {
          apiUrl += `?${queryParams.join("&")}`;
        }
        setChambreDisponibilite(1);
      }

      // Filtrer par date
      else if (filters.dateDebut && filters.dateFin) {
        console.log("Date début:", filters.dateDebut);
        console.log("Date fin:", filters.dateFin);
        apiUrl += "/disponible/date";

        queryParams.push(`dateArrivee=${filters.dateDebut}`);
        queryParams.push(`dateDepart=${filters.dateFin}`);

        if (queryParams.length > 0) {
          apiUrl += `?${queryParams.join("&")}`;
        }
        setChambreDisponibilite(1);
      } else if (filters.availability && filters.type) {
        apiUrl += `/disponible/type/${filters.type}`;
        setChambreDisponibilite(1);
      } else if (filters.type) {
        apiUrl += `/type/${filters.type}`;
      } else if (filters.availability) {
        setChambreDisponibilite(1);
        apiUrl += "/disponible";
      }

      console.log(chambreDisponibilite);

      console.log("API URL:", apiUrl);

      const response = await axios.get(apiUrl);
      setChambres(response.data);
    } catch (error) {
      console.error("Error fetching filtered chambres:", error);
    }
  };

  return (
    <>

      <div className="flex flex-row mt-[50px]">
        <ChambreSidebar onFilterChange={handleFilterChange} />{" "}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 px-[100px]">
          {chambres.map((chambre) => (
            <div
              key={chambre.id}
              className={`bg-white rounded-lg overflow-hidden shadow-md ${
                chambreDisponibilite == 0 ? "opacity-50 bg-gray-400" : ""
              }`}
            >
              <img
                src={chambre.image}
                alt={chambre.nom}
                className="w-full h-64 object-cover object-center"
              />
              <div className="p-4">
                <p className="text-gray-700">{chambre.type}</p>
                <p className="text-gray-700 text-xs mb-2">
                  {chambre.idchambre}
                </p>
                <p className="text-gray-700 mb-2">{chambre.description}</p>
                <p className="text-gray-700 mb-2">{chambre.prix} €</p>
                <a href={`/chambre/${chambre.idchambre}`}>
                  <button
                    className={`${
                      chambreDisponibilite == 0
                        ? "bg-gray-500 cursor-not-allowed text-gray-300"
                        : "bg-blue-500  hover:bg-blue-600"
                    } w-full text-white py-2 px-4 rounded mt-7`}
                  >
                    Plus de détails
                  </button>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ListChambresComponent;
