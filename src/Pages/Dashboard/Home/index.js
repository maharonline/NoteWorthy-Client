// import React, { useCallback, useEffect, useRef, useState } from 'react';
// import { MdFavoriteBorder } from "react-icons/md";
// import { useAuthContext } from '../../../context/AuthContext';
// import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,} from 'recharts';
// import { Link } from 'react-router-dom';
// import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
// import axios from 'axios';


// const Home = () => {
//   const [Teacher, setTeacher] = useState([]);
//   const [Student, setStudent] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [isOpen, setIsOpen] = useState(false);
//   const [totalDownlad, setTotalDownload] = useState([])
//   const [RecentDownload, setRecentDownload] = useState([])
//   const [notes, setNotes] = useState([]);
//   const [getTeacherUpload, setGetTeacherUpload] = useState([])
//   const dropdownRef = useRef();

//   const { users, handleLogout, ThemeToggle } = useAuthContext();
//   const firstLetter = users?.userName?.charAt(0).toUpperCase();
//   // const joinedDate = users?.createdAt ? new Date(users.createdAt).toDateString() : "N/A";



//   const handleDelete = async (item) => {
//     try {
//       const id = item._id

//       const res = await axios.delete(`${process.env.REACT_APP_API_URL}/favourite/delete/${id}`);
//       setFavorites((prev) => prev.filter(fav => fav._id !== id));

//       window.toastify(res.data.message, "success")

//     } catch (error) {
//       window.toastify(error?.response?.data?.message, "error");
//     }
//   }

//   const getDownloadSummary = useCallback(async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/summary`, {
//         params: { userId: users._id }
//       });
//       setTotalDownload(res?.data.summary)
//       console.log("Downloaded notes:", res.data.summary);
//     } catch (error) {
//       console.error("Error fetching download summary:", error.message);
//     }
//   }, [users._id])
//   const getNotesUploadedByTeacher = useCallback(async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/getNotesUploadedByTeacher`, {
//         params: { uploadedBy: users._id }
//       });
//       setGetTeacherUpload(res?.data.summary)
//       console.log("Teacher Uploaded notes:", res.data);
//     } catch (error) {
//       console.error("Error fetching download summary:", error.message);
//     }
//   }, [users._id])
//   const getRecentDownload = useCallback(async () => {
//     try {
//       const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/recentDownload`, {
//         params: { userId: users._id }
//       });

//       setRecentDownload(res?.data)
//       console.log("Downloaded notes:", res.data);
//     } catch (error) {
//       console.error("Error fetching download summary:", error.message);
//     }
//   }, [users._id])

//   const fetchTeachers = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/getallteachers`);
//       if (response?.data?.success) {
//         setTeacher(response?.data?.count);
//       }
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   }, []);

//   const fetchStudent = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/getallStudent`);
//       if (response?.data?.success) {
//         setStudent(response?.data?.count);
//       }
//     } catch (error) {
//       console.error("Error fetching students:", error);
//     }
//   }, []);

//   const fetchFavorites = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/favourite/${users?._id}`);
//       if (response.data.success) {
//         setFavorites(response?.data?.favorites);
//         console.log("New favorites from server: ", response.data.favorites);
//       }
//     } catch (error) {
//       console.error("Failed to fetch favorites:", error);
//     }
//   }, [users?._id]);

//   const fetchNotes = useCallback(async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.REACT_APP_API_URL}/notes/user/${users?._id}`
//       );
//       setNotes(res.data.notes || []);
//       console.log("Fetched Notes:", res.data.notes);
//     } catch (err) {
//       console.error("Failed to fetch notes", err);
//     } finally {

//     }
//   }, [users?._id]);


//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       // Agar clicked element dropdownRef ke andar nahi hai
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         setIsOpen(false);
//       }
//     };

//     //  Use "click" instead of "mousedown" to ensure window.open works before closing
//     document.addEventListener("click", handleClickOutside);

//     return () => {
//       document.removeEventListener("click", handleClickOutside);
//     };
//   }, []);

//   useEffect(() => {
//     fetchTeachers();
//     fetchFavorites()
//     fetchStudent();
//     getDownloadSummary()
//     fetchNotes()
//     getRecentDownload()
//     getNotesUploadedByTeacher()
//   }, [fetchTeachers, fetchNotes, getNotesUploadedByTeacher, fetchStudent, fetchFavorites, getDownloadSummary, getRecentDownload]);





