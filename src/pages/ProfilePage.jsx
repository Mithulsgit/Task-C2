import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, db } from "../firebase";
import Header from "../components/Header";
import Footer from "../components/Footer";

function ProfilePage() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDocument = await getDoc(doc(db, "users", user.uid));

        if (userDocument.exists()) {
          setUserData(userDocument.data());
        }
      }
    });

    return () => unsubscribe();
  }, []);

  if (!userData) {
    return (
      <>
        <Header />

        <div className="auth-page">
          <div className="auth-container">
            <h1>Loading Profile...</h1>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <div className="profile-page">
        <div className="profile-container">
          <h1>My Profile</h1>

          <div className="profile-information">
            <p>
              <strong>Name:</strong> {userData.name}
            </p>

            <p>
              <strong>Email:</strong> {userData.email}
            </p>
          </div>

          <Link to="/" className="profile-home-link">
            Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default ProfilePage;