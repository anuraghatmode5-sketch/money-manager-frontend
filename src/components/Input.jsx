import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import "./Input.css";

const Input = ({ label, value, onChange, placeholder, type, isSelect, options }) => {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="input-group">
            <label className="input-label">
                {label}
            </label>

            <div className="input-wrapper">
                {isSelect ? (
                    <select
                        className="input-field1"
                        value={value}
                        onChange={(e) => onChange(e)}
                    >
                        {options.map((option) => (
                            <option
                                key={option.value}
                                value={option.value}
                            >
                                {option.label}
                            </option>
                        ))}
                    </select>
                ) : (
                    <input
                        className="input-field"
                        type={type === "password" && showPassword ? "text" : type}
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => onChange(e)}
                    />
                )}

                {type === "password" && (
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Input;