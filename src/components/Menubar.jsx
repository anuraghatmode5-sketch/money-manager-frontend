import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import { useNavigate } from "react-router-dom";
import { User, Menu, X, LogOut } from "lucide-react";
import moneyIcon from "../assets/money.png";
import Sidebar from "./Sidebar.jsx";
import "./Menubar.css";

const Menubar = ({activeMenu}) => {
    const [openSideMenu, setOpenSideMenu] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);
    const { user , clearUser } = useContext(AppContext);
    const navigate = useNavigate();

    const handleLogout = () => {
         localStorage.clear();
         clearUser();
         setShowDropdown(false);
         navigate("/login");
    };

    useEffect(() => {
    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setShowDropdown(false);
        }
    };

    if (showDropdown) {
        document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [showDropdown]);

    return (
        <div className="menubar">
         {/* left side */}
             <div className="menubar-left">
    <button
        onClick={() => setOpenSideMenu(!openSideMenu)}
        className="menu-toggle-button"
    >
        {openSideMenu ? (
            <X className="menu-icon" />
        ) : (
            <Menu className="menu-icon" />
        )}
    </button>

    <div className="menubar-brand">
        <img
            src={moneyIcon}
            alt="logo"
            className="menubar-logo"
        />

        <span className="menubar-title">
            Finance Ledger
        </span>
    </div>
</div>

            {/* right side */}

            <div className="menubar-avatar-container" ref={dropdownRef}>
          <button
           type="button"
           className="avatar-button"
           onClick={() => setShowDropdown(!showDropdown)}
          >
          <User className="user-icon" />

          </button>
          
          {showDropdown && (
    <div className="dropdown-menu">
        {/* User info */}
        <div className="dropdown-user-info">
             <div className="dropdown-user-details">
                 <div className="dropdown-user-avatar">
                         <User className="dropdown-user-icon" />
                </div>

                <div className="dropdown-user-text">
                    <p className="user-full-name">
                     {user.fullName}
                    </p>
                
                    <p className="user-email">
                        {user.email}
                    </p>
                </div>
            </div>
        </div>

        {/* Drop options */}
        <div className="dropdown-options">
            <button
            type="button"
            onClick={handleLogout}
             className="logout-button"
            >
            <LogOut className="logout-icon" />
            <span>Logout</span>
           </button>
        </div>
    </div>
    )}

          </div>

            {/* Mobile side menu */}
             {openSideMenu && (
                 <div className="mobile-side-menu">
                     <Sidebar activeMenu={activeMenu} />
                 </div>
             )}

            
        </div>
    );
};

export default Menubar;