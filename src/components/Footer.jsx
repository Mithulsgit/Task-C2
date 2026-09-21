import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaInstagramSquare,
} from "react-icons/fa";

function Footer() {
  async function subscribe() {
    const email = document.getElementById("email").value;

    if (email === "") {
      alert("Please enter your email.");
      return;
    }

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
      const response = await fetch(`${apiUrl}/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email
        })
      });

      const data = await response.json();

      alert(data.message);
    } catch (error) {
      alert("Server is not running.");
    }
  }

  return (
    <>
      <section className="newsletter">
        <h2>SIGN UP FOR OUR DAILY INSIDER</h2>

        <div className="subscribe-form">
          <input
            id="email"
            type="email"
            placeholder="Enter your email"
          />

          <button onClick={subscribe}>
            Subscribe
          </button>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-container">

          <div className="footer-column">
            <h3>Explore</h3>

            <a href="#">Home</a>
            <a href="#">Questions</a>
            <a href="#">Articles</a>
            <a href="#">Tutorials</a>
          </div>

          <div className="footer-column">
            <h3>Support</h3>

            <a href="#">FAQs</a>
            <a href="#">Help</a>
            <a href="#">Contact Us</a>
          </div>

          <div className="footer-column">
            <h3>Stay Connected</h3>

            <div className="social-icons">

              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookSquare />
              </a>

              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitterSquare />
              </a>

              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagramSquare />
              </a>

            </div>
          </div>

        </div>

        <h2 className="footer-title">
          DEV@Deakin 2026
        </h2>

        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms</a>
          <a href="#">Code of Conduct</a>
        </div>

      </footer>
    </>
  );
}

export default Footer;