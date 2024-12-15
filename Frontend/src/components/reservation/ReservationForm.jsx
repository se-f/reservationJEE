import { useReservationForm } from "../../hooks/reservation/useReservationForm";

const ReservationForm = () => {
  const { formData, handleChange, handleSubmit } = useReservationForm();

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
            className="form-input mt-1 block w-full rounded-md px-4 py-2 bg-slate-100"
            required
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-md px-6 py-2 mt-4"
          >
            Réserver
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReservationForm;