//   return (
//     <div className="min-h-screen dashboard-bg">
//       <div className="max-w-full mx-auto px-3 py-4">

//         {/*==== Header ====*/}
//         <div className="flex flex-wrap justify-end items-center border-b pb-3 gap-3 dark:border-gray-700">
//           <div className="flex items-center gap-2">



//             <div className="relative inline-block" ref={dropdownRef}>
//               {/*==== Button with Badge ====*/}
//               <button onClick={() => setIsOpen(!isOpen)} className="relative">
//                 <div className="absolute -top-3 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
//                   {favorites.length}
//                 </div>
//                 <MdFavoriteBorder className="text-4xl text-blue-500" />
//               </button>
//             </div>


//             {isOpen && (
//               <div className="absolute top-20 right-2 mt-2 w-96 bg-white dark:bg-gray-800 dark:text-white  shadow-lg rounded-md border border-blue-600 z-50">
//                 <div className="p-4 max-h-60 overflow-y-auto">
//                   {favorites.length === 0 ? (
//                     <p className="text-gray-500 text-center">No favorites yet</p>
//                   ) : (
//                     favorites.map((item, index) => (
//                       <div
//                         key={index}
//                         className="flex justify-between items-center py-2 border-b border-blue-600"
//                       >
//                         <div className="flex flex-col">
//                           <span className="text-lg  dark:text-white">{item.title}</span>

//                         </div>
//                         <div className="flex space-x-1">
//                           <button
//                               className='text-blue-600 hover:text-blue-800'
//                             onClick={(e) => {
//                               e.stopPropagation(); // Prevent dropdown from closing
//                               const link = document.createElement("a");
//                               link.href = item.fileUrl;
//                               link.target = "_blank";
//                               link.rel = "noopener noreferrer";
//                               document.body.appendChild(link);
//                               link.click();
//                               document.body.removeChild(link);
//                             }}
//                           >
//                             <EyeIcon className="w-7 h-7  " />
//                           </button>


//                           <button
//                             onClick={(e) => {
//                               e.stopPropagation();
//                               handleDelete(item);
//                             }}
//                             className="p-1 text-red-500 hover:text-red-700"
//                           >
//                             <TrashIcon className="w-6 h-6" />
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>
//             )}


//             <ThemeToggle />
//           </div>
//           <div className="dropdown dropdown-end">
//             <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
//               <div className="w-10 rounded-full">
//                 {users?.photoURL ? (
//                   <img alt="User" src={users?.photoURL} />
//                 ) : (
//                   <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-blue-600 flex items-center justify-center text-sm font-bold">
//                     {firstLetter}
//                   </div>
//                 )}
//               </div>
//             </div>
//             <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 dark:bg-gray-800 rounded-box mt-3 w-44 p-2 shadow z-50">
//               <li><Link to="/dashboard/profile">Profile</Link></li>
              
//               <li><Link onClick={handleLogout}>Logout</Link></li>
//             </ul>
//           </div>
//         </div>

//         {/*==== Welcome ====*/}
//         <h1 className="text-xl font-semibold mt-4">Welcome back, {users?.userName}!</h1>

//         {/* User Info Cards */}
//         {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
//           {[
//             { label: "Role", value: users?.roles?.[0], bold: true },
//             { label: "Name", value: users?.userName, bold: true },
//             { label: "Joined", value: joinedDate, bold: true },
//             { label: "Email", value: users?.email, bold: false },
//           ].map((item, i) => (
//             <div key={i} className="dashboard-card">
//               <p className="text-sm text-blue-700">{item.label}</p>
//               <p className={`text-sm ${item.bold ? "text-xl font-semibold" : ""}`}>
//                 {item.value}
//               </p>
//             </div>
//           ))}
//         </div> */}

