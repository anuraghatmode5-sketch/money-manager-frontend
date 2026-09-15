import { useNavigate } from "react-router-dom";
import moneyIcon from "../assets/money.png";
import "./LandingNavbar.css";

const LandingNavbar = () => {
    const navigate = useNavigate();

    return (
        <nav className="landing-navbar">
            <div className="landing-logo">
                <img src={moneyIcon} alt="Money" />
                <span>Finance Ledger</span>
            </div>

            <div className="landing-nav-links">
                <a href="/#home">Home</a>
                <a href="/#about">About us</a>
                <a href="/#contact">Contact us</a>
            </div>

            <div className="landing-nav-actions">
                <button
                    className="landing-login-btn"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>

                <button
                    className="landing-get-started-btn"
                    onClick={() => navigate("/signup")}
                >
                    Get Started
                </button>
            </div>
        </nav>
    );
};

export default LandingNavbar;