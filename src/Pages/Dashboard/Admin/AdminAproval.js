import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';


export default function AdminApprovalTable() {
  const { ThemeToggle } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/getallteachers`)

      setDocuments(response?.data?.teacher);
      setFilteredDocuments(response?.data?.teacher);
    } catch (error) {
      console.error('Error fetching Teachers:', error);
    }
  }, []);

  useEffect(() => {
    fetchTeachers();
  }, [fetchTeachers]);

  const handleApproved = async (teacher) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/approvedTeacher`, teacher);
      window.toastify(res?.data?.message, 'success');
    } catch (error) {
      console.error('Error completing the todo: ', error);
    }
    const updated = documents.map((item) =>
      item._id === teacher._id ? { ...item, status: 'Approved' } : item
    );
    setDocuments(updated);
    setFilteredDocuments(updated);
  };

  const handleRejected = async (teacher) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/rejectedTeacher`, teacher);
      window.toastify(res.data.message, 'success');
    } catch (error) {
      console.error('Error deleting the todo: ', error);
    }
    const filtered = documents.filter((item) => item._id !== teacher._id);
    setDocuments(filtered);
    setFilteredDocuments(filtered);
  };

  const handleSearch = (value) => {
    setSearchText(value);
    const filtered = documents.filter(
      (doc) =>
        doc.userName.toLowerCase().includes(value.toLowerCase()) ||
        doc.department.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredDocuments(filtered);
  };

  return (
    <>

      <div className="flex min-h-screen font-raleway text-gray-800 dark:text-white">
        <main className="flex-1 p-6 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <h1 className="text-2xl font-bold">Teacher Approval Panel</h1>
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
              <div className="hidden">
                <ThemeToggle />
              </div>
              <input
                type="text"
                placeholder="Search teachers..."
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
                className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-[#1e293b] px-4 py-2 rounded-md w-full md:w-80"
              />
            </div>
          </div>

          {/*==== Table ====*/}
          <div className="overflow-x-auto shadow-md rounded-xl card-bg">
            <table className="min-w-full divide-y  divide-gray-300 dark:divide-gray-800">
              <thead className="card-bg">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Employee ID</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">User Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Department</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredDocuments.map((doc) => (
                  <tr key={doc._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                    <td className="px-6 py-4 text-sm">{doc.employeeID}</td>
                    <td className="px-6 py-4 text-sm">{doc.userName}</td>
                    <td className="px-6 py-4 text-sm">{doc.department}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${doc.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                          : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                          }`}
                      >
                        {doc.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-6 py-4 space-x-2 text-sm">
                      <button
                        onClick={() => handleApproved(doc)}
                        className={`px-3 py-1 rounded text-white bg-green-600 hover:bg-green-700 transition disabled:opacity-50`}
                        disabled={doc.status === 'Approved'}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejected(doc)}
                        className="px-3 py-1 rounded text-white bg-red-600 hover:bg-red-700 transition"
                      >
                        Reject
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </div>

    </>
  );
}
