import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Income from "./pages/Income/Income.jsx";
import Expense from "./pages/Expense/Expense.jsx";
import Category from "./pages/Category/Category.jsx";
import Filter from "./pages/Filter/Filter.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Signup/Signup.jsx";
import Landing from "./components/Landing.jsx";
import { Toaster } from "react-hot-toast";

const App = () => {
    return (
        <>
            <Toaster />

            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Landing />} />
                    <Route path="/dashboard" element={<Home />} />
                    <Route path="/income" element={<Income />} />
                    <Route path="/expense" element={<Expense />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/filter" element={<Filter />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;