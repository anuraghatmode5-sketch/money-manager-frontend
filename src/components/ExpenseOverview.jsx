import { useEffect, useState } from "react";
import { prepareExpenseLineChartData } from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";
import "./ExpenseOverview.css";

const ExpenseOverview = ({ transactions, onAddExpense }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);

    return (
        <div className="card">
            <div className="expense-overview-header">
                <div>
                    <h5 className="text-lg">
                        Expense Overview
                    </h5>
                    <p className="expense-description">
                        Track your expenses over time and analyze your spending trends.
                    </p>
                </div>

                <button
                    className="add-btn"
                    onClick={onAddExpense}
                >
                    <Plus size={15} />
                    Add Expense
                </button>
            </div>

            <div className="expense-chart-container">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default ExpenseOverview;