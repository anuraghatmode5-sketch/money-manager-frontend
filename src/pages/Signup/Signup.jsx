import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets.js";
import Input from "../../components/Input.jsx";
import { validateEmail } from "../../util/validation.js";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import toast from "react-hot-toast";
import { LoaderCircle } from "lucide-react";
import ProfilePhotoSelector from "../../components/ProfilePhotoSelector.jsx";
import uploadProfileImage from "../../util/uploadProfileImage.js";
import LandingNavbar from "../../components/LandingNavbar.jsx";
import "./Signup.css";

const Signup = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";
    setIsLoading(true);

    // basic validation
    if (!fullName.trim()) {
        setError("Please enter your fullname");
        setIsLoading(false);
        return;
    }

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

    // signup api call
    try {
        
        //upload image if present
        if(profilePhoto){
            const imageUrl = await uploadProfileImage(profilePhoto);
            profileImageUrl = imageUrl || "";
        }

        const response = await axiosConfig.post(
            API_ENDPOINTS.REGISTER,
            {
                fullName,
                email,
                password,
                profileImageUrl
            }
        );
    
        if (response.status === 201) {
            toast.success("Profile created successfully.");
            navigate("/login");
        }
    } catch (err) {
    console.error("Something went wrong", err);
    setError(err.message);
    }
    finally{
        setIsLoading(false);
    }
    
};

    return (
        <div className="signup-page">
           <LandingNavbar />
            {/* Background image with blur */}
            <img
                src={assets.login_bg}
                alt="Background"
                className="signup-background"
            />

            <div className="signup-container">
            <div className="signup-card">
                <h3 className="signup-title">
                    Create An Account
                </h3>

                <p className="signup-subtitle">
                    Start tracking your spendings by joining with us.
                </p>
                
                <form className="signup-form " onSubmit={handleSubmit}>
                <div className="profile-image-container">
                <ProfilePhotoSelector image={profilePhoto} setImage={setProfilePhoto} />
                </div>
        
                <div className="signup-grid">
                     <Input
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        label="Full Name"
                        placeholder="Enter full Name"
                        type="text"
                    />
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
                    <p className="signup-error">
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
                        Signing Up...
                    </>
                ) : (
                    "SIGN UP"
                )}
               </button>
                    
                    <p className="login-link-text">
                        Already have an account?
                        <Link to="/login" className="login-link">
                            Login
                        </Link>
                    </p>
                </form>

            </div>
        </div>
        </div>

    );

};

export default Signup;