import React, { useState } from "react";
import { FiUploadCloud } from 'react-icons/fi';
import { useAuthContext } from "../../../context/AuthContext";
import axios from "axios";

const initialstate = {
  title: "",
  subjectTitle: "", // unuse
  file: null,
  category: "",      // ✅ Add this
};
const UploadNotesForm = () => {
  const [formData, setFormData] = useState(initialstate);
  const { ThemeToggle, users } = useAuthContext()
  const [isLoading, setisLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", formData.title);
    data.append("subjectTitle", formData.subjectTitle);
    data.append("category", formData.category);
    data.append("file", formData.file);
    data.append("userId", users._id); // from context

    setisLoading(true)
    try {
      const res = await axios.post("http://localhost:8000/api/notes/create", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
      window.toastify(res.data.message, "success");
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.response?.data?.message;
      window.toastify(errorMessage, "error");
    }
    finally {
      setisLoading(false)
      setFormData(initialstate)
    }
  };

  return (
    <div className="min-h-screen flex relative items-center justify-center p-4 text-black dark:text-white heading-color ">
      <div className="absolute top-0 right-0 hidden ">
        <ThemeToggle />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl card-bg p-8 space-y-6 "
      >
        <h2 className="text-3xl font-bold text-center  ">
          Upload Notes
        </h2>

        <div>
          <label className="block mb-1 font-medium ">Title</label>
          <input
            type="text"
            name="title"
            required
            value={formData.title}
            onChange={handleChange}
            className="dashboard-input"

          />
        </div>

        

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Subject</label>
            <input
              type="text"
              name="subjectTitle"
              required
              value={formData.subjectTitle}
              onChange={handleChange}
              className="dashboard-input"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium ">Notes Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="dashboard-input"
            >
              <option disabled value="">Pick a Notes Category</option>
              <option value="Lecture Notes">Lecture Notes</option>
              <option value="MCQs">MCQs</option>
              <option value="Past Papers">Past Paper</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block mb-1 font-medium ">File</label>
          <input
            type="file"
            name="file"
            required
            onChange={handleChange}
            className="w-full dark:text-white"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 text-white py-2 rounded-md btn-blue transition"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            <>
              <FiUploadCloud className="text-lg" />
              Upload Note
            </>
          )}
        </button>

      </form>
    </div>
  );
};

export default UploadNotesForm;


// import React, { useState } from "react";
// import { FiUploadCloud } from "react-icons/fi";
// import { useAuthContext } from "../../../context/AuthContext";
// import axios from "axios";

// const initialstate = {
//   title: "",
//   subjectTitle: "",
//   file: null,
//   category: "",
// };

// const UploadNotesForm = () => {
//   const [formData, setFormData] = useState(initialstate);
//   const [isLoading, setisLoading] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [confirmed, setConfirmed] = useState(false);
//   const { ThemeToggle, users } = useAuthContext();

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     setFormData({
//       ...formData,
//       [name]: files ? files[0] : value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setShowModal(true); // Show confirmation popup
//   };

//   const confirmUpload = async () => {
//     if (!confirmed) {
//       window.toastify("Please confirm the conditions before uploading", "error");
//       return;
//     }

//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("subjectTitle", formData.subjectTitle);
//     data.append("category", formData.category);
//     data.append("file", formData.file);
//     data.append("userId", users._id);

//     setisLoading(true);
//     try {
//       const res = await axios.post("http://localhost:8000/api/notes/create", data, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       window.toastify(res.data.message, "success");
//     } catch (error) {
//       const errorMessage = error.response?.data?.message || "Something went wrong";
//       window.toastify(errorMessage, "error");
//     } finally {
//       setisLoading(false);
//       setFormData(initialstate);
//       setShowModal(false);
//       setConfirmed(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex relative items-center justify-center p-4 heading-color">
//       <div className="absolute top-0 right-0 hidden">
//         <ThemeToggle />
//       </div>

//       <form onSubmit={handleSubmit} className="w-full max-w-2xl card-bg p-8 space-y-6">
//         <h2 className="text-3xl font-bold text-center">Upload Notes</h2>

//         <div>
//           <label className="block mb-1 font-medium">Title</label>
//           <input
//             type="text"
//             name="title"
//             required
//             value={formData.title}
//             onChange={handleChange}
//             className="dashboard-input"
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <div>
//             <label className="block mb-1 font-medium">Subject</label>
//             <input
//               type="text"
//               name="subjectTitle"
//               required
//               value={formData.subjectTitle}
//               onChange={handleChange}
//               className="dashboard-input"
//             />
//           </div>

//           <div>
//             <label className="block mb-1 font-medium">Notes Category</label>
//             <select
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               className="dashboard-input"
//               required
//             >
//               <option disabled value="">
//                 Pick a Notes Category
//               </option>
//               <option value="Lecture Notes">Lecture Notes</option>
//               <option value="MCQs">MCQs</option>
//               <option value="Past Papers">Past Paper</option>
//             </select>
//           </div>
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">File</label>
//           <input
//             type="file"
//             name="file"
//             required
//             onChange={handleChange}
//             className="w-full dark:text-white"
//           />
//         </div>

//         <button
//           type="submit"
//           className="w-full flex items-center justify-center gap-2 text-white py-2 rounded-md btn-blue transition"
//         >
//           {isLoading ? (
//             <span className="loading loading-spinner loading-xl"></span>
//           ) : (
//             <>
//               <FiUploadCloud className="text-lg" />
//               Upload Note
//             </>
//           )}
//         </button>
//       </form>

//       {/* Confirmation Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white dark:bg-[#1e293b] p-6 rounded-lg shadow-lg max-w-md w-full space-y-4 text-center">
//             <h3 className="text-lg font-bold text-blue-600">Please Confirm</h3>
//             <p className="text-sm dark:text-gray-200">Before uploading, please confirm:</p>
//             <ul className="text-left text-sm dark:text-gray-300 list-disc list-inside space-y-1">
//               <li>The uploaded notes are correct.</li>
//               <li>They belong to the selected subject.</li>
//               <li>They are not plagiarized or fake.</li>
//             </ul>
//             <div className="flex items-center justify-center">
//               <input
//                 type="checkbox"
//                 id="confirm"
//                 checked={confirmed}
//                 onChange={(e) => setConfirmed(e.target.checked)}
//                 className="mr-2"
//               />
//               <label htmlFor="confirm" className="text-sm dark:text-white">
//                 I agree with the above conditions
//               </label>
//             </div>
//             <div className="flex justify-center gap-4 pt-4">
//               <button
//                 onClick={confirmUpload}
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Confirm & Upload
//               </button>
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default UploadNotesForm;
