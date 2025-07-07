import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";

export default function Otp() {
  const { ThemeToggle } = useAuthContext();
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  //==== Timer for resend OTP ====
  useEffect(() => {
    let timer;
    if (!canResend && resendTimer > 0) {
      timer = setTimeout(() => setResendTimer((prev) => prev - 1), 1000);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer, canResend]);

  const handleChange = (index, e) => {
    const value = e.target.value.replace(/\D/, "");
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      if (index < otp.length - 1) inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "Enter" && index === otp.length - 1) {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length !== 4) {
      window.toastify("Please enter all 4 digits.", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/verifyemail",
        { enteredOtp },
        { withCredentials: true }
      );

      if (response.data?.success) {
        window.toastify(response.data.message, "success");
        navigate("/auth/login");
      } else {
        window.toastify(response.data?.message || "Invalid OTP", "error");
        setOtp(["", "", "", ""]);
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      window.toastify(
        error.response?.data?.message || "Something went wrong.",
        "error"
      );
      setOtp(["", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setCanResend(false);
    setResendTimer(60);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/auth/resendotp",
        {},
        { withCredentials: true }
      );
      window.toastify(res.data.message || "OTP Resent", "success");
    } catch (error) {
      window.toastify(
        error.response?.data?.message || "Failed to resend OTP",
        "error"
      );
    }
  };

  return (
    <div className="flex flex-col dashboard-bg relative justify-center items-center min-h-screen px-4">
      <div className="absolute top-5 right-5">
        <ThemeToggle />
      </div>
      <div className="card-bg p-8 rounded-2xl text-center w-full max-w-md shadow-xl border border-blue-500">
        <h2 className="text-3xl font-bold mb-6 text-blue-700 dark:text-white">Email Verification</h2>
        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">Enter the 4-digit code sent to your email</p>
        <div className="flex justify-center gap-4 mb-6">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="border border-blue-600 h-14 rounded-lg text-center text-2xl w-14 dark:bg-[#1e293b] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>
        <button
          onClick={handleSubmit}
          className="btn-blue rounded-lg text-lg text-white w-full font-semibold py-2 transition"
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xl"></span>
          ) : (
            "Verify OTP"
          )}
        </button>
        <div className="mt-4 text-sm">
          {canResend ? (
            <button onClick={handleResendOTP} className="text-blue-600 hover:underline">
              Resend OTP
            </button>
          ) : (
            <p className="text-gray-500">Resend available in {resendTimer}s</p>
          )}
        </div>
      </div>
    </div>
  );
}
