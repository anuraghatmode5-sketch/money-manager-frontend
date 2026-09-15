import Menubar from "./Menubar.jsx";
import { useContext } from "react";
import { AppContext } from "../Context/AppContext.jsx";
import "./Dashboard.css";
import Sidebar from "./Sidebar.jsx";

const Dashboard = ({children, activeMenu}) => {
    const { user } = useContext(AppContext);
    return (
        <div>
            <Menubar activeMenu={activeMenu} />
            
            {user && (
                <div className="dashboard-content">
                    <div className="sidebar-container">
                        <Sidebar activeMenu={activeMenu}/>
                    </div>

                    <div className="dashboard-main-content">
                        {children}
                    </div>
                </div>
            )}

        </div>
    );
};

export default Dashboard;