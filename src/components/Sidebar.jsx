import { useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { User } from "lucide-react";
import { SIDE_BAR_DATA } from "../assets/assets.js";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";

const Sidebar = ({activeMenu}) => {
    const { user } = useContext(AppContext);
    const navigate = useNavigate();
    return (
        <div className="sidebar">
            <div className="sidebar-profile">
                {user?.profileImageUrl ? (
            <img
            src={user?.profileImageUrl || ""} alt="profile image" className="sidebar-profile-image"
            />
            ) : (
           <User className="sidebar-user-icon" />
            )}

            <h5 className="sidebar-user-name">
                 {user.fullName || ""}
           </h5>
           </div>

           {SIDE_BAR_DATA.map((item, index) => (
                <button
                    key={`menu_${index}`}
                    onClick={() => navigate(item.path)}
                    className={`sidebar-menu-item ${
                        activeMenu === item.label ? "active" : ""
                 }`}
                >
                    <item.icon className="sidebar-menu-icon" />
                    {item.label}
                </button>
           ))}
        </div>
    );
};

export default Sidebar;