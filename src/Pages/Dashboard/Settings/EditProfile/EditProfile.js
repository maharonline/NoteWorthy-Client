import React, { useState } from 'react';
import { useAuthContext } from '../../../../context/AuthContext';
import axios from 'axios';
import { uploadToAppwrite } from '../../../../config/appwrite';

const EditProfile = () => {
  const { users, ThemeToggle } = useAuthContext();
  const [state, setState] = useState(users || {});
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(users?.photoURL || null);
  const [isLoading, setIsLoading] = useState(false);

  const createdDate = new Date(users.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      setPreviewImage(URL.createObjectURL(selected));
    }
  };
   let photoURL = state.photoURL;

  const handleDeleteImage = () => {
    setFile(null);
    setPreviewImage(null);
    setState((prev) => ({ ...prev, photoURL: null }));
    
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

   

    // ✅ Upload to Appwrite if new file is selected
    if (file) {
      try {
        photoURL = await uploadToAppwrite(file);
        console.log("✅ Appwrite Image URL:", photoURL);
      } catch (err) {
        console.error("❌ Appwrite Upload Error:", err);
        window.toastify("Failed to upload image", "error");
        setIsLoading(false);
        return;
      }
    }

    try {
      const payload = {
        _id: state._id,
        userName: state.userName,
        Semester: state.Semester,
        photoURL,
      };

      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/editprofile`,
        { payload }
      );

      window.toastify(response.data.message, "success");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      window.toastify("Something went wrong", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen px-4 py-6 md:px-10 transition-all font-raleway">
      <div className="flex justify-end mb-6">
        <ThemeToggle />
      </div>

      <div className="max-w-3xl mx-auto card-bg p-6">
        <h2 className="text-2xl font-bold mb-6 heading-color text-center">
          Edit Profile
        </h2>

        {/* === Profile Image === */}
        <div className="flex flex-col items-center mb-6">
          {previewImage ? (
            <img
              src={previewImage}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mb-4">
              <span className="text-gray-500 dark:text-gray-300">No Image</span>
            </div>
          )}

          <div className="flex gap-3">
            <label className="btn-blue text-white px-4 py-2 rounded-full cursor-pointer text-sm">
              Upload
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>

            {previewImage && (
              <button
                type="button"
                onClick={handleDeleteImage}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm"
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* === Form === */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block heading-color mb-1">Name</label>
              <input
                type="text"
                name="userName"
                value={state.userName || ""}
                onChange={handleChange}
                required
                className="dashboard-input"
              />
            </div>

            <div>
              <label className="block heading-color mb-1">Email</label>
              <input
                type="email"
                value={state.email || ""}
                disabled
                className="dashboard-input cursor-not-allowed"
              />
            </div>

            {users?.roles?.includes("Student") && (
              <>
                <div>
                  <label className="block heading-color mb-1">Roll Number</label>
                  <input
                    type="text"
                    value={state.RollNo || ""}
                    disabled
                    className="dashboard-input cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block heading-color mb-1">Semester</label>
                  <input
                    type="text"
                    name="Semester"
                    value={state.Semester || ""}
                    onChange={handleChange}
                    className="dashboard-input"
                  />
                </div>
              </>
            )}

            {users?.roles?.includes("Teacher") && (
              <>
                <div>
                  <label className="block heading-color mb-1">Employee ID</label>
                  <input
                    type="text"
                    value={state.employeeID || ""}
                    disabled
                    className="dashboard-input cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block heading-color mb-1">Department</label>
                  <input
                    type="text"
                    value={state.department || ""}
                    disabled
                    className="dashboard-input cursor-not-allowed"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block heading-color mb-1">Joined Date</label>
              <input
                type="text"
                value={createdDate}
                disabled
                className="dashboard-input cursor-not-allowed"
              />
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-blue text-white font-semibold py-2 px-6 rounded-full transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xl"></span>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
