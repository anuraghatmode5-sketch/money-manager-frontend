import { Image, X } from "lucide-react";
import { useState } from "react";
import "./EmojiPickerPopup.css";
import EmojiPicker from "emoji-picker-react";

const EmojiPickerPopup = ({ icon, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="emoji-picker-wrapper">

            <div
                className="emoji-picker-trigger"
                onClick={() => setIsOpen(true)}
            >
                <div className="emoji-icon-box">
                    {icon ? (
                        <img
                            src={icon}
                            alt="Icon"
                            className="emoji-image"
                        />
                    ) : (
                        <Image />
                    )}
                </div>

                <p>{icon ? "Change icon" : "Pick Icon"}</p>
            </div>

            {isOpen && (
                <div className="emoji-picker-popup">

                    <button
                        type="button"
                        onClick={() => setIsOpen(false)}
                        className="emoji-close-btn"
                    >
                        <X />
                    </button>

                    <EmojiPicker
                        open={isOpen}
                        onEmojiClick={(emoji) => {
                            onSelect(emoji?.imageUrl || "");
                            setIsOpen(false);
                        }}
                    />

                </div>
            )}

        </div>
    );
};

export default EmojiPickerPopup;