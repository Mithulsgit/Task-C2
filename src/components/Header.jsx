import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";

import { auth } from "../firebase";

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="site-header">
      <div className="dev-logo">
        <Link to="/">DEV@Deakin</Link>
      </div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search..."
          aria-label="Search"
        />
      </div>

      <nav className="main-navigation">
        <Link to="/post" className="post-link">
          Post
        </Link>

        <Link to="/pricing" className="pricing-link">
          Pricing
        </Link>

        {user ? (
          <>
            <Link to="/profile" className="profile-link">
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="login-link">
              Login
            </Link>
            <Link to="/register" className="register-link">
              Sign Up
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
