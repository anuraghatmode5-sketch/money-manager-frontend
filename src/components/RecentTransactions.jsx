import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import "./RecentTransactions.css";

const RecentTransactions = ({ transactions, onMore }) => {
    return (
        <div className="card">
            <div className="recent-transactions-header">
                <h4 className="text-lg">Recent Transactions</h4>

                <button
                    className="card-btn"
                    onClick={onMore}
                >
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="recent-transactions-list">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={item.type}
                        hideDeleteBtn
                    />
                ))}
                </div>                
        </div>
    );
};

export default RecentTransactions;