import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import Input from "../../components/Input.jsx";
import { validateEmail } from "../../util/validation.js";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import { useContext } from "react";
import { AppContext } from "../../Context/AppContext.jsx";
import { LoaderCircle } from "lucide-react";
import LandingNavbar from "../../components/LandingNavbar.jsx";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setUser } = useContext(AppContext);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // basic validation
    if (!validateEmail(email)) {
        setError("Please enter your email");
         setIsLoading(false);
        return;
    }

    if (!password.trim()) {
        setError("Please enter your password");
         setIsLoading(false);
        return;
    }

    setError("");

    // LOGIN API call
    try {
        const response = await axiosConfig.post(
            API_ENDPOINTS.LOGIN,
            {
                email,
                password,
            }
        );
    
        const { token, user } = response.data;
    
        if (token) {
            localStorage.setItem("token", token);
            setUser(user);
            navigate("/dashboard");
        }
    } catch (error) {
        if (error.response && error.response.data.message) {
            setError(error.response.data.message);
        } else {
            console.error("Something went wrong", error);
            setError(error.message);
        }
    }
    finally{
         setIsLoading(false);
    }
    }

    return (
        <div className="login-page">
            <LandingNavbar />
            {/* Background image with blur */}
            <img
                src={assets.login_bg}
                alt="Background"
                className="login-background"
            />

            <div className="login-container">
                <div className="login-card">
                    <h3 className="login-title">
                        Welcome Back
                    </h3>

                    <p className="login-subtitle">
                        Login to continue managing your expenses.
                    </p>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-grid">
                            <Input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                label="Email Address"
                                placeholder="name@example.com"
                                type="text"
                            />

                            <div className="password-field">
                                <Input
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    placeholder="**********"
                                    type="password"
                                />
                            </div>
                        </div>

                        {error && (
                            <p className="login-error">
                                {error}
                            </p>
                        )}

                        <button
                           disabled={isLoading}
                            className="btn-primary"
                            type="submit"
                        >
                            {isLoading ? (
                                <>
                                    <LoaderCircle className="loading-icon" size={20} />
                                    Logging in...
                                </>
                            ) : (
                                "LOGIN"
                            )}
                        </button>                         

                        <p className="signup-link-text">
                            Don't have an account?
                            <Link to="/signup" className="signup-link">
                                Sign Up
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;