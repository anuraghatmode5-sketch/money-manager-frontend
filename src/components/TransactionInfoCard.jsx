import { Trash2, UtensilsCrossed, TrendingUp, TrendingDown } from "lucide-react";
import "./TransactionInfoCard.css";
import { addThousandsSeparator } from "../util/util.js";

const TransactionInfoCard = ({ icon, title, date, amount, type, hideDeleteBtn, onDelete }) => {
    const getAmountStyles = () =>
        type === "income" ? "income-amount" : "expense-amount";

    return (
        <div className="transaction-info-card">
            <div className="transaction-icon">
                {icon ? (
                    <img src={icon} alt={title} className="transaction-icon-image" />
                ) : (
                    <UtensilsCrossed className="transaction-default-icon" />
                )}
            </div>

            <div className="transaction-details">
                <div className="transaction-text">
                    <p className="transaction-title">{title}</p>
                    <p className="transaction-date">{date}</p>
                </div>

                <div className="transaction-right">
                    <div className="transaction-actions">
                        {!hideDeleteBtn && (
                            <button
                                onClick={onDelete}
                                className="transaction-delete-btn"
                            >
                                <Trash2 size={18} />
                            </button>
                        )}
                    </div>

                    <div className={`transaction-amount ${getAmountStyles()}`}>
                        <h6 className="transaction-amount-text">
                            {type === "income" ? "+" : "-"}${addThousandsSeparator(amount)}
                        </h6>

                        {type === "income" ? (
                            <TrendingUp size={15} />
                        ) : (
                            <TrendingDown size={15} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;