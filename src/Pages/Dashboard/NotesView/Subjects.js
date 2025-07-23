// import axios from 'axios';
// import React, { useCallback, useEffect, useState } from 'react';
// import { useAuthContext } from '../../../context/AuthContext';
// import { Link } from 'react-router-dom';
// import Swal from 'sweetalert2';


// const Subjects = () => {
//   const { ThemeToggle, users,themeState } = useAuthContext();
//   const [searchTerm, setSearchTerm] = useState('');
//   const [allSubjects, setAllSubjects] = useState([]);

//   // Fetch subjects from API
//   const getAllSubjects = useCallback(async () => {
//     try {
//       const response = await axios.get(`${process.env.REACT_APP_API_URL}/subject/get`);
//       setAllSubjects(response?.data);
//       console.log(response.data);
//     } catch (err) {
//       console.error("Error fetching subjects", err);
//     }
//   }, []);

//   // Delete subject
// const handleDelete = async (id) => {
//     Swal.fire({
//       title: 'Are you sure?',
//       text: "Do you really want to delete this Subject and its notes?",
//       icon: 'warning',
//       background: themeState === 'dark' ? '#0f172a' : '',
//       color: themeState === 'dark' ? '#fff' : '',
//       showCancelButton: true,
//       confirmButtonColor: '#d33',
//       cancelButtonColor: '#3085d6',
//       confirmButtonText: 'Yes, delete it!',
//     }).then(async (result) => {
//       if (result.isConfirmed) {
//         try {
//           const res = await axios.delete(`${process.env.REACT_APP_API_URL}/subject/delete/${id}`);
//           window.toastify(res.data.message, "success");
//           setAllSubjects((prev) => prev.filter((item) => item._id !== id));
//         } catch (error) {
//           console.error("Deletion failed", error);
//           window.toastify("Failed to delete subject", "error");
//         }
//       } else {
//         // User cancelled the deletion
//         window.toastify("Deletion cancelled", "info");
//       }
//     });
//   };

//   // Load subjects on mount
//   useEffect(() => {
//     getAllSubjects();
//   }, [getAllSubjects]);

//   // Filter by search
//   const filteredSubjects = allSubjects.filter((subject) =>
//     subject.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <div className="flex min-h-screen font-raleway text-gray-800 dark:text-white">
//       <main className="flex-1 p-6">
//         {/*==== Header ====*/}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
//           <h1 className="text-2xl font-bold text-center md:text-left w-full">CS Subjects</h1>


//           <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
//             {/* Hidden ThemeToggle */}
//             <div className="hidden">
//               <ThemeToggle />
//             </div>

//             {/* Search Input */}

//             <input
//               type="text"
//               placeholder="Search by course title"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//               className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-[#1e293b] px-4 py-2 rounded-md w-full md:w-80"
//             />
//           </div>
//         </div>

