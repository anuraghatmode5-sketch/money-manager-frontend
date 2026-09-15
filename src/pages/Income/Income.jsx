import './Income.css';
import Dashboard from "../../components/Dashboard.jsx";
import { useUser } from '../../hooks/useUser.jsx';
import { useEffect, useState } from "react";
import axiosConfig from "../../util/axiosConfig.jsx";
import { API_ENDPOINTS } from "../../util/apiEndpoints.js";
import toast from "react-hot-toast";
import IncomeList from '../../components/IncomeList.jsx';
import Modal from "../../components/Modal.jsx";
import { Plus } from "lucide-react";
import AddIncomeForm from '../../components/AddIncomeForm.jsx';
import DeleteAlert from "../../components/DeleteAlert.jsx";
import IncomeOverview from '../../components/IncomeOverview.jsx';

const Income = () => {
    useUser();

    const [incomeData, setIncomeData] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [openDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    // fetch income details from API
    const fetchIncomeDetails = async () => {
        try {

            const response = await axiosConfig.get(
                API_ENDPOINTS.GET_ALL_INCOMES
            );

            if (response.status === 200) {
                console.log("Income API data:", response.data);
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch income details:", error);
            toast.error(
                error.response?.data?.message || "Failed to fetch income details"
            );
        }
    };

    // fetch categories for income
    const fetchIncomeCategories = async () => {
        try {
            const response = await axiosConfig.get(
                API_ENDPOINTS.CATEGORY_BY_TYPE("income")
            );

            if (response.status === 200) {
                console.log("Income Categories:", response.data);
                setCategories(response.data);
            }
        } catch (error) {
            console.log("Failed to fetch income categories:", error);
            toast.error(
                error.response?.data?.message ||
                "Failed to fetch income categories for this category"
            );
        }
    };

    //save the income details
    const handleAddIncome = async (income) => {
    const { name, amount, date, icon, categoryId } = income;

    //validation
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
        API_ENDPOINTS.ADD_INCOME,
        {
            name,
            amount: Number(amount),
            date,
            icon,
            categoryId,
        }
    );

    if (response.status === 201) {
        setOpenAddIncomeModal(false);
        toast.success("Income added successfully");
        fetchIncomeDetails();
        fetchIncomeCategories();
    }
    } catch (error) {
    console.log("Error adding income", error);
    toast.error(
        error.response?.data?.message || "Failed to adding income"
    );
    }
};

    //delete income details
    const deleteIncome = async (id) => {
    setLoading(true);

    try {
        await axiosConfig.delete(API_ENDPOINTS.DELETE_INCOME(id));
        setOpenDeleteAlert({ show: false, data: null });
        toast.success("Income deleted successfully");
        fetchIncomeDetails();
    } catch (error) {
        console.log("Error deleting income", error);
        toast.error(
            error.response?.data?.message || "Failed to delete income"
        );
    } finally{
        setLoading(false);
    }
};

    useEffect(() => {
        fetchIncomeDetails();
        fetchIncomeCategories();
    }, []);

    return (
        <Dashboard activeMenu="Income">
            <div className="income-container">
                <div className="income-grid">
                    <div className="income-overview">
              
                    </div>
                    
                    <IncomeOverview transactions={incomeData} onAddIncome={()=> setOpenAddIncomeModal(true)} />

                    <IncomeList
                        transactions={incomeData}
                        onDelete={(id) =>
                            setOpenDeleteAlert({show:true,data:id })
                        }
                        
                    />

                    {/* Add Income Modal */}
                    <Modal
                        isOpen={openAddIncomeModal}
                        onClose={() => setOpenAddIncomeModal(false)}
                        title="Add Income"
                    >
                        
                        <AddIncomeForm
                             onAddIncome={(income) => handleAddIncome(income)}
                             categories={categories}
                        />


                    </Modal>

                     {/* Delete Income Modal */}
                    <Modal
                        isOpen={openDeleteAlert.show}
                        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
                        title="Delete Income"
                    >
                            <DeleteAlert
                                content="Are you sure want to delete this income details?"
                                onDelete={() => deleteIncome(openDeleteAlert.data)}
                            />                        
                    </Modal>                     

                </div>
            </div>
        </Dashboard>
    );
};

export default Income;