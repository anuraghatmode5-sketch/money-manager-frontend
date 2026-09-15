import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import moneyIcon from "../assets/money.png";
import dashboardPreview from "../assets/dashboard.png";
import LandingNavbar from "./LandingNavbar.jsx";
import "./Landing.css";


const Landing = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">

            <LandingNavbar />

            <section className="landing-hero" id="home">
                  <h1>Manage Your Finances With Clarity</h1>

                   <p>
                       Finance Ledger provides a clear and organized way to track income,
                       manage expenses, and understand your financial activity in one place.
                   </p>

                <div className="landing-hero-buttons">
                    <button
                        className="landing-primary-btn"
                        onClick={() => navigate("/signup")}
                    >
                        Start Tracking for Free
                    </button>

                    <button className="landing-secondary-btn">
                        Learn More
                        <ArrowRight size={18} />
                    </button>
                </div>
            </section>

            <section className="landing-preview">
                <img
                   src={dashboardPreview}
                   alt="Money Manager Dashboard"
                />
            </section>

        </div>
    );
};

export default Landing;