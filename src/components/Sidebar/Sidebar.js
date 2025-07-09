import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {MdMenuBook,MdHome,MdSettings,MdPermIdentity,MdCloudUpload,MdFeedback,MdEdit,MdLock, MdDeleteForever, MdTableView,   MdDescription, MdChecklist,} from 'react-icons/md';
import { useAuthContext } from '../../context/AuthContext';

const navItems = [
  { icon: <MdHome className="w-5 h-5" />, text: 'Home', link: '/dashboard' },
  { icon: <MdMenuBook className="w-5 h-5" />, text: 'Subjects', link: '/dashboard/subjects' },
  { icon: <MdCloudUpload className="w-5 h-5" />, text: 'UpLoad Notes', link: '/dashboard/uploadNotes' },
  { icon: <MdDescription className="w-5 h-5" />, text: 'My Notes', link: '/dashboard/myNotes' },
  { icon: <MdChecklist className="w-5 h-5" />, text: 'MCQs Quiz', link: '/dashboard/quizSubject' },
  { icon: <MdTableView className="w-5 h-5" />, text: 'Approval Table', link: '/dashboard/approvalTable' },
  { icon: <MdFeedback className="w-5 h-5" />, text: 'FeedBack', link: '/dashboard/feedback' },
  { icon: <MdPermIdentity className="w-5 h-5" />, text: 'Profile', link: '/dashboard/profile' },
  {
    icon: <MdSettings className="w-5 h-5" />,
    text: 'Settings',
    children: [
      { icon: <MdEdit className="w-5 h-5" />, text: 'Edit Profile', link: '/dashboard/editprofile' },
      { icon: <MdLock className="w-5 h-5" />, text: 'Password Update', link: '/dashboard/updatePassword' },
      { icon: <MdDeleteForever className="w-5 h-5" />, text: 'Delete Account', link: '/dashboard/deleteAccount' }
    ]
  },
  
  
];

const Sidebar = () => {
  const { users,handleLogout } = useAuthContext();
  const [openDropdown, setOpenDropdown] = useState(null); // track open dropdown

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
  };

  return (
    <>
      {users?.status === "pending" && users?.roles?.includes("Teacher") ? null : (
        <aside className="w-64 dark:text-white h-screen shadow fixed z-40 ">
          <div className="flex flex-col items-center">
            <img
              src="/Assets/image/logo.png"
              alt="Logo"
              className="h-32 w-auto object-contain"
            />
          </div>

          <nav className="mt-2 space-y-2 px-10">
            {navItems.map((item, idx) => (
              <div key={idx}>
                {item.link ? (
                  <NavLink
                    to={item.link}
                    end
                    className={({ isActive }) =>
                      `flex items-center gap-2 p-2 rounded hover:bg-blue-700 hover:text-white ${
                        isActive ? "bg-blue-700 text-white" : ""
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.text}</span>
                  </NavLink>
                ) : (
                  <div>
                    <button
                      onClick={() => toggleDropdown(idx)}
                      className="w-full flex items-center justify-between gap-2 p-2 rounded hover:bg-blue-700 hover:text-white"
                    >
                      <span className="flex items-center gap-2">
                        {item.icon}
                        {item.text}
                      </span>
                      <span>{openDropdown === idx ? "▲" : "▼"}</span>
                    </button>
                    {item.children && openDropdown === idx && (
                      <div className="ml-6 mt-1 space-y-1">
                        {item.children.map((sub, subIdx) => (
                          <NavLink
                            key={subIdx}
                            to={sub.link}
                            className={({ isActive }) =>
                              `flex items-center gap-2 p-1 text-sm hover:underline ${
                                isActive ? "text-blue-500 font-medium underline" : ""
                              }`
                            }
                          >
                            {sub.icon}
                            <span>{sub.text}</span>
                          </NavLink>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="mt-6 px-10">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 p-2 rounded hover:bg-blue-600  "
            >
              <MdPermIdentity className="w-5 h-5" />
              <span>Logout</span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
};

export default Sidebar;
