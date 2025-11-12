import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { useSearch } from "../context/SearchContext.jsx";
import SearchBar from "./navbar/SearchBar.jsx";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Logo from "./navbar/Logo.jsx";
import Friends from "./navbar/Friends.jsx";
import Favourites from "./navbar/Favourites.jsx";
import ThemeToggle from "./navbar/ThemeToggle.jsx";
import Profile from "./navbar/Profile.jsx";
import AuthButtons from "./navbar/AuthButtons.jsx";
import MobileMenu from "./navbar/MobileMenu.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user, logout } = useAuth();
  const { setQuery } = useSearch(); // 🔥 new

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    localStorage.setItem("showFavoritesOnly", "false");
    window.dispatchEvent(new CustomEvent("favoritesFilterChange", { detail: false }));
    navigate("/");
  };

  return (
    <nav className="bg-(--surface) text-(--text) flex items-center justify-between px-4 md:px-6 py-3 shadow-md transition-colors duration-200 relative">
      <Logo username={user?.username} isLoggedIn={isAuthenticated} />

      {/* 🔥 Real-time search */}
      <SearchBar onChange={(value) => setQuery(value)} />

      <div className="flex items-center space-x-3 md:space-x-4">
        <Friends />
        <Favourites isLoggedIn={isAuthenticated} />
        <ThemeToggle />
        {isAuthenticated && <Profile user={user} />}
        <AuthButtons isLoggedIn={isAuthenticated} onLogout={handleLogout} />
        <button onClick={toggleMenu} className="md:hidden p-2 hover:bg-(--card) rounded-full cursor-pointer">
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <MobileMenu
        isAuthenticated={isAuthenticated}
        onLogout={handleLogout}
        onLogin={() => navigate("/auth")}
        menuOpen={menuOpen}
        user={user}
      />
    </nav>
  );
};

export default Navbar;