//         {/* Quick Actions */}
//         {/* <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
//           {users?.roles?.includes("Teacher") && (
//             <Link to="/dashboard/upload" className="bg-blue-600 text-white p-3 rounded shadow hover:bg-blue-700 text-sm text-center">📤 Upload Note</Link>
//           )}
//           <Link to="/dashboard/mynotes" className="bg-green-600 text-white p-3 rounded shadow hover:bg-green-700 text-sm text-center">📚 My Notes</Link>
//           <Link to="/dashboard/profile" className="bg-purple-600 text-white p-3 rounded shadow hover:bg-purple-700 text-sm text-center">👤 Edit Profile</Link>
//           <Link to="/support" className="bg-red-600 text-white p-3 rounded shadow hover:bg-red-700 text-sm text-center">🛠 Support</Link>
//         </div> */}


//         {/*==== Notifications ====*/}
//         <div className="mt-6">
//           <h2 className="font-semibold text-base mb-2">Notifications</h2>
//           <ul className="space-y-2 text-sm">
//             <li className="card-bg p-2 rounded">📥 New notes uploaded in "Operating Systems".</li>
//             <li className="card-bg p-2 rounded">📢 Maintenance scheduled on Sunday (2AM–4AM)</li>
//           </ul>
//         </div>

//         {/*==== Charts ====*/}
//         <div className="mt-6 space-y-6">
//           {users?.roles?.includes("Admin") && (
//             <div>
//               <h2 className="text-base font-semibold mb-2">User Statistics</h2>
//               <div className="w-full h-60">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={[{ role: 'Students', count: Student }, { role: 'Teachers', count: Teacher }]}>
//                     <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//                     <XAxis dataKey="role" stroke="currentColor" />
//                     <YAxis stroke="currentColor" />
//                     <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
//                     <Bar dataKey="count" fill="#1E88E5" />
//                   </BarChart>
//                 </ResponsiveContainer>

//               </div>
//             </div>
//           )}

//           {users?.roles?.includes("Teacher") && (
//             <div>
//               <h2 className="text-base font-semibold mb-2">Notes Uploaded</h2>
//               <div className="w-full h-60">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={getTeacherUpload}>
//                     <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//                     <XAxis dataKey="month" stroke="currentColor" />
//                     <YAxis stroke="currentColor" />
//                     <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
//                     <Bar dataKey="notes" fill="#1E88E5" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           )}

//           {users?.roles?.includes("Student") && (
//             <div>
//               <h2 className="text-base font-semibold mb-2">Notes Downloaded</h2>
//               <div className="w-full h-60">
//                 <ResponsiveContainer width="100%" height="100%">
//                   <BarChart data={totalDownlad}>
//                     <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
//                     <XAxis dataKey="month" stroke="currentColor" />
//                     <YAxis stroke="currentColor" />
//                     <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
//                     <Bar dataKey="downloads" fill="#1e549f" />
//                   </BarChart>
//                 </ResponsiveContainer>
//               </div>
//             </div>
//           )}



//         </div>

//         {/*==== Recent Activity Table ====*/}

//         <div className="mt-8">
//           <h2 className="text-base font-semibold mb-2">Recent Activity</h2>
//           <div className="overflow-x-auto rounded-lg shadow">
//             <table className="min-w-full text-sm border border-gray-200 dark:border-gray-700">
//               <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-left">
//                 <tr>
//                   <th className="px-4 py-3">📘 Department</th>
//                   <th className="px-4 py-3">📖 Subject</th>
//                   <th className="px-4 py-3">📄 Notes</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {(users?.roles?.includes("Teacher") || users?.roles?.includes("Admin")
//                   ? notes
//                   : RecentDownload?.recentDownload
//                 )?.map((item, idx) => (
//                   <tr
//                     key={idx}
//                     className={`border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${idx % 2 === 0
//                         ? "bg-white dark:bg-gray-900"
//                         : "bg-gray-50 dark:bg-gray-800"
//                       }`}
//                   >
//                     <td className="px-4 py-2">BSCS</td>
//                     <td className="px-4 py-2">{item?.subjectTitle?.trim() || "-"}</td>
//                     <td className="px-4 py-2">{item?.title}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>





//         {/* Footer */}
//         <footer className="text-xs text-black text-center mt-10 mb-4">
//           v1.0.0 • © 2025 NoteWorthy • <Link to="/privacy" className="underline">Privacy Policy</Link>
//         </footer>
//       </div>
//     </div>
//   );
// };

