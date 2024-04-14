/* eslint-disable react/prop-types */
import { useState } from "react";

const ChambreSidebar = ({ onFilterChange }) => {
  const [typeFilter, setTypeFilter] = useState("");
  const [availabilityFilter, setAvailabilityFilter] = useState(false);
  const [dateDebutFilter, setDateDebutFilter] = useState("");
  const [dateFinFilter, setDateFinFilter] = useState("");

  const handleFilterChange = () => {
    // Envoyer les filtres sélectionnés à la fonction de filtre parente
    onFilterChange({
      type: typeFilter,
      availability: availabilityFilter,
      dateDebut: dateDebutFilter,
      dateFin: dateFinFilter,
    });
  };

  return (
    <div className="h-4/5 p-8 w-1/3 mr-[-50px] mt-5 ml-5">
      <h1 className="text-4xl font-bold mt-[-50px] mb-8">Chambres</h1>

      <h2 className="text-lg font-semibold mb-2">Filtrer les chambres</h2>
      <p className="mb-4 text-gray-600">
        Veuillez sélectionner au moins un filtre autre que le type.
      </p>
      <div className="mb-4">
        <label htmlFor="type" className="block font-medium mb-2">
          Type :
        </label>
        <select
          id="type"
          className="form-select block w-full"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option value="">Tous les types</option>
          <option value="Simple">Simple</option>
          <option value="Double">Double</option>
          <option value="Appartement">Appartement</option>
          <option value="Suite">Suite</option>
          <option value="Penthouse">Penthouse</option>
        </select>
      </div>

      {/* Filtrer par disponibilité */}
      <div className="mb-4">
        <label htmlFor="availability" className="flex items-center">
          <input
            id="availability"
            type="checkbox"
            className="form-checkbox mr-2"
            checked={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.checked)}
          />
          Disponibles maintenant
        </label>
      </div>

      {/* Filtrer par date de début */}
      <div className="mb-4">
        <label htmlFor="dateDebut" className="block font-medium mb-2">
          Date de début :
        </label>
        <input
          type="date"
          id="dateDebut"
          className="form-input w-full"
          value={dateDebutFilter}
          onChange={(e) => setDateDebutFilter(e.target.value)}
        />
      </div>

      {/* Filtrer par date de fin */}
      <div className="mb-4 ">
        <label htmlFor="dateFin" className="block font-medium mb-2">
          Date de fin :
        </label>
        <input
          type="date"
          id="dateFin"
          className="form-input w-full"
          value={dateFinFilter}
          onChange={(e) => setDateFinFilter(e.target.value)}
        />
      </div>

      {/* Bouton de filtrage */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
        onClick={handleFilterChange}
      >
        Filtrer
      </button>
    </div>
  );
};

export default ChambreSidebar;
