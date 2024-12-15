import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { fetchUserData, updateUser } from "../../services/UserService";

const useUserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await fetchUserData(username, token);
        setUser(data);
        setEditedUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUser();
  }, [username, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = { ...editedUser, password };
      await updateUser(username, updatedUser, token);
      setUser(updatedUser);
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Error updating user data:", error);
      toast.error("Error updating profile");
    }
  };

  return {
    user,
    editedUser,
    password,
    handleChange,
    handlePasswordChange,
    handleSubmit,
  };
};

export default useUserProfile;