// export default Home;

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MdFavoriteBorder } from "react-icons/md";
import { useAuthContext } from '../../../context/AuthContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Link } from 'react-router-dom';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';

const Home = () => {
  const [Teacher, setTeacher] = useState([]);
  const [Student, setStudent] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [totalDownlad, setTotalDownload] = useState([]);
  const [RecentDownload, setRecentDownload] = useState([]);
  const [notes, setNotes] = useState([]);
  const [getTeacherUpload, setGetTeacherUpload] = useState([]);
  const dropdownRef = useRef();

  const { users, handleLogout, ThemeToggle } = useAuthContext();
  const firstLetter = users?.userName?.charAt(0).toUpperCase();

  const handleDelete = async (item) => {
    try {
      const id = item._id;
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/favourite/delete/${id}`);
      setFavorites((prev) => prev.filter(fav => fav._id !== id));
      window.toastify(res.data.message, "success");
    } catch (error) {
      window.toastify(error?.response?.data?.message, "error");
    }
  };

  const getDownloadSummary = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/summary`, {
        params: { userId: users._id }
      });
      setTotalDownload(res?.data.summary);
    } catch (error) {
      console.error("Error fetching download summary:", error.message);
    }
  }, [users._id]);

  const getNotesUploadedByTeacher = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/getNotesUploadedByTeacher`, {
        params: { uploadedBy: users._id }
      });
      setGetTeacherUpload(res?.data.summary);
    } catch (error) {
      console.error("Error fetching teacher notes:", error.message);
    }
  }, [users._id]);

  const getRecentDownload = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/recentDownload`, {
        params: { userId: users._id }
      });
      setRecentDownload(res?.data);
    } catch (error) {
      console.error("Error fetching recent download:", error.message);
    }
  }, [users._id]);

  const fetchTeachers = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/teacher/getallteachers`);
      if (response?.data?.success) {
        setTeacher(response?.data?.count);
      }
    } catch (error) {
      console.error("Error fetching teachers:", error);
    }
  }, []);

  const fetchStudent = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/auth/getallStudent`);
      if (response?.data?.success) {
        setStudent(response?.data?.count);
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  }, []);

  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/favourite/${users?._id}`);
      if (response.data.success) {
        setFavorites(response?.data?.favorites);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  }, [users?._id]);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/user/${users?._id}`);
      setNotes(res.data.notes || []);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  }, [users?._id]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchTeachers();
    fetchFavorites();
    fetchStudent();
    getDownloadSummary();
    fetchNotes();
    getRecentDownload();
    getNotesUploadedByTeacher();
  }, [fetchTeachers, fetchNotes, getNotesUploadedByTeacher, fetchStudent, fetchFavorites, getDownloadSummary, getRecentDownload]);

  return (
   <div className="min-h-screen dashboard-bg">
  <div className="max-w-full mx-auto px-3 py-4">

    {/* ==== Header ==== */}
    <div className="flex flex-wrap justify-end items-center border-b pb-3 gap-3 dark:border-gray-700">
      <div className="flex items-center gap-2">
        <div className="relative inline-block" ref={dropdownRef}>
          <button onClick={() => setIsOpen(!isOpen)} className="relative">
            <div className="absolute -top-3 -right-1 bg-blue-600 text-white text-xs rounded-full px-1.5 py-0.5">
              {favorites.length}
            </div>
            <MdFavoriteBorder className="text-4xl text-blue-500" />
          </button>
        </div>

        {isOpen && (
          <div className="absolute top-20 right-2 sm:right-4 mt-2 w-[90vw] max-w-xs bg-white dark:bg-gray-800 dark:text-white shadow-lg rounded-md border border-blue-600 z-50">
            <div className="p-4 max-h-60 overflow-y-auto">
              {favorites.length === 0 ? (
                <p className="text-gray-500 text-center">No favorites yet</p>
              ) : (
                favorites.map((item, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-blue-600">
                    <div className="flex flex-col">
                      <span className="text-lg dark:text-white">{item.title}</span>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        className='text-blue-600 hover:text-blue-800'
                        onClick={(e) => {
                          e.stopPropagation();
                          const link = document.createElement("a");
                          link.href = item.fileUrl;
                          link.target = "_blank";
                          link.rel = "noopener noreferrer";
                          document.body.appendChild(link);
                          link.click();
                          document.body.removeChild(link);
                        }}
                      >
                        <EyeIcon className="w-7 h-7" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(item);
                        }}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <TrashIcon className="w-6 h-6" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        <ThemeToggle />
      </div>

      {/* Avatar Dropdown */}
      <div className="dropdown dropdown-end">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            {users?.photoURL ? (
              <img alt="User" src={users?.photoURL} />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 text-blue-600 flex items-center justify-center text-sm font-bold">
                {firstLetter}
              </div>
            )}
          </div>
        </div>
        <ul tabIndex={0} className="menu menu-sm dropdown-content w-[90vw] max-w-xs bg-base-100 dark:bg-gray-800 rounded-box mt-3 p-2 shadow z-50">
          <li><Link to="/dashboard/profile">Profile</Link></li>
          <li><Link onClick={handleLogout}>Logout</Link></li>
        </ul>
      </div>
    </div>

    {/* Welcome */}
    <h1 className="text-xl font-semibold mt-4">Welcome back, {users?.userName}!</h1>

    {/* Notifications */}
    <div className="mt-6">
      <h2 className="font-semibold text-base mb-2">Notifications</h2>
      <ul className="space-y-2 text-sm">
        <li className="card-bg p-2 rounded">📥 New notes uploaded in "Operating Systems".</li>
        <li className="card-bg p-2 rounded">📢 Maintenance scheduled on Sunday (2AM–4AM)</li>
      </ul>
    </div>

    {/* Charts */}
    <div className="mt-6 space-y-6">
      {users?.roles?.includes("Admin") && (
        <div>
          <h2 className="text-base font-semibold mb-2">User Statistics</h2>
          <div className="w-full h-[180px] sm:h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[{ role: 'Students', count: Student }, { role: 'Teachers', count: Teacher }]}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="role" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
                <Bar dataKey="count" fill="#1E88E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {users?.roles?.includes("Teacher") && (
        <div>
          <h2 className="text-base font-semibold mb-2">Notes Uploaded</h2>
          <div className="w-full h-[180px] sm:h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={getTeacherUpload}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
                <Bar dataKey="notes" fill="#1E88E5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {users?.roles?.includes("Student") && (
        <div>
          <h2 className="text-base font-semibold mb-2">Notes Downloaded</h2>
          <div className="w-full h-[180px] sm:h-[220px] md:h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={totalDownlad}>
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis dataKey="month" stroke="currentColor" />
                <YAxis stroke="currentColor" />
                <Tooltip contentStyle={{ backgroundColor: '#1f2937', borderRadius: '8px' }} />
                <Bar dataKey="downloads" fill="#1e549f" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>

    {/* Recent Activity Table */}
    <div className="mt-8">
      <h2 className="text-base font-semibold mb-2">Recent Activity</h2>
      <div className="overflow-x-auto w-full max-w-full rounded-lg shadow">
        <table className="min-w-full text-sm table-auto border border-gray-200 dark:border-gray-700">
          <thead className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white text-left">
            <tr>
              <th className="px-2 py-1 sm:px-4 sm:py-2">📘 Department</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2">📖 Subject</th>
              <th className="px-2 py-1 sm:px-4 sm:py-2">📄 Notes</th>
            </tr>
          </thead>
          <tbody>
            {(users?.roles?.includes("Teacher") || users?.roles?.includes("Admin")
              ? notes
              : RecentDownload?.recentDownload
            )?.map((item, idx) => (
              <tr key={idx} className={`border-t dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition ${idx % 2 === 0 ? "bg-white dark:bg-gray-900" : "bg-gray-50 dark:bg-gray-800"}`}>
                <td className="px-2 py-1 sm:px-4 sm:py-2 break-words text-[13px]">BSCS</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 break-words text-[13px]">{item?.subjectTitle || "-"}</td>
                <td className="px-2 py-1 sm:px-4 sm:py-2 break-words text-[13px]">{item?.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Footer */}

    <footer className="text-xs heading-color text-center mt-10 mb-4">
  v1.0.0 • © 2025 NoteWorthy • <Link to="/privacy" className="underline">Privacy Policy</Link>
</footer>


  </div>
</div>

  );
};

export default Home;

