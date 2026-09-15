import "./Expense.css";
import Dashboard from "../../components/Dashboard.jsx";
import { useUser } from "../../hooks/useUser.jsx";
import { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import toast from "react-hot-toast";
import ExpenseList from "../../components/ExpenseList.jsx";
import Modal from "../../components/Modal.jsx";
import AddExpenseForm from "../../components/AddExpenseForm.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";
import ExpenseOverview from "../../components/ExpenseOverview.jsx";

const Expense = () => {
    useUser();

    const [expenseData, setExpenseData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // fetch expense details from API
    const fetchExpenseDetails = async () => {
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.GET_ALL_EXPENSES
            );
console.log("expense categories", response.data);

            if (response.status === 200) {
                console.log("Expense API data:", response.data);
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch expense details:", error);
            toast.error(
                error.response?.data?.message || "Failed to fetch expense details"
            );
        }
    };

    // fetch categories for expense
    const fetchExpenseCategories = async () => {
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.CATEGORY_BY_TYPE("expense")
            );

            if (response.status === 200) {
                console.log("Expense Categories:", response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.log("Failed to fetch expense categories:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch expense categories for this category"
            );
        }
    };

    // save the expense details
    const handleAddExpense = async (expense) => {
        const { name, amount, date, icon, categoryId } = expense;

        // validation
        if (!name.trim()) {
            toast.error("Please enter a name");
            return;
        }

        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            toast.error("Amount should be a valid number greater than 0");
            return;
        }

        if (!date) {
            toast.error("Please select a date");
            return;
        }

        const today = new Date().toISOString().split("T")[0];

        if (date > today) {
            toast.error("Date cannot be in the future");
            return;
        }

        if (!categoryId) {
            toast.error("Please select a category");
            return;
        }

        try {
            const response = await axiosConfig.post(
                API_ENDPOINTS.ADD_EXPENSE,
                {
                    name,
                    amount: Number(amount),
                    date,
                    icon,
                    categoryId,
                }
            );

            if (response.status === 201) {
                setOpenAddExpenseModal(false);
                toast.success("Expense added successfully");
                fetchExpenseDetails();
                fetchExpenseCategories();
            }
        } catch (error) {
            console.log("Error adding expense", error);
            toast.error(
                error.response?.data?.message || "Failed to add expense"
            );
        }
    };

    // delete expense details
    const deleteExpense = async (id) => {
        setLoading(true);

        try {
            await axiosConfig.delete(
                API_ENDPOINTS.DELETE_EXPENSE(id)
            );

            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.log("Error deleting expense", error);
            toast.error(
                error.response?.data?.message || "Failed to delete expense"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenseDetails();
        fetchExpenseCategories();
    }, []);

    return (
        <Dashboard activeMenu="Expense">
            <div className="expense-container">
                <div className="expense-grid">

                    <ExpenseOverview
                        transactions={expenseData}
                        onAddExpense={() => setOpenAddExpenseModal(true)}
                    />

                    <ExpenseList
                        transactions={expenseData}
                        onDelete={(id) =>
                            setOpenDeleteAlert({
                                show: true,
                                data: id
                            })
                        }
                    />

                    {/* Add Expense Modal */}
                    <Modal
                        isOpen={openAddExpenseModal}
                        onClose={() => setOpenAddExpenseModal(false)}
                        title="Add Expense"
                    >
                        <AddExpenseForm
                            onAddExpense={(expense) =>
                                handleAddExpense(expense)
                            }
                            categories={categories}
                        />
                    </Modal>

                    {/* Delete Expense Modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() =>
                            setOpenDeleteAlert({
                                show: false,
                                data: null
                            })
                        }
                        title="Delete Expense"
                    >
                        <DeleteAlert
                            content="Are you sure want to delete this expense details?"
                            onDelete={() =>
                                deleteExpense(openDeleteAlert.data)
                            }
                        />
                    </Modal>

                </div>
            </div>
        </Dashboard>
    );
};

export default Expense;