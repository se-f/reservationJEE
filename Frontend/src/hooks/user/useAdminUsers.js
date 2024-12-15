import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchAllUsers, updateUser } from "../../services/UserService";

const useAdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await fetchAllUsers(token);
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token]);

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      await updateUser(editedUser.username, editedUser, token);
      setEditedUser(null);
      toast.success("User updated successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
    }
  };

  const handleChange = (e, field) => {
    setEditedUser({
      ...editedUser,
      [field]: e.target.value,
    });
  };

  return {
    users,
    editedUser,
    handleEdit,
    handleSave,
    handleChange,
  };
};

export default useAdminUsers;