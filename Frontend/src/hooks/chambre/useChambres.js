import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  fetchChambres,
  deleteChambre,
  updateChambre,
  addChambre,
} from "../../services/ChambreService";

const useChambres = (token) => {
    
  const [chambres, setChambres] = useState([]);
  const [editedChambre, setEditedChambre] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [newChambre, setNewChambre] = useState({
    type: "",
    description: "",
    prix: "",
    disponibilite: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchChambres(token);
        setChambres(data);
      } catch (error) {
        console.error("Error fetching chambres:", error);
      }
    };
    fetchData();
  }, [token, deleteConfirmation, editedChambre]);

  const handleDelete = async (id) => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      setDeleteId(id);
    } else {
      try {
        await deleteChambre(deleteId, token);
        setChambres((prevChambres) =>
          prevChambres.filter((chambre) => chambre.idchambre !== deleteId)
        );
        setDeleteConfirmation(false);
        setDeleteId("");
        toast.success("Chambre deleted successfully!", {
          position: "bottom-center",
        });
      } catch (error) {
        console.error("Error deleting chambre:", error);
      }
    }
  };

  const handleEdit = (chambre) => {
    setEditedChambre(chambre);
  };

  const handleSave = async () => {
    try {
      await updateChambre(editedChambre.idchambre, editedChambre, token);
      setEditedChambre(null);
      toast.success("Chambre updated successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error updating chambre:", error);
    }
  };

  const handleAddChambre = async () => {
    try {
      await addChambre(newChambre, token);
      setNewChambre({
        type: "",
        description: "",
        prix: "",
        disponibilite: "",
        image: "",
      });
      toast.success("Chambre added successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error adding chambre:", error);
    }
  };

  const handleChange = (e, field) => {
    if (editedChambre) {
      setEditedChambre({
        ...editedChambre,
        [field]: e.target.value,
      });
    } else {
      setNewChambre({
        ...newChambre,
        [field]: e.target.value,
      });
    }
  };

  return {
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
  };
};

export default useChambres;
