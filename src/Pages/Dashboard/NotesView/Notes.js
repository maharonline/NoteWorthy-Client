import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../context/AuthContext';
import axios from 'axios';
import { EyeIcon, DownloadIcon, Heart, MessageCircleMore, Trash } from 'lucide-react';
import Swal from 'sweetalert2';


export default function CourseNotes() {
  const { users, ThemeToggle,themeState } = useAuthContext();
  const { subjectTitle, id } = useParams();

  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [feedbacks, setFeedbacks] = useState({});
  const [expandedNoteId, setExpandedNoteId] = useState(null);
  const [isLoading, setisLoading] = useState(false)

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}/notes/get`, {
        params: { id }
      });
      setNotes(res.data);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  }, [id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFavourite = async (note) => {

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/favourite/add`, {
        noteId: note._id,
        title: note.title,
        fileUrl: note.fileUrl,
        userId: users._id
      });
      window.toastify(res.data.message, "success");

    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      window.toastify(message, "info");
      console.error('Failed to add to favourites:', error.response?.data || error.message);
    }
  };

  const handleFeedbackChange = (noteId, value) => {
    setFeedbacks(prev => ({ ...prev, [noteId]: value }));
  };

  const submitFeedback = async (noteId) => {
    setisLoading(true)
    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/feedback/createfeedback`, {
        noteId,
        userId: users._id,
        feedback: feedbacks[noteId],
        userModel: users.roles[0]
      });

      window.toastify(res.data.message || "Feedback submitted", "success");
      setFeedbacks(prev => ({ ...prev, [noteId]: "" }));
      setExpandedNoteId(null);
      setisLoading(false)
    } catch (error) {
      const message = error?.response?.data?.message || "Error submitting feedback";
      window.toastify(message, "error");
      console.error("Feedback error:", error);
    }
  };
  
// Note Deleteion
const handleDelete = async (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "Do you really want to delete this note?",
      icon: 'warning',
      background: themeState === 'dark' ? '#0f172a' : '',
      color: themeState === 'dark' ? '#fff' : '',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
          window.toastify(res.data.message, "success");
          setNotes((prev) => prev.filter((item) => item._id !== id));
        } catch (error) {
          console.error("Deletion failed", error);
          window.toastify("Failed to delete note", "error");
        }
      } else {
        window.toastify("Note deletion cancelled", "info");
      }
    });
  };
  // const handleDelete = async (id) => {
  //   try {
  //     const res = await axios.delete(`${process.env.REACT_APP_API_URL}/notes/delete/${id}`);
  //     window.toastify(res.data.message, "success");
  //     setNotes((prev) => prev.filter((item) => item._id !== id));
  //   } catch (error) {
  //     console.error("Deletion failed", error);
  //     window.toastify("Failed to delete feedback", "error");
  //   }
  // };
  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 text-gray-700 dark:text-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-center md:text-left">
          {decodeURIComponent(subjectTitle)} Notes
        </h2>

        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          <ThemeToggle />
          <input
            type="text"
            placeholder="Search notes"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-blue-600 focus:ring-gray-700 dark:bg-[#1e293b] px-4 py-1 rounded w-full md:w-80 justify-end "
          />
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white">
          No notes found for this subject.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note._id}
              className="card-bg p-6 hover:shadow-lg hover:scale-[1.02] transition-all duration-200"
            >
              <h4 className="font-semibold mb-2 text-lg">{note.title}</h4>
              <h4 className=" text-blue-500">{note.category}</h4>

              <div className="flex gap-3 mt-2">
                
                <button
                  onClick={() => handleFavourite(note)}
                  title="Add to Favorites"
                  className="p-2 text-white bg-blue-500 rounded hover:bg-blue-400 transition"
                >
                  <Heart size={18} />
                </button>

                <button
                  onClick={async () => {
                    try {
                      //==== Record download in DB ====
                      await axios.post(`${process.env.REACT_APP_API_URL}/download/downloadDetail`, {
                        noteId: note._id,
                        userId: users._id,
                      });

                      let downloadUrl = note.fileUrl;

                      if (downloadUrl?.includes("/view")) {
                        downloadUrl = downloadUrl.replace("/view", "/download");
                      }


                      if (downloadUrl?.includes("/upload/")) {
                        downloadUrl = downloadUrl.replace("/upload/", "/upload/fl_attachment/");
                      }


                      window.open(downloadUrl, "_blank");
                    } catch (error) {
                      console.error("Failed to record download", error);
                      window.toastify("Failed to record download", "error");
                    }
                  }}
                  title="Download"
                  className="p-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  <DownloadIcon size={18} />
                </button>

                <button
                  onClick={() => window.open(note.fileUrl, "_blank", "noopener,noreferrer")}
                  title="Preview"
                  className="p-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition"
                >
                  <EyeIcon size={18} />
                </button>

                {(users?.roles?.includes("Students")) && (
                  <button
                  onClick={() => setExpandedNoteId(expandedNoteId === note._id ? null : note._id)}
                  title="Give Feedback"
                  className="p-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
                >
                  <MessageCircleMore size={18} />
                </button>)}

                 {( users?.roles?.includes("Admin")) && (
                <button
                  onClick={() => handleDelete(note._id)}
                  title="Delete"
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <Trash size={18} />
                </button>
              )}
              </div>


              {/*==== Feedback Toggle ====*/}
              {expandedNoteId === note._id && (
                <div
                  className="mt-4 transition-all duration-300 ease-in-out transform animate-slideDown fadeIn"
                >
                  <textarea
                    value={feedbacks[note._id] || ""}
                    onChange={(e) => handleFeedbackChange(note._id, e.target.value)}
                    placeholder="Write your feedback..."
                    className="w-full p-2 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  />
                  <button
                    onClick={() => submitFeedback(note._id)}
                    className="mt-2 px-4 py-1 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
                  >
                    {isLoading ? <span className="loading loading-spinner loading-sm"></span>
                      : "Submit Feedback"}
                  </button>

                  
                </div>
              )}

              

            </div>
            
          ))}
        </div>
      )}
    </div>
  );
}
