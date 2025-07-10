import React, { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProfilePage from './Profile/index';
import Home from './Home/index'
import EditProfile from './Settings/EditProfile/EditProfile.js';
import AdminApprovalTable from './Admin/AdminAproval';
import Subjects from './NotesView/Subjects';
import CourseNotes from './NotesView/Notes';
import Sidebar from '../../components/Sidebar/Sidebar';
import UploadNotesForm from './UploadNotes';
import { useAuthContext } from '../../context/AuthContext';
import NotFound from '../../components/NotFound';
import AccessDenied from '../../components/AccessDenied';
import Feedbacks from './Feedback/Feedback';
import PendingApproval from './Home/TeacherPending';
import DeleteAccount from './Settings/DeleteAccount/DeleteAccount.js';
import PasswordUpdate from './Settings/PasswordUpdate/PasswordUpdate.js';
import MyNotes from './NotesView/MyNotes.js';
import QuizMaster from './Quiz/quizMaster.js';
import QuizSubjects from './Quiz/QuizSubject.js';
import { Menu, X } from 'lucide-react';


export default function Dashboard() {
  const { users } = useAuthContext();
  // const firstLetter = users?.userName?.charAt(0).toUpperCase();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div className="flex dashboard-bg font-raleway">

{isMobile ? (
  <>
    {/* Toggle Button */}
    <button
      className="p-2 fixed top-4 left-4 z-50 rounded shadow text-blue-700 bg-white dark:bg-gray-800"
      onClick={() => setDrawerOpen(!drawerOpen)}
    >
      {drawerOpen ? (
      <X size={20} className="text-blue-600" />
      ) : (
        <Menu size={20} className="text-blue-600" />
      )}
    </button>

    {/* Sidebar Drawer */}
    {drawerOpen && (
      <div
        className="fixed inset-0 z-40 bg-black bg-opacity-50"
        onClick={() => setDrawerOpen(false)}
      >
        <div
 className="absolute left-0 top-0 w-64 h-full overflow-y-auto bg-white dark:bg-gray-900 shadow"
          onClick={(e) => e.stopPropagation()}
        >
         
           <Sidebar onNavigate={() => setDrawerOpen(false)} />
        </div>
      </div>
    )}
  </>
) : (
  <Sidebar />
)}


      <main
        className={`flex-1 transition-all duration-300 ${!isMobile ? 'ml-64' : ''}`}
      >
        <div className="p-6">

          <Routes>
            {users?.status === "pending" && users?.roles?.includes("Teacher") ? (
              <>

                <Route path="*" element={<PendingApproval />} />
              </>
            ) : (
              <>

                <Route path="*" element={<NotFound />} />
                <Route index element={<Home />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/passwordupdate" element={<></>} />
                <Route path="/editprofile" element={<EditProfile />} />
                <Route path="/approvalTable" element={
                  users?.roles?.includes("Admin") ? (
                    <AdminApprovalTable />
                  ) : (
                    <AccessDenied />
                  )
                } />
                <Route path="/subjects" element={<Subjects />} />
                <Route path="/updatePassword" element={<PasswordUpdate />} />
                <Route path="/notes/:subjectTitle/:id" element={<CourseNotes />} />
                <Route
                  path="/uploadNotes"
                  element={
                    users?.roles?.includes("Teacher") || users?.roles?.includes("Admin") ? (
                      <UploadNotesForm />
                    ) : (
                      <AccessDenied />
                    )
                  }
                />
                <Route path="/feedback" element={<Feedbacks />} />
                <Route path="/myNotes" element={users?.roles?.includes("Teacher") || users?.roles?.includes("Admin") ? (
                  <MyNotes />
                ) : (
                  <AccessDenied />
                )} />
                <Route path="/deleteAccount" element={<DeleteAccount />} />
                <Route path="/quizSubject" element={<QuizSubjects />} />
                <Route path="quiz/:subject" element={<QuizMaster />} />

              </>
            )}
          </Routes>

        </div>
      </main>
    </div>
  );
}
