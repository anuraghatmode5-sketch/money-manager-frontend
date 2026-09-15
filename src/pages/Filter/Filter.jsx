import "./Filter.css";
import Dashboard from "../../components/Dashboard.jsx";
import { useUser } from "../../hooks/useUser.jsx";
import { Search } from "lucide-react";
import { useState } from "react";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import toast from "react-hot-toast";
import TransactionInfoCard from "../../components/TransactionInfoCard.jsx";
import moment from "moment";


const Filter = () => {
    useUser();
    const [type, setType] = useState("income");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [keyword, setKeyword] = useState("");
    const [sortField, setSortField] = useState("date");
    const [sortOrder, setSortOrder] = useState("asc");
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);

const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axiosConfig.post(
            API_ENDPOINTS.APPLY_FILTERS,
            {
                type,
                startDate,
                endDate,
                keyword,
                sortField,
                sortOrder
            }
        );

        setTransactions(response.data);
    } catch (error) {
        console.error("Failed to fetch transactions:", error);
        toast.error(error.message || "Failed to fetch transactions. Please try again.");
    }finally {
    setLoading(false);
}
};

    return (
        <Dashboard activeMenu="Filters">
            <div className="filter-container">
                <div className="filter-header">
                    <h2 className="filter-title">Filter Transactions</h2>
                </div>

                <div className="card filter-card">
                    <div className="filter-card-header">
                        <h5 className="filter-card-title">
                            Select the filters
                        </h5>
                    </div>

                    <form className="filter-form">
                        <div className="filter-form-group">
                            <label htmlFor="type">Type</label>

                            <select value={type} id="type" onChange={(e) => setType(e.target.value)} >
                                <option value="income">Income</option>
                                <option value="expense">Expense</option>
                            </select>
                        </div>

                        <div className="filter-form-group">
                            <label htmlFor="startdate">
                                Start Date
                            </label>

                            <input
                                id="startdate"
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                            />
                        </div>

                        <div className="filter-form-group">
                            <label htmlFor="enddate">
                                End Date
                            </label>

                            <input
                                id="enddate"
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                            />
                        </div>
                        
                        <div className="filter-form-group">
                             <label htmlFor="sortfield">
                                 Sort Field
                             </label>

                             <select
                                 value={sortField}
                                 id="sortfield"
                                 className="filter-select"
                                 onChange={(e) => setSortField(e.target.value)}
                             >
                                 <option value="date">Date</option>
                                 <option value="amount">Amount</option>
                                 <option value="category">Category</option>
                             </select>
                         </div>

                        <div className="filter-form-group">
                            <label htmlFor="sortorder">
                                Sort Order
                            </label>
                        
                            <select id="sortorder" value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>
                        </div>  

                        <div className="search-filter-group">
                             <div className="search-input-wrapper">
                                 <label htmlFor="keyword">
                                     Search
                                 </label>
                         
                                 <input
                                     id="keyword"
                                     type="text"
                                     placeholder="Search..."
                                     value={keyword}
                                     onChange={(e) => setKeyword(e.target.value)}
                                 />
                             </div>

                             <button
                                 type="submit"
                                 className="search-button"
                                 onClick={handleSearch}
                             >
                                 <Search size={20} />
                             </button>
                         </div>                        
                    </form>
                </div>
                 
                <div className="card filter-result-card">
                    <div className="filter-card-header">
                        <h5 className="filter-card-title">
                            Transactions
                        </h5>
                    </div>
                    {transactions.length === 0 && !loading ? (
                        <p className="filter-empty-message">
                            Select the filters and click apply to filter the transactions
                        </p>
                    ) : (
                        ""
                    )}
                    {loading ? (
                        <p className="filter-empty-message">
                            Loading Transactions
                        </p>
                    ) : (
                        ""
                    )}
                     {transactions.map((transaction) => (
                        <TransactionInfoCard
                            key={transaction.id}
                            title={transaction.name}
                            icon={transaction.icon}
                            date={moment(transaction.date).format("Do MMM YYYY")}
                            amount={transaction.amount}
                            type={type}
                            hideDeleteBtn
                        />
                    ))}
                </div>

            </div>
        </Dashboard>
    );
};

export default Filter;