import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function DeletedUsersTable() {
  const [deletedUsers, setDeletedUsers] = useState([]);
  const [search, setSearch] = useState('');

  const fetchDeletedUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/deletedUser/getDeletedUser` );
      setDeletedUsers(res.data.deletedUsers);
    } catch (error) {
      console.error('Failed to fetch deleted users:', error);
    }
  };

  useEffect(() => {
    fetchDeletedUsers();
  }, []);

  const handleRestore = async (id) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/deletedUser/restoreUser/${id}`, {}, {
        withCredentials: true,
      });
      if (res.data.success) {
        window.toastify(res.data.message, 'success');
        fetchDeletedUsers(); // Refresh list
      } else {
        window.toastify('Failed to restore user', 'error');
      }
    } catch (err) {
      console.error(err);
      window.toastify('Error while restoring user', 'error');
    }
  };

  const handleExportCSV = () => {
    const csv = [
      ['Email', 'User Name', 'Roles', 'Deleted At', 'Source'],
      ...deletedUsers.map((u) => [
        u.email,
        u.userName || '-',
        u.roles.join(', '),
        new Date(u.deletedAt).toLocaleString(),
        u.source
      ])
    ].map((row) => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'deleted_users_report.csv';
    a.click();
  };

  const filteredUsers = deletedUsers.filter((user) =>
    user.email.toLowerCase().includes(search.toLowerCase()) ||
    user.roles.join(', ').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen dashboard-bg px-4 py-8">
      <div className="card-bg max-w-6xl mx-auto rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-red-600">Deleted Users</h2>
          <button
            onClick={handleExportCSV}
            className="btn-green px-4 py-2 rounded font-semibold bg-green-600 text-white hover:bg-green-700"
          >
            Export CSV
          </button>
        </div>

        <input
          type="text"
          placeholder="Search by email or role..."
          className="w-full p-2 mb-4 rounded border border-gray-300 dark:bg-gray-700 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="overflow-x-auto">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
              <tr>
                <th className="border p-2">Email</th>
                <th className="border p-2">User Name</th>
                <th className="border p-2">Role</th>
                <th className="border p-2">Deleted At</th>
                <th className="border p-2">Source</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length > 0 ? (
                filteredUsers.map((user) => (
                  <tr key={user._id} className="text-center dark:text-white">
                    <td className="border p-2">{user.email}</td>
                    <td className="border p-2">{user.userName || '-'}</td>
                    <td className="border p-2">{user.roles.join(', ')}</td>
                    <td className="border p-2">{new Date(user.deletedAt).toLocaleString()}</td>
                    <td className="border p-2 capitalize">{user.source}</td>
                    <td className="border p-2">
                      <button
                        onClick={() => handleRestore(user._id)}
                        className="text-blue-600 hover:underline"
                      >
                        Restore
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No deleted users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
