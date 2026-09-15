import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import "./ExpenseList.css";

const ExpenseList = ({ transactions, onDelete }) => {
    return (
        <div className="card">
            <div className="flex-items-center-justify-between">
                <h5 className="text-lg">Expense Sources</h5>
            </div>

            <div className="expense-list-grid">
                {transactions.map((expense) => (
                    <TransactionInfoCard
                        key={expense.id}
                        title={expense.name}
                        icon={expense.icon}
                        date={moment(expense.date).format("Do MMM YYYY")}
                        amount={expense.amount}
                        type="expense"
                        onDelete={() => onDelete(expense.id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpenseList;