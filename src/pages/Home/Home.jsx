import Dashboard from "../../components/Dashboard.jsx";
import { useUser } from "../../hooks/useUser.jsx";
import InfoCard from "../../components/InfoCard.jsx";
import { Coins, WalletCards } from "lucide-react";
import { addThousandsSeparator } from "../../util/util.js";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import toast from "react-hot-toast";
import RecentTransactions from "../../components/RecentTransactions.jsx";
import FinanceOverview from "../../components/FinanceOverview.jsx";
import Transactions from "../../components/Transactions.jsx";
import "./Home.css";

const Home = () => {
    useUser();

    const navigate = useNavigate();

    const [dashboardData, setDashboardData] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchDashboardData = async () => {
        if (loading) return;
    
        setLoading(true);
    
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.DASHBOARD_DATA
            );
        
            if (response.status === 200) {
                setDashboardData(response.data);
            }
        } catch (error) {
            console.error(
                "Something went wrong while fetching dashboard data:",
                error
            );
            toast.error("Something went wrong!");
        } finally{
            setLoading(false);
        }
    };   

    useEffect(() => {
    fetchDashboardData();
    return () => {};
    }, []);


    return (
        <div>
            <Dashboard activeMenu="Dashboard">
                <div className="home-container">
                    <div className="home-cards-grid">
                        <InfoCard
                        icon={<WalletCards />}
                        label="Total Balance"
                        value={addThousandsSeparator(dashboardData?.totalBalance || 0)}
                        color="#7c3aed"
                    />
                    
                    <InfoCard
                        icon={<WalletCards />}
                        label="Total Income"
                        value={addThousandsSeparator(dashboardData?.totalIncome || 0)}
                        color="#16a34a"
                    />

                    <InfoCard
                        icon={<Coins />}
                        label="Total Expense"
                        value={addThousandsSeparator(dashboardData?.totalExpense || 0)}
                        color="#dc2626"
                    />                    
                    </div>

                    <div className="home-content-grid">
                        {/* Recent transactions */}
                        <RecentTransactions
                            transactions={dashboardData?.recentTransactions}
                            onMore={() => navigate("/expense")}
                        />                        

                        {/* finance overview chart */}
                        <FinanceOverview
                            totalBalance={dashboardData?.totalBalance || 0}
                            totalIncome={dashboardData?.totalIncome || 0}
                            totalExpense={dashboardData?.totalExpense || 0}
                        />

                        {/* Expense transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Expenses || []}
                            onMore={() => navigate("/expense")}
                            type="expense"
                            title="Recent Expenses"
                        />
                        
                        {/* Income transactions */}
                        <Transactions
                            transactions={dashboardData?.recent5Incomes || []}
                            onMore={() => navigate("/income")}
                            type="income"
                            title="Recent Income"
                        />                                                   
                    </div>
                </div>
            </Dashboard>
        </div>
    );
};

export default Home;