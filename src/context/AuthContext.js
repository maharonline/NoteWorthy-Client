import { FiMoon, FiSun } from "react-icons/fi";
import {createContext,useCallback,useContext,useEffect,useReducer,useState,} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const Auth = createContext();

const initialState = { isAuthenticated: false, user: {} };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "SET_LOGGED_IN":
      return { isAuthenticated: true, user: payload.user };
    case "SET_LOGGED_OUT":
      return initialState;
    default:
      return state;
  }
};


export default function AuthContext({ children }) {
  const navigate = useNavigate();
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [state, dispatch] = useReducer(reducer, initialState);
  const [users, setUsers] = useState({}); 
  const [themeState,setthmeState]=useState(null)

  const getUser = useCallback(async () => {
   
    try { 
      const response = await axios.get("http://localhost:8000/api/auth/user",{ withCredentials: true,});
  
      if (response.status === 200) {
        const { user,isEmailVerified } = response.data;
        setUsers(user);
        dispatch({ type: "SET_LOGGED_IN", payload: { user,isEmailVerified } });

        if (!isEmailVerified && window.location.pathname !== "/auth/otp") {
         
          navigate("/auth/otp");
        } else if (isEmailVerified && window.location.pathname === "/auth/otp") {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      // console.error(error);
  
      dispatch({ type: "SET_LOGGED_OUT" });
      setUsers(null); // just in case
  
      //sirf unexpected error ko handle kr ne k liye 
      if (error.response?.status === 401) {
        console.log("Not authenticated: No token or session expired.");
      } else if (error.response?.data?.message) {
        window.toastify(error.response.data.message, "error");
      } else {
        window.toastify("An unexpected error occurred.", "error");
      }
    } 
  }, [navigate]);

  useEffect(() => {
     setTimeout(() => {
            setIsAppLoading(false)
        }, 800);
    getUser();
  }, [getUser]);
  

  

const handleLogout = async () => {
  const result = await Swal.fire({
    title: 'Are you sure you want to logout?',
    text: "You’ll be logged out of your Noteworthy account.",
    icon: 'question',
    background: '#0f172a',
    color: '#fff',
    showCancelButton: true,
    confirmButtonColor: '#e3342f',
    cancelButtonColor: '#4f46e5',
    confirmButtonText: 'Logout',
    cancelButtonText: 'Stay Logged In',
    backdrop: `
      rgba(0, 0, 0, 0.6)
      left top
      no-repeat
    `,
  });

  if (result.isConfirmed) {
    try {
      const res=await axios.post(
        "http://localhost:8000/api/auth/logout",
        {},
        { withCredentials: true }
      );
      dispatch({ type: "SET_LOGGED_OUT" });
      setUsers(null);
      navigate("/auth/login");
      window.toastify(res.data.message, "success");
    } catch (error) {
      console.error("Logout Error:", error);
      window.toastify("Logout failed. Try again!", "error");
    }
  }
};


const deleteLogout=async()=>{
  try {
      await axios.post("http://localhost:8000/api/auth/logout",{},{ withCredentials: true });
      dispatch({ type: "SET_LOGGED_OUT" });
      setUsers(null);
      navigate("/auth/login");
      
    } catch (error) {
      console.error("Logout Error:", error);
      window.toastify("Logout failed. Try again!", "error");
    }
}

const ThemeToggle = () => {

  const [theme, setTheme] = useState(() => {
    // Get theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme); // For DaisyUI
    localStorage.setItem("theme", theme); // Save to localStorage

    if (theme === "dark") {
      document.documentElement.classList.add("dark"); // For Tailwind dark mode
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    setthmeState(theme);
  }, [theme]);
  
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button onClick={toggleTheme} className="btn btn-sm">
      {theme === "light" ? <FiMoon className="text-blue-600 text-lg" /> : <FiSun className="text-blue-600 text-lg" />}
    </button>
  );
};



  

  return (
    <Auth.Provider
      value={{ ...state, dispatch, users, isAppLoading, handleLogout,getUser,themeState,ThemeToggle,deleteLogout}}
    >
      {children}
    </Auth.Provider>
  );
}

export const useAuthContext = () => useContext(Auth);
