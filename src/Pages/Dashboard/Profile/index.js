import React, { useCallback, useEffect, useState } from 'react';
import { useAuthContext } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { users, ThemeToggle } = useAuthContext();
  const [activeTab, setActiveTab] = useState("notes");
  const [favorites, setFavorites] = useState([]);
  const [notes, setNotes] = useState([]);
  const [totalDownlad, setTotalDownload] = useState([])
  const [feedbacks, setFeedbacks] = useState([])
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [currentFeedback, setCurrentFeedback] = useState(null);
  const [editedText, setEditedText] = useState("");

  const [RecentDownload, setRecentDownload] = useState([])



  const isDate = users.createdAt;
  const date = new Date(isDate);
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  const createdDate = `${month} ${year}`;
  const firstLetter = users?.userName?.charAt(0).toUpperCase();

  //Activity Overview Array hai jis mai hum html ko bar bar likne ki bijaye aik hi jsx render kr wana chahty tou ye technique istmal hoti 
  const summaries = [
    { value: totalDownlad.totalCount, label: "Total Downloads" },
    { value: feedbacks.length, label: "Total Feedbacks" },
    { value: totalDownlad.recentCount, label: "Recent Downloads" },
  ];


  const goToEditProfile = () => {
    navigate("/dashboard/editprofile");
  };

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/notes/user/${users?._id}`
      );
      setNotes(res.data.notes || []);
      console.log("Fetched Notes:", res.data.notes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    }
  }, [users?._id]);


  const handleDeleteFavourite = async (item) => {
    try {
      const id = item._id
      console.log("Favourite Deletion Click", id);

      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/favourite/delete/${id}`);
      setFavorites((prev) => prev.filter(fav => fav._id !== id));
      window.toastify(res.data.message, "success")

    } catch (error) {
      window.toastify(error?.response?.data?.message, "error");
    }
  }

  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/feedback/get/${users._id}`);
        setFeedbacks(res.data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        window.toastify("Failed to load feedbacks", "error");
      }
    };

    if (users?._id) {
      fetchUserFeedbacks();
    }
  }, [users]);

  const getDownloadSummary = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/summary`, {
        params: { userId: users._id }
      });
      setTotalDownload(res.data)
      console.log("Downloaded notes:", res.data.downloads);
    } catch (error) {
      console.error("Error fetching download summary:", error.message);
    }
  }, [users._id])
  const fetchFavorites = useCallback(async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/favourite/${users?._id}`);
      if (response.data.success) {
        setFavorites(response?.data?.favorites);
        console.log("New favorites from server: ", response.data.favorites);
      }
    } catch (error) {
      console.error("Failed to fetch favorites:", error);
    }
  }, [users?._id]);


  const getRecentDownload = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/download/recentDownload`, {
        params: { userId: users._id }
      });

      const data = res?.data;

      setRecentDownload(data.recentDownload || []);

      console.log("Profile Downloaded notes:", data);
    } catch (error) {
      console.error("Error fetching download summary:", error.message);
      setRecentDownload([]); 
    }
  }, [users._id]);


  useEffect(() => {
    fetchFavorites()
    getDownloadSummary()
    getRecentDownload()
    fetchNotes()
  }, [fetchFavorites, fetchNotes, getDownloadSummary, getRecentDownload])

  const handleEdit = (feedback) => {
    setCurrentFeedback(feedback);
    setEditedText(feedback.feedback);
    setEditModalOpen(true);
  };

  const handleUpdate = async () => {

    try {
      const res = await axios.put(`${process.env.REACT_APP_API_URL}/feedback/update/${currentFeedback._id}`, {
        editedText,
      });
      setEditModalOpen(false);
      setFeedbacks((prev) => prev.map((item) => item._id === currentFeedback._id ? { ...item, feedback: editedText } : item)
      );
      window.toastify(res.data?.message, "success")
    } catch (error) {
      console.error("Update failed", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/feedback/delete/${id}`);

      window.toastify(res?.data.message, "success");

      //==== Optionally refresh list or remove from state ====
      setFeedbacks((prev) => prev.filter((item) => item._id !== id));

    } catch (error) {
      console.error("Deletion failed", error);
      window.toastify("Failed to delete feedback", "error");
    }
  };





  return (
    <div className="min-h-screen px-4 py-6 transition duration-300 dark:text-white font-raleway">
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>

      <div className="max-w-4xl mx-auto card-bg rounded-xl shadow-md p-4 sm:p-6 space-y-6">

        {/*==== Profile Info ====*/}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
          {users?.photoURL ? (
            <img src={users?.photoURL} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg font-bold">
              {firstLetter}
            </div>
          )}

          <div className="flex-1 w-full">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h1 className="text-xl font-semibold">{users?.userName}</h1>
                <div className="badge bg-green-700 text-white font-semibold mt-1 inline-flex items-center gap-1">
                  <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="currentColor">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" />
                      <polyline points="7 13 10 16 17 8" fill="none" stroke="currentColor" strokeWidth="2" />
                    </g>
                  </svg>
                  {users?.roles}
                </div>
              </div>
              <button
                onClick={goToEditProfile}
                className="border border-blue-500 text-blue-500 text-sm px-3 py-1 rounded hover:bg-blue-500 hover:text-white transition"
              >
                Edit Profile
              </button>
            </div>

            <div className="mt-4  space-y-1 text-sm">
              <p><strong>Email:</strong> {users.email}</p>
              {users?.roles?.includes("Student") && <p><strong>Roll No:</strong> {users?.RollNo}</p>}
              {users?.roles?.includes("Teacher") && <p><strong>Employee ID:</strong> {users?.employeeID}</p>}
              <p><strong>Department:</strong> {users?.department}</p>
              {users?.roles?.includes("Student") && <p><strong>Semester:</strong> {users?.Semester}</p>}
              <p><strong>Joined:</strong> {createdDate}</p>
            </div>
          </div>
        </div>

        {/*==== Activity Overview ====*/}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
          {summaries.map((item, idx) => (
            <div key={idx} className="card-bg p-4 rounded-lg shadow-lg">
              <p className="text-2xl font-bold">{item.value}</p>
              <p className="text-sm heading-color">{item.label}</p>
            </div>
          ))}
        </div>



        {/* Tabs */}
        <div>
          <div className="flex flex-wrap gap-4 sm:gap-8 border-b border-gray-300 dark:border-gray-600 pb-2">
            {users?.roles?.includes("Teacher") || users?.roles?.includes("Admin") ? (
              <button
                onClick={() => setActiveTab("notes")}
                className={`pb-1 font-medium ${activeTab === "notes"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                My Notes
              </button>
            ) : (
              <button
                onClick={() => setActiveTab("download")}
                className={`pb-1 font-medium ${activeTab === "download"
                  ? "text-blue-500 border-b-2 border-blue-500"
                  : "text-gray-600 dark:text-gray-300"
                  }`}
              >
                My Download
              </button>
            )}

            <button
              onClick={() => setActiveTab("favorites")}
              className={`pb-1 font-medium ${activeTab === "favorites" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 dark:text-gray-300"}`}
            >
              Favorites
            </button>
            <button
              onClick={() => setActiveTab("feedback")}
              className={`pb-1 font-medium ${activeTab === "feedback" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-600 dark:text-gray-300"}`}
            >
              Feedback
            </button>
          </div>

          {/* Conditional Tab Content */}
          <div className="space-y-3 mt-4">
            {activeTab === "download" && (
              <>
                {RecentDownload.map((item) => (
                  <div key={item._id} className="card-bg border border-blue-600 p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <p className="dark:text-white text-sm">{item.title?.trim() || "-"}</p>


                  </div>
                ))}
              </>
            )}
            {activeTab === "notes" && (
              <>
                {notes.map((item) => (
                  <div key={item._id} className="card-bg border border-blue-600 p-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                    <p className="dark:text-white text-sm">{item.title}</p>
                    <div className="flex gap-3 text-sm">

                      <button
                        onClick={async () => {
                          try {
                            await axios.post("http://localhost:8000/api/download/downloadDetail", {
                              noteId: item._id,
                              userId: users._id,
                            });

                            const downloadUrl = item.fileUrl?.includes("/upload/")
                              ? item.fileUrl.replace("/upload/", "/upload/fl_attachment/")
                              : item.fileUrl;

                            window.open(downloadUrl, "_blank");
                          } catch (error) {
                            console.error("Failed to record download", error);
                            window.toastify("Failed to record download", "error");
                          }
                        }}
                        title="Download"
                        className="text-blue-600">Re-download
                      </button>



                    </div>
                  </div>
                ))}
              </>
            )}

            {activeTab === "favorites" && (
              <>
                {favorites.map((item, idx) => {
                  const fileUrl = item?.fileUrl;

                  if (!fileUrl) {
                    console.warn("Missing fileUrl for favorite note:", item);
                    return (
                      <div
                        key={idx}
                        className="bg-gray-50 dark:bg-gray-700 p-3 rounded flex justify-between items-center"
                      >
                        <p className="dark:text-white text-sm">{item.title || "Untitled Note"}</p>
                        <span className="text-red-400 italic text-sm">No file available</span>
                      </div>
                    );
                  }

                  // Cloudinary direct download link
                  const downloadUrl = fileUrl.includes("/upload/")
                    ? fileUrl.replace("/upload/", "/upload/fl_attachment/")
                    : fileUrl;

                  return (
                    <div
                      key={idx}
                      className="card-bg p-3 border border-blue-600 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                    >
                      <p className="dark:text-white text-sm">{item.title}</p>
                      <div className="flex gap-3 text-sm">
                        <button className="text-red-600 dark:text-red-400" onClick={() => handleDeleteFavourite(item)}>Remove</button>
                        <a
                          href={downloadUrl}
                          download
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 dark:text-blue-400"
                        >
                          Re-download
                        </a>
                      </div>
                    </div>
                  );
                })}





              </>
            )}


            <>
              {activeTab === "feedback" && (
                <>
                  {feedbacks.map((feedback) => (
                    <div
                      key={feedback._id}
                      className="card-bg border border-blue-600 p-3 rounded text-sm dark:text-white mb-3"
                    >
                      <p>{feedback.feedback}</p>
                      <p className='text-xs'>{feedback.noteTitle}</p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => handleEdit(feedback)}
                          className="btn-blue px-2 py-1 text-xs rounded text-white"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(feedback._id)}
                          className="btn-red px-2 py-1 text-xs rounded text-white"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </>
              )}




              {/* Edit Modal */}
              {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-80">
                    <h2 className="text-lg font-semibold mb-4 text-black dark:text-white">Edit Feedback</h2>
                    <textarea
                      className="w-full border border-blue-600 rounded p-2 dark:bg-gray-700 "
                      rows="4"
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                    ></textarea>
                    <div className="flex justify-end gap-2 mt-4">
                      <button
                        onClick={() => setEditModalOpen(false)}
                        className="px-3 py-1 bg-gray-400 text-white rounded"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleUpdate}
                        className="px-3 py-1 bg-blue-600 text-white rounded"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
