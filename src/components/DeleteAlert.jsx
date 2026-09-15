import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import "./DeleteAlert.css";

const DeleteAlert = ({ content, onDelete }) => {
    
    const [loading, setLoading] = useState(false);

     const handleDelete = async () => {
         setLoading(true);
     
         try {
             await onDelete();
         } finally {
             setLoading(false);
         }
     };


    return (
        <div>
            <p className="delete-alert-text">{content}</p>

            <div className="delete-alert-actions">
                <button
                    onClick={handleDelete}
                    type="button"
                    className="add-btn add-btn-fill"
                >
                    {loading ? (
    <>
                        <LoaderCircle className="loading-icon" />
                             Deleting...
                         </>
                     ) : (
                         <>
                            Delete
                        </>
                     )}                     
                </button>
            </div>
        </div>
    )
}

export default DeleteAlert;