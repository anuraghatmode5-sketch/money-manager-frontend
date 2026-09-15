import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import Input from "./Input.jsx";
import EmojiPickerPopup from "./EmojiPickerPopup.jsx";
import "./AddExpenseForm.css";

const AddExpenseForm = ({ onAddExpense, categories }) => {
    const [expense, setExpense] = useState({
        name: "",
        amount: "",
        date: "",
        icon: "",
        categoryId: ""
    });

    const [loading, setLoading] = useState(false);

    const categoryOptions = categories.map((category) => ({
        value: category.id,
        label: category.name
    }));

    const handleChange = (key, value) => {
        setExpense((prev) => ({
            ...prev,
            [key]: value
        }));
    };

    useEffect(() => {
        if (categories.length > 0 && !expense.categoryId) {
            setExpense((prev) => ({
                ...prev,
                categoryId: categories[0].id
            }));
        }
    }, [categories, expense.categoryId]);

    const handleSubmit = async () => {
        setLoading(true);

        try {
            await onAddExpense(expense);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <EmojiPickerPopup
                icon={expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />

            <Input
                value={expense.name}
                onChange={({ target }) => handleChange("name", target.value)}
                label="Expense Name"
                placeholder="e.g., Food, Shopping, Travel"
                type="text"
            />

            <Input
                label="Category"
                value={expense.categoryId}
                onChange={({ target }) => handleChange("categoryId", target.value)}
                isSelect={true}
                options={categoryOptions}
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder="e.g., 500.00"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="expense-actions">
                <button
                    onClick={handleSubmit}
                    className="add-btn"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <LoaderCircle className="loading-icon" />
                            Adding...
                        </>
                    ) : (
                        "Add Expense"
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;