import { useRef, useState } from "react";
import { User, Upload, Trash } from "lucide-react";
import "./ProfilePhotoSelector.css";

const ProfilePhotoSelector = ({ image, setImage }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
        setImage(file);

        const preview = URL.createObjectURL(file);
        setPreviewUrl(preview);
    }
}
   const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage(null);
    setPreviewUrl(null);
};

const onChooseFile = (e) => {
    e.preventDefault();
    inputRef.current?.click();
};

    return (
       <div className="profile-photo-container">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="profile-photo-input"
            />
             
             {!image ? (
    <div className="profile-photo-placeholder">
        <User className="profile-user-icon" size={35} />

        <button
            type="button"
            onClick={onChooseFile}
            className="profile-upload-button"
        >
            <Upload size={15} />
        </button>
    </div>
    ) : (
        
         <div className="profile-photo-preview">
        <img
            src={previewUrl}
            alt="profile photo"
            className="profile-photo-image"
        />

        <button
            type="button"
            onClick={handleRemoveImage}
            className="profile-remove-button"
        >
            <Trash size={15} />
        </button>
    </div>

    )}

        </div>
    );
};

export default ProfilePhotoSelector;