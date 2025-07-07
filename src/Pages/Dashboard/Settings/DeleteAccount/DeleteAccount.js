import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../../context/AuthContext';


export default function DeleteAccount() {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const { users, deleteLogout } = useAuthContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await axios.delete(`http://localhost:8000/api/auth/delete/${users?._id}`, {
        withCredentials: true,
      });

      if (res.data.success) {
        window.toastify(res.data.message, 'success');
        deleteLogout(); 
        navigate('/auth/login');
      } else {
        window.toastify('Failed to delete account', 'error');
      }
    } catch (err) {
      window.toastify(err.response?.data?.message || 'Something went wrong.', 'error');
    } finally {
      setLoading(false);
      setShowModal(false);
    }
  };

  return (
    <div className="dashboard-bg min-h-screen flex justify-center items-center px-4">
      <div className="card-bg w-full max-w-md p-6 text-center rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4 text-red-600">Delete Account</h2>
        <p className="text-gray-700 dark:text-white mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="btn-red w-full py-2 rounded font-semibold text-white bg-red-600 hover:bg-red-700"
        >
          Delete My Account
        </button>

        {/*==== Confirmation Modal ====*/}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-sm">
              <h3 className="text-lg font-semibold mb-4 text-red-600">Confirm Deletion</h3>
              <p className="text-sm mb-6 text-gray-600 dark:text-white">
                This will permanently delete your account. Are you sure?
              </p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 text-black font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDelete}
                  disabled={loading}
                  className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white font-medium"
                >
                  {loading ? 'Deleting...' : 'Yes, Delete'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
