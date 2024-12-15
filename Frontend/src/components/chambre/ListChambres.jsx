import ChambreSidebar from "./ChambreSidebar";
import useChambresFilter from "../../hooks/chambre/useChambresFilter";

function ListChambresComponent() {
  const { chambres, chambreDisponibilite, handleFilterChange } = useChambresFilter();

  return (
    <div className="flex flex-row mt-[50px]">
      <ChambreSidebar onFilterChange={handleFilterChange} />
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
              <p className="text-gray-700 text-xs mb-2">{chambre.idchambre}</p>
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
  );
}

export default ListChambresComponent;
