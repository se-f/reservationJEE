import useChambres from "../../hooks/chambre/useChambres";

const AllChambres = () => {
  const token = localStorage.getItem("token");
  const {
    chambres,
    editedChambre,
    deleteConfirmation,
    deleteId,
    newChambre,
    handleDelete,
    handleEdit,
    handleSave,
    handleAddChambre,
    handleChange,
  } = useChambres(token);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Admin - Chambres</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Type"
          value={newChambre.type}
          onChange={(e) => handleChange(e, "type")}
          className="px-4 py-2 mr-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          placeholder="Description"
          value={newChambre.description}
          onChange={(e) => handleChange(e, "description")}
          className="px-4 py-2 mr-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          placeholder="Prix"
          value={newChambre.prix}
          onChange={(e) => handleChange(e, "prix")}
          className="px-4 py-2 mr-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          placeholder="Disponibilité"
          value={newChambre.disponibilite}
          onChange={(e) => handleChange(e, "disponibilite")}
          className="px-4 py-2 mr-2 border border-gray-400 rounded"
        />
        <input
          type="text"
          placeholder="Image URL"
          value={newChambre.image}
          onChange={(e) => handleChange(e, "image")}
          className="px-4 py-2 mr-2 border border-gray-400 rounded"
        />
        <button
          onClick={handleAddChambre}
          className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
        >
          Add Chambre
        </button>
      </div>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Type</th>
            <th className="border border-gray-400 px-4 py-2">Description</th>
            <th className="border border-gray-400 px-4 py-2">Prix</th>
            <th className="border border-gray-400 px-4 py-2">Disponibilité</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {chambres.map((chambre) => (
            <tr key={chambre.idchambre}>
              <td className="border border-gray-400 px-4 py-2">
                {chambre.idchambre}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {chambre.type}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedChambre &&
                editedChambre.idchambre === chambre.idchambre ? (
                  <input
                    type="text"
                    value={editedChambre.description}
                    onChange={(e) => handleChange(e, "description")}
                  />
                ) : (
                  chambre.description
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedChambre &&
                editedChambre.idchambre === chambre.idchambre ? (
                  <input
                    type="text"
                    value={editedChambre.prix}
                    onChange={(e) => handleChange(e, "prix")}
                  />
                ) : (
                  chambre.prix
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedChambre &&
                editedChambre.idchambre === chambre.idchambre ? (
                  <input
                    type="text"
                    value={editedChambre.disponibilite}
                    onChange={(e) => handleChange(e, "disponibilite")}
                  />
                ) : (
                  chambre.disponibilite
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {deleteConfirmation && chambre.idchambre === deleteId ? (
                  <button
                    onClick={() => handleDelete(chambre.idchambre)}
                    className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                  >
                    Confirm
                  </button>
                ) : (
                  <>
                    {!editedChambre ||
                    editedChambre.idchambre !== chambre.idchambre ? (
                      <button
                        onClick={() => handleEdit(chambre)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                      >
                        Save
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(chambre.idchambre)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded ml-2"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllChambres;
