import { useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../../context/AuthContext';

export default function PasswordUpdate() {
  const { users } = useAuthContext();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData;

    if (!currentPassword || !newPassword || !confirmPassword) {
      return window.toastify('Please fill in all fields.', 'error');
    }

    if (newPassword !== confirmPassword) {
      return window.toastify("New passwords don't match.", 'error');
    }

    setLoading(true);
    try {
      const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/auth/updatePassword/${users?._id}`,
        {
          currentPassword,
          newPassword,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        window.toastify(res.data.message, 'success');
        setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        window.toastify(res.data.message || 'Password update failed.', 'error');
      }
    } catch (err) {
      window.toastify(
        err.response?.data?.message || 'Something went wrong.',
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-bg min-h-screen flex justify-center items-center px-4">
      <form
        onSubmit={handleSubmit}
        className="card-bg w-full max-w-md p-6 rounded shadow"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Update Password</h2>

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
          Current Password
        </label>
        <input
          type="password"
          name="currentPassword"
          value={formData.currentPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
          New Password
        </label>
        <input
          type="password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />

        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-white">
          Confirm New Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn-blue w-full py-2 text-white rounded-md font-semibold"
        >
          {loading ? <span className="loading loading-spinner loading-xl"></span> : 'Update Password'}
        </button>
      </form>
    </div>
  );
}