//         {/*==== Subject Cards ====*/}
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {filteredSubjects.length > 0 ? (
//             filteredSubjects.map((subject) => (
//               <div
//                 key={subject._id}
//                 className="p-6 rounded-xl shadow-md bg-white dark:bg-[#1e293b] transition transform hover:scale-[1.01]"
//               >
//                 <h2 className="font-semibold text-xl mb-1">{subject.title}</h2>
//                 <p className="text-sm text-blue-500 mb-4">Computer Science</p>

//                 <div className="flex gap-4 flex-wrap">
//                   <Link
//                     to={`/dashboard/notes/${encodeURIComponent(subject.title)}/${subject._id}`}
//                     className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded btn-blue"
//                   >
//                     View Notes
//                   </Link>

//                   {users?.roles?.includes("Admin") && (
//                     <button
//                       onClick={() => handleDelete(subject._id)}
//                       title="Delete"
//                       className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
//                     >
//                       Delete Notes
//                     </button>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
//               No course found.
//             </p>
//           )}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Subjects;


import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { useAuthContext } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const Subjects = () => {
  const { ThemeToggle, users, themeState } = useAuthContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [allSubjects, setAllSubjects] = useState([]);

  // Fetch subjects from API
  const getAllSubjects = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/subject/get`);
      setAllSubjects(response?.data);
      console.log(response.data);
    } catch (err) {
      console.error("Error fetching subjects", err);
    }
  }, []);

  // Delete subject

  const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this Subject and its notes?",
      icon: 'warning',
      background: themeState === 'dark' ? '#0f172a' : '',
      color: themeState === 'dark' ? '#fff' : '',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/subject/delete/${id}`);
          window.toastify(res.data.message, "success");
          setAllSubjects((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
          console.error("Deletion failed", error);
          window.toastify("Failed to delete subject", "error");
        }
      } else {
        // User cancelled the deletion
        window.toastify("Deletion cancelled", "info");
      }
    });
  };


  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(`${process.env.REACT_APP_API_URL}/subject/delete/${id}`);
  //     window.toastify(res.data.message, "success");
  //     setAllSubjects((prev) => prev.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.error("Deletion failed", error);
  //     window.toastify("Failed to delete subject", "error");
  //   }
  // };

  // Load subjects on mount
  useEffect(() => {
    getAllSubjects();
  }, [getAllSubjects]);

  // Filter by search
  const filteredSubjects = allSubjects.filter((subject) =>
    subject.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen font-raleway text-gray-800 dark:text-white">
      <main className="flex-1 p-6">
        {/*==== Header ====*/}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold text-center md:text-left w-full">CS Subjects</h1>


          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
            {/* Hidden ThemeToggle */}
            <div className="hidden">
              <ThemeToggle />
            </div>

            {/* Search Input */}

            <input
              type="text"
              placeholder="Search by course title"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-blue-600 focus:ring-2 focus:ring-blue-500 dark:focus:ring-white dark:bg-[#1e293b] px-4 py-2 rounded-md w-full md:w-80"
            />
          </div>
        </div>

        {/*==== Subject Cards ====*/}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredSubjects.length > 0 ? (
            filteredSubjects.map((subject) => (
              // <div
              //   key={subject._id}
              //   className="p-6 rounded-xl shadow-md bg-white dark:bg-[#1e293b] transition transform hover:scale-[1.01]"
              // >
              //   <h2 className="font-semibold text-xl mb-1">{subject.title}</h2>
              //   <p className="text-sm text-blue-500 mb-4">Computer Science</p>

              //   <div className="flex gap-4 flex-wrap">
              //     <Link
              //       to={`/dashboard/notes/${encodeURIComponent(subject.title)}/${subject._id}`}
              //       className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded btn-blue"
              //     >
              //       View Notes
              //     </Link>

              //     {users?.roles?.includes("Admin") && (
              //       <button
              //         onClick={() => handleDelete(subject._id)}
              //         title="Delete"
              //         className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
              //       >
              //         Delete Notes
              //       </button>
              //     )}
              //   </div>
              // </div>
              <div
  key={subject._id}
  className="p-6 rounded-xl shadow-md bg-white dark:bg-[#1e293b] transition transform hover:scale-[1.01]"
>
  <h2 className="font-semibold text-xl mb-1">{subject.title}</h2>
  <p className="text-sm text-blue-500 mb-1">Computer Science</p>

  {/* Total Likes */}
  <div className="flex items-center gap-2 mt-2 text-sm text-gray-600 dark:text-gray-300">
    <span className="font-semibold">Total Likes:</span>
    <span>{subject.totalLikes || 0}</span>
  </div>

  {/* Actions */}
  <div className="flex gap-4 flex-wrap mt-4">
    <Link
      to={`/dashboard/notes/${encodeURIComponent(subject.title)}/${subject._id}`}
      className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded btn-blue"
    >
      View Notes
    </Link>

    {users?.roles?.includes("Admin") && (
      <button
        onClick={() => handleDelete(subject._id)}
        title="Delete"
        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Delete Notes
      </button>
    )}
  </div>
</div>

            ))
          ) : (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-300">
              No course found.
            </p>
          )}
        </div>
      </main>
    </div>
  );
};

export default Subjects;
