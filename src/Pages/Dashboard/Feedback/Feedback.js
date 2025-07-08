import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import { Trash } from "lucide-react";

export default function Feedbacks() {
  const { users, ThemeToggle } = useAuthContext();
  const [feedbacks, setFeedbacks] = useState([]);



  useEffect(() => {
    const fetchUserFeedbacks = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/feedback/allget`);
        if (res.data.success) {
          setFeedbacks(res.data.allFeedbacks);
        } else {
          window.toastify("No feedbacks found", "warn");
        }
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
        window.toastify("Failed to load feedbacks", "error");
      }
    };

    fetchUserFeedbacks();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(`${process.env.REACT_APP_API_URL}/feedback/delete/${id}`);
      window.toastify(res.data.message, "success");
      setFeedbacks((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.error("Deletion failed", error);
      window.toastify("Failed to delete feedback", "error");
    }
  };

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 heading-color">
      <div className="hidden">
        <ThemeToggle />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center">All Feedbacks</h2>

      {feedbacks.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white">
          No feedbacks available yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {feedbacks.map((fb) => (
            <div
              key={fb._id}
              className="card-bg p-4 animate-fadeIn rounded shadow"
            >
              <div className="flex items-center gap-3 mb-2">


                {fb?.userId?.photoURL ? (
                  <img
                    alt="User"
                    src={fb.userId?.photoURL}
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold border">
                    {fb?.userId?.userName?.charAt(0).toUpperCase()}
                  </div>
                )}

                <h4 className="font-semibold text-md">
                  {fb.userId?.userName}
                  {users?._id === fb.userId?._id && (
                    <span className="text-sm text-blue-600"> (You)</span>
                  )}
                </h4>
              </div>

              <h4 className="font-semibold text-base mb-1">
                Note: <span className="text-blue-600">{fb.noteId?.title}</span>
              </h4>

              <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
                Submitted on: {new Date(fb.createdAt).toLocaleDateString()}
              </p>

              <p className="text-md mb-3">{fb.feedback}</p>

              {(users?._id === fb.userId?._id || users?.roles?.includes("Admin")) && (
                <button
                  onClick={() => handleDelete(fb._id)}
                  title="Delete"
                  className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  <Trash size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
