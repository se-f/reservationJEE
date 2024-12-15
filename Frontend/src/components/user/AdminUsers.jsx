import useAdminUsers from "../../hooks/user/useAdminUsers";

const AdminUsers = () => {
  const { users, editedUser, handleEdit, handleSave, handleChange } =
    useAdminUsers();

  return (
    <div className="admin-users">
      <h2>Admin - Users</h2>
      <table className="w-full border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">Username</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
            <th className="border border-gray-400 px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.username}>
              <td className="border border-gray-400 px-4 py-2">
                {editedUser && editedUser.username === user.username ? (
                  <input
                    type="text"
                    value={editedUser.username}
                    onChange={(e) => handleChange(e, "username")}
                    disabled
                  />
                ) : (
                  user.username
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedUser && editedUser.username === user.username ? (
                  <input
                    type="email"
                    value={editedUser.email}
                    onChange={(e) => handleChange(e, "email")}
                  />
                ) : (
                  user.email
                )}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {editedUser && editedUser.username === user.username ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(user)}
                    className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
