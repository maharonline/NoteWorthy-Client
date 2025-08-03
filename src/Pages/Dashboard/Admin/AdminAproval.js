// import React, { useCallback, useEffect, useState } from 'react';
// import axios from 'axios';
// import { useAuthContext } from '../../../context/AuthContext';

// export default function AdminApprovalTable() {
//   const { ThemeToggle } = useAuthContext();
//   const [documents, setDocuments] = useState([]);
//   const [filteredDocuments, setFilteredDocuments] = useState([]);
//   const [searchText, setSearchText] = useState('');

//   const fetchTeachers = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/getallteachers`);
//       setDocuments(response?.data?.teacher);
//       setFilteredDocuments(response?.data?.teacher);
//     } catch (error) {
//       console.error('Error fetching Teachers:', error);
//     }
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//   }, [fetchTeachers]);

//   const handleApproved = async (teacher) => {
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/approvedTeacher`, teacher);
//       window.toastify(res?.data?.message, 'success');
//       const updated = documents.map((item) =>
//         item._id === teacher._id ? { ...item, status: 'Approved' } : item
//       );
//       setDocuments(updated);
//       setFilteredDocuments(updated);
//     } catch (error) {
//       console.error('Error approving teacher:', error);
//     }
//   };

//   const handleRejected = async (teacher) => {
//     try {
//       const res = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/rejectedTeacher`, teacher);
//       window.toastify(res.data.message, 'success');
//       const filtered = documents.filter((item) => item._id !== teacher._id);
//       setDocuments(filtered);
//       setFilteredDocuments(filtered);
//     } catch (error) {
//       console.error('Error rejecting teacher:', error);
//     }
//   };

//   const handleSearch = (value) => {
//     setSearchText(value);
//     const filtered = documents.filter(
//       (doc) =>
//         doc.userName.toLowerCase().includes(value.toLowerCase()) ||
//         doc.department.toLowerCase().includes(value.toLowerCase())
//     );
//     setFilteredDocuments(filtered);
//   };

//   return (
//     <div className="min-h-screen dashboard-bg px-4 py-8">
//       <div className="card-bg max-w-6xl mx-auto rounded-lg shadow p-6">
//         {/* Header */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h2 className="text-2xl font-bold text-blue-600">Teacher Approval Panel</h2>
//           <div className="hidden"><ThemeToggle /></div>
//           <input
//             type="text"
//             placeholder="Search by name or department..."
//             value={searchText}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-gray-700 px-4 py-2 rounded-md w-full md:w-72"
//           />
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto w-full">
//           <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 text-sm">
//             <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
//               <tr>
//                 <th className="border p-2">Employee ID</th>
//                 <th className="border p-2">User Name</th>
//                 <th className="border p-2">Department</th>
//                 <th className="border p-2">Status</th>
//                 <th className="border p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredDocuments.length > 0 ? (
//                 filteredDocuments.map((doc) => (
//                   <tr key={doc._id} className="text-center dark:text-white">
//                     <td className="border p-2">{doc.employeeID}</td>
//                     <td className="border p-2">{doc.userName}</td>
//                     <td className="border p-2">{doc.department}</td>
//                     <td className="border p-2">
//                       <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
//                         doc.status === 'pending'
//                           ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
//                           : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
//                       }`}>
//                         {doc.status}
//                       </span>
//                     </td>
//                     <td className="border p-2 ">
//                       <div className="flex flex-wrap justify-center gap-1">
//                       <button
//                         onClick={() => handleApproved(doc)}
//                         disabled={doc.status === 'Approved'}
//                         className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
//                       >
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleRejected(doc)}
//                         className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
//                       >
//                         Reject
//                       </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
//                     No pending teachers found.
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuthContext } from '../../../context/AuthContext';

export default function AdminApprovalTable() {
  const { ThemeToggle } = useAuthContext();
  const [documents, setDocuments] = useState([]);
  const [filteredDocuments, setFilteredDocuments] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [modalImage, setModalImage] = useState(null);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/getallteachers`);
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
      const updated = documents.map((item) =>
        item._id === teacher._id ? { ...item, status: 'Approved' } : item
      );
      setDocuments(updated);
      setFilteredDocuments(updated);
    } catch (error) {
      console.error('Error approving teacher:', error);
    }
  };

  const handleRejected = async (teacher) => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/teacher/rejectedTeacher`, teacher);
      window.toastify(res.data.message, 'success');
      const filtered = documents.filter((item) => item._id !== teacher._id);
      setDocuments(filtered);
      setFilteredDocuments(filtered);
    } catch (error) {
      console.error('Error rejecting teacher:', error);
    }
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
    <div className="min-h-screen dashboard-bg px-4 py-8">
      {/* ==== Modal ==== */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-70 flex justify-center items-center"
          onClick={() => setModalImage(null)}
        >
          <div
            className="bg-white dark:bg-gray-900 rounded-lg p-4 max-w-3xl w-80"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold text-gray-700 dark:text-white">Job Letter</h2>
              <button
                onClick={() => setModalImage(null)}
                className="text-gray-600 hover:text-red-500 dark:text-white"
              >
                ✖
              </button>
            </div>
            <img
              src={modalImage}
              alt="Job Letter"
              className="w-full h-auto rounded-lg border dark:border-gray-700"
            />
          </div>
        </div>
      )}

      <div className="card-bg max-w-6xl mx-auto rounded-lg shadow p-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-blue-600">Teacher Approval Panel</h2>
          <div className="hidden"><ThemeToggle /></div>
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchText}
            onChange={(e) => handleSearch(e.target.value)}
            className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-gray-700 px-4 py-2 rounded-md w-full md:w-72"
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto w-full">
          <table className="w-full table-auto border-collapse border border-gray-300 dark:border-gray-600 text-sm">
            <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white">
              <tr>
                <th className="border p-2">Job Letter</th>
                <th className="border p-2">User Name</th>
                <th className="border p-2">Department</th>
                <th className="border p-2">Status</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc._id} className="text-center dark:text-white">
                    <td className="border p-2 ">
                      <img
                        src={doc.jobLetterUrl}
                        alt="Job Letter"
                        className="w-16 h-16  object-cover rounded-full shadow hover:scale-105 transition-transform duration-200 cursor-pointer"
                        onClick={() => setModalImage(doc.jobLetterUrl)}
                      />
                    </td>
                    <td className="border p-2">{doc.userName}</td>
                    <td className="border p-2">{doc.department}</td>
                    <td className="border p-2">
                      <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                        doc.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                          : 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="border p-2 ">
                      <div className="flex flex-wrap justify-center gap-1">
                        <button
                          onClick={() => handleApproved(doc)}
                          disabled={doc.status === 'Approved'}
                          className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded disabled:opacity-50"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejected(doc)}
                          className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded"
                        >
                          Reject
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-4 text-gray-500 dark:text-gray-400">
                    No pending teachers found.
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

