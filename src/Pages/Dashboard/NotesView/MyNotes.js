import React, { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../../context/AuthContext";
import LoadingNotes from "../../../components/Loaders/LoadingNotes";
import { EyeIcon } from "lucide-react";

const MyNotes = () => {
  const { users, ThemeToggle } = useAuthContext();
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchNotes = useCallback(async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/notes/user/${users?._id}`
      );
      setNotes(res.data.notes || []);
      console.log("Fetched Notes:", res.data.notes);
    } catch (err) {
      console.error("Failed to fetch notes", err);
    } finally {
      setLoading(false);
    }
  }, [users?._id]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <div className="min-h-screen px-4 sm:px-8 py-6 heading-color">
      <div className="hidden">
        <ThemeToggle />
      </div>
      <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">My Notes</h2>

      {loading ? (
        <LoadingNotes />
      ) : notes.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-white">
          You haven’t uploaded any notes yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {notes.map((note) => (
            <div
              key={note._id}
              className="card-bg p-4 rounded-lg shadow hover:shadow-lg transition-all duration-300 animate-fadeIn text-black dark:text-white"
            >
              <h4 className="font-semibold text-lg mb-2 dark:text-white">
                Title: <span className="text-blue-500">{note.title}</span>
              </h4>
              <p className="text-sm  mb-1">
                Subject: <span className="font-medium">{note.subjectTitle}</span>
              </p>
              <p className="text-sm  mb-2">
                Category: <span className="italic">{note.category}</span>
              </p>
              <p className="text-xs  mb-4">
                Uploaded on: {new Date(note.createdAt).toLocaleDateString()}
              </p>

              <button
                onClick={() => window.open(note.fileUrl, "_blank", "noopener,noreferrer")}
                className="inline-flex items-center gap-2 text-sm text-white bg-blue-600 px-3 py-1 rounded hover:bg-blue-700 transition"
              >
                <EyeIcon className="w-4 h-4" />
                View Note
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyNotes;
