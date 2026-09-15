import { useEffect, useState } from "react";
import { prepareIncomeLineChartData } from "../util/util.js";
import CustomLineChart from "./CustomLineChart.jsx";
import { Plus } from "lucide-react";
import "./IncomeOverview.css";

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeLineChartData(transactions);
        console.log(result);
        setChartData(result);

        return () => {};
    }, [transactions]);


    return (
        <div className="card">
            <div className="income-overview-header">
                <div>
                    <h5 className="text-lg">
                        Income Overview
                    </h5>
                    <p className="income-description">
                        Track your earnings over time and analyze your income trends.
                    </p>
                </div>
                        <button
                            className="add-btn"
                            onClick={onAddIncome}
                        >
                            <Plus size={15} />
                            Add Income
                            </button>
            </div>
            <div className="income-chart-container">
                <CustomLineChart data={chartData} />
            </div>
        </div>
    );
};

export default IncomeOverview;