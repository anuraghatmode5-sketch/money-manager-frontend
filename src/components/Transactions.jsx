import { ArrowRight } from "lucide-react";
import moment from "moment";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import "./Transactions.css";

const Transactions = ({ transactions, onMore, type, title }) => {
    return (
        <div className="card transactions-card">
            <div className="transactions-header">
                <h5 className="transactions-title">{title}</h5>

                <button
                    className="card-btn"
                    onClick={onMore}
                >
                    More <ArrowRight className="text-base" size={15} />
                </button>
            </div>

            <div className="transactions-list">
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item.id}
                        title={item.name}
                        icon={item.icon}
                        date={moment(item.date).format("Do MMM YYYY")}
                        amount={item.amount}
                        type={type}
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    );
};

export default Transactions;