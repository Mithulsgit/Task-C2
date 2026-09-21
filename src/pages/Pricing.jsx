import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { auth, db } from "../firebase";

function Pricing() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [plan, setPlan] = useState("free");
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [name, setName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [error, setError] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        try {
          const userRef = doc(db, "users", currentUser.uid);
          const userSnapshot = await getDoc(userRef);

          if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            setPlan(userData.plan || "free");
          } else {
            setPlan("free");
          }
        } catch (error) {
          console.error("Error loading user plan:", error);
        }
      } else {
        setPlan("free");
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleUpgrade = () => {
    if (!user) {
      alert("Please log in to upgrade your plan.");
      navigate("/login");
      return;
    }

    if (plan === "paid") {
      alert("You are already on the Paid plan.");
      return;
    }

    setError("");
    setShowModal(true);
  };

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }

    if (!/^\d{16}$/.test(cardNumber)) {
      setError("Card number must contain exactly 16 digits.");
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(expiry)) {
      setError("Expiry must be in MM/YY format.");
      return;
    }

    if (!/^\d{3}$/.test(cvv)) {
      setError("CVV must contain exactly 3 digits.");
      return;
    }

    if (!user) {
      setError("You must be logged in to upgrade.");
      return;
    }

    try {
      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        plan: "paid",
      });

      setPlan("paid");
      setShowModal(false);

      setName("");
      setCardNumber("");
      setExpiry("");
      setCvv("");

      alert("Your plan has been upgraded successfully!");
    } catch (error) {
      console.error("Upgrade error:", error);
      setError("Unable to upgrade your plan. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="pricing-page">
        <div className="pricing-header">
          <h1>Loading...</h1>
        </div>
      </div>
    );
  }

  const freeFeatures = [
    "Community access",
    "Basic profile",
    "Standard posts",
    "Limited posts per month",
    "Standard image uploads",
  ];

  const paidFeatures = [
    "Everything in Free",
    "Increased posts per month",
    "Early access to paid posts",
    "Larger image uploads",
    "Premium community features",
  ];

  return (
    <div className="pricing-page">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>

        <p>
          Choose the plan that works best for your DEV@Deakin experience.
        </p>

        {user ? (
          <p className="current-plan">
            Current plan:{" "}
            <strong>
              {plan === "paid" ? "Paid" : "Free"}
            </strong>
          </p>
        ) : (
          <p>Log in to upgrade your subscription.</p>
        )}

        <button
          className="home-button"
          onClick={() => navigate("/")}
        >
          ← Back to Home
        </button>
      </div>

      <div className="pricing-container">

        {/* FREE PLAN */}
        <div className="pricing-card">
          <h2>Free</h2>

          <div className="pricing-price">
            $0
            <span>/month</span>
          </div>

          <p className="pricing-description">
            Everything you need to get started.
          </p>

          <ul>
            {freeFeatures.map((feature, index) => (
              <li key={index}>
                ✓ {feature}
              </li>
            ))}
          </ul>

          {plan === "free" && user && (
            <button className="current-plan-button">
              Your Current Plan
            </button>
          )}
        </div>

        {/* PAID PLAN */}
        <div className="pricing-card paid-card">

          <div className="popular-badge">
            POPULAR
          </div>

          <h2>Paid</h2>

          <div className="pricing-price">
            $9.99
            <span>/month</span>
          </div>

          <p className="pricing-description">
            Unlock more features and greater flexibility.
          </p>

          <ul>
            {paidFeatures.map((feature, index) => (
              <li key={index}>
                ✓ {feature}
              </li>
            ))}
          </ul>

          <button
            className="upgrade-button"
            onClick={handleUpgrade}
          >
            {plan === "paid"
              ? "Already Paid"
              : "Upgrade Plan"}
          </button>

        </div>
      </div>

      {/* PAYMENT MODAL */}
      {showModal && (
        <div className="modal-overlay">

          <div className="upgrade-modal">

            <button
              className="close-modal"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>

            <h2>Upgrade to Paid</h2>

            <p>
              Enter your payment details below.
            </p>

            <form onSubmit={handlePaymentSubmit}>

              <label>
                Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(event) =>
                  setName(event.target.value)
                }
                placeholder="Enter your name"
              />

              <label>
                Card Number
              </label>

              <input
                type="text"
                value={cardNumber}
                onChange={(event) =>
                  setCardNumber(
                    event.target.value.replace(/\D/g, "")
                  )
                }
                placeholder="1234567812345678"
                maxLength="16"
              />

              <div className="payment-row">

                <div>
                  <label>
                    Expiry
                  </label>

                  <input
                    type="text"
                    value={expiry}
                    onChange={(event) =>
                      setExpiry(event.target.value)
                    }
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                </div>

                <div>
                  <label>
                    CVV
                  </label>

                  <input
                    type="password"
                    value={cvv}
                    onChange={(event) =>
                      setCvv(
                        event.target.value.replace(/\D/g, "")
                      )
                    }
                    placeholder="123"
                    maxLength="3"
                  />
                </div>

              </div>

              {error && (
                <p className="payment-error">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="confirm-upgrade-button"
              >
                Confirm Upgrade
              </button>

            </form>

          </div>
        </div>
      )}
    </div>
  );
}

export default Pricing;