import { Search, Users, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MobileMenu({
  isLoggedIn,
  onLogout,
  onLogin,
  menuOpen,
  showFavoritesOnly,
  setShowFavoritesOnly,
  user,
}) {
  if (!menuOpen) return null;
  const handleFavoritesToggle = () => {
    if (!isLoggedIn) {
      onLogin && onLogin();
      return;
    }
    const newState = !showFavoritesOnly;
    setShowFavoritesOnly && setShowFavoritesOnly(newState);
    try {
      localStorage.setItem("showFavoritesOnly", String(newState));
    } catch {}
    window.dispatchEvent(
      new CustomEvent("favoritesFilterChange", { detail: newState })
    );
  };
  const navigate = useNavigate();
  const handleProfileClick = () => {
    // navigate to profile page if exists; fallback to home
    navigate("/profile");
  };
  return (
    <div className="absolute top-full left-0 w-full bg-(--surface) border-t border-(--muted) flex flex-col items-center space-y-3 py-4 md:hidden transition-all duration-300">
      {/* Profile row for mobile */}
      {isLoggedIn && user && (
        <div
          className="flex items-center w-[90%] px-3 py-2 cursor-pointer"
          onClick={handleProfileClick}
        >
          <img
            src={user.pfp_url || "/profile.png"}
            alt={user.username || "profile"}
            className="w-10 h-10 rounded-full mr-3"
          />
          <div className="flex-1 text-left">
            <div className="font-semibold text-(--text)">{user.username}</div>
            <div className="text-sm text-(--muted)">View profile</div>
          </div>
        </div>
      )}
      <div className="flex items-center bg-(--card) rounded-full px-4 py-2 w-[90%]">
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent outline-none text-(--text) placeholder-(--muted) w-full"
        />
        <Search className="text-(--muted) cursor-pointer" size={18} />
      </div>

      <div className="flex space-x-4">
        <button className="p-2 hover:bg-(--card) rounded-full cursor-pointer">
          <Users className="text-(--muted) cursor-pointer" size={20} />
        </button>
        <button
          onClick={handleFavoritesToggle}
          className="p-2 hover:bg-(--card) rounded-full cursor-pointer"
          title={showFavoritesOnly ? "Show all games" : "Show favorite games only"}
        >
          <Heart
            className={`${showFavoritesOnly ? "fill-red-500 text-red-500" : "text-(--muted)"} cursor-pointer transition-colors duration-200`}
            size={20}
          />
        </button>
      </div>

      {isLoggedIn ? (
        <button
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-md"
        >
          Logout
        </button>
      ) : (
        <button
          onClick={onLogin}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-5 py-2 rounded-md"
        >
          Login
        </button>
      )}
    </div>
  );
}
