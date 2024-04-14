import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [editedUser, setEditedUser] = useState(null);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8081/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [token, deleteConfirmation, editedUser]);

  const handleDelete = async (id) => {
    if (!deleteConfirmation) {
      setDeleteConfirmation(true);
      setDeleteId(id);
    } else {
        console.log(deleteId)
      try {
        await axios.delete(`http://localhost:8081/users/${deleteId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.iduser !== deleteId)
        );
        setDeleteConfirmation(false);
        setDeleteId("");
        toast.success("User deleted successfully!", {
          position: "bottom-center",
        });
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleEdit = (user) => {
    setEditedUser(user);
  };

  const handleSave = async () => {
    try {
      console.log(editedUser);
      console.log(editedUser.username);

      delete editedUser.authorities;
      delete editedUser.accountNonExpired;
      delete editedUser.accountNonLocked;
      delete editedUser.credentialsNonExpired;
      delete editedUser.enabled;
      await axios.put(
        `http://localhost:8081/users/${editedUser.username}`,
        editedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditedUser(null);
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-6">Admin - Users</h1>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">ID</th>
            <th className="border border-gray-400 px-4 py-2">Username</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Role</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.iduser}>
              <td className="border border-gray-400 px-4 py-2">
                {user.iduser}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {user.username}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedUser && editedUser.iduser === user.iduser ? (
                  <input
                    type="text"
                    value={editedUser.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedUser && editedUser.iduser === user.iduser ? (
                  <input
                    type="text"
                    value={editedUser.role}
                    onChange={(e) => handleChange(e, "role")}
                  />
                ) : (
                  user.role
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {deleteConfirmation && user.username === deleteId ? (
                  <>
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
                    >
                      Confirm
                    </button>
                  </>
                ) : (
                  <>
                    {!editedUser || editedUser.iduser !== user.iduser ? (
                      <button
                        onClick={() => handleEdit(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        onClick={handleSave}
                        className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
                      >
                        Save
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setDeleteConfirmation(true);
                        setDeleteId(user.username);
                      }}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
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

export default AllUsers;
