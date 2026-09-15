import { X } from "lucide-react";
import "./Modal.css";

const Modal = ({ isOpen, onClose, children, title }) => {
    if (!isOpen) return null;
    return (
        <div className="modal-overlay">
            <div className="modal-container">

                {/* Modal header */}
                <div className="modal-box">

                    {/* Modal content */}
                    <div className="modal-header">
                           <h3 className="modal-title">
                               {title}
                           </h3>

                           <button
                            onClick={onClose}
                            type="button"
                            className="modal-close-button"
                           >

                           <X size={20} />
                           </button>
                    </div>

                    {/* Modal Body */}
                    <div className="modal-body">
                     {children}
                    </div>

                </div>

            </div>
        </div>
    );
};

export default Modal;