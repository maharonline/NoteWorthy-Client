import { useAuthContext } from "../../../context/AuthContext";

export default function PendingApproval() {
  const { handleLogout, ThemeToggle } = useAuthContext();

 

  return (
    <div className="min-h-screen flex items-center relative justify-center">
      <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div>

      <div className="card-bg shadow-2xl rounded-2xl p-8 text-center w-full max-w-md relative border border-blue-700 ">
        {/*==== Logo ====*/}
        <img
          src="/Assets/image/Logo.png"
          alt="Noteworthy Logo"
          className="h-20 mx-auto mb-4"
        />

        {/*==== Spinner ====*/}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 border-[6px] border-blue-600 border-t-transparent rounded-full animate-spin shadow-md shadow-blue-300"></div>
        </div>

        {/*==== Title & Subtitle ====*/}
        <h2 className="text-2xl font-bold heading-color mb-2 tracking-wide">
          Awaiting Admin Approval
        </h2>
        <p className="heading-color mb-4 leading-relaxed">
          Your teacher account is currently under review. We will notify you as soon as your request is approved. Thank you for your patience!
        </p>

        {/*==== Logout Button ====*/}
        <button
          onClick={handleLogout}
          className="mt-4 btn-blue text-white font-semibold px-6 py-2 rounded-full shadow-lg transition-transform transform hover:scale-105"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
