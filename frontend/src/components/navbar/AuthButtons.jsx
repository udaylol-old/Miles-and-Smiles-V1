import { useNavigate } from "react-router-dom";

export default function AuthButtons({
  isLoggedIn,
  handleLogout,
  handleLogin,
  mobileVisible = false,
}) {
  const navigate = useNavigate();
  const visibility = mobileVisible ? "block md:hidden" : "hidden md:block";
  const size = mobileVisible
    ? "px-3 py-1 text-sm rounded-full"
    : "px-4 py-2 text-base rounded-full";

  return isLoggedIn ? (
    <button
      onClick={handleLogout}
      className={`${visibility} ${size} bg-red-500 hover:bg-red-600 text-white font-semibold cursor-pointer`}
    >
      Logout
    </button>
  ) : (
    <button
      onClick={handleLogin || (() => navigate("/auth"))}
      className={`${visibility} ${size} bg-blue-500 hover:bg-blue-600 text-white font-semibold cursor-pointer`}
    >
      Login
    </button>
  );
}
