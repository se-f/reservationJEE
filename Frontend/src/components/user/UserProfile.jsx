import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [password, setPassword] = useState("");
  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8081/users/${username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUser(response.data);
        setEditedUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchUser();
  }, [username, token]);

  const handleSave = async () => {
    try {
      delete editedUser.authorities;
      delete editedUser.accountNonExpired;
      delete editedUser.accountNonLocked;
      delete editedUser.credentialsNonExpired;
      delete editedUser.enabled;
      await axios.put(`http://localhost:8081/users/${username}`, editedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("User updated successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleChange = (e, field) => {
    setEditedUser({
      ...editedUser,
      [field]: e.target.value,
    });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSave = async () => {
    try {
      console.log("password", password);
      await axios.put(
        `http://localhost:8081/users/${username}/password`,
        { password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPassword("");
      toast.success("Password updated successfully!", {
        position: "bottom-center",
      });
    } catch (error) {
      console.error("Error updating password:", error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-10 w-3/5">
      <h1 className="text-3xl font-semibold mb-6">Profile</h1>
      <div className="mb-4">
        <label className="block mb-2">Username</label>
        <input
          type="text"
          value={editedUser.username}
          onChange={(e) => handleChange(e, "username")}
          className="px-4 py-2 w-full border border-gray-400 rounded mb-2 bg-gray-300"
          readOnly

        />
        <label className="block mb-2">Email</label>
        <input
          type="email"
          value={editedUser.email}
          onChange={(e) => handleChange(e, "email")}
          className="px-4 py-2 w-full border border-gray-400 rounded mb-2"
        />
        
        <button
          onClick={handleSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sauvegarder
        </button>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Modifier le mot de passe</h2>
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          className="px-4 py-2 w-full border border-gray-400 rounded mb-2"
          placeholder="Nouveau mot de passe"
        />
        <button
          onClick={handlePasswordSave}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Sauvegarder mot de passe
        </button>
      </div>
    </div>
  );
};

export default UserProfile;
