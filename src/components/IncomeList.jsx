import { Download, Mail } from "lucide-react";
import TransactionInfoCard from "./TransactionInfoCard.jsx";
import moment from "moment";
import "./IncomeList.css";

const IncomeList = ({ transactions, onDelete }) => {    
    return (
            <div className="card">
                <div className="flex-items-center-justify-between">
                    <h5 className="text-lg">Income Sources</h5>

                </div>
                
                <div className="income-list-grid">
                  {/* display the incomes */}

                    {transactions.map((income) => (
                        <TransactionInfoCard
                            key={income.id}
                            title={income.name}
                            icon={income.icon}
                            date={moment(income.date).format("Do MMM YYYY")}
                            amount={income.amount}
                            type="income"
                            onDelete={() => onDelete(income.id)}
                        />
                    ))}

                </div>

            </div>
    );
};

export default IncomeList;