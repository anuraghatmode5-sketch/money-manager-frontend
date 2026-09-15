import "./InfoCard.css";

const InfoCard = ({ icon, label, value, color }) => {
    return (
        <div className="info-card">
            <div
                className="info-card-icon"
                style={{ backgroundColor: color }}
            >
                {icon}
            </div>

            <div>
                <h6 className="info-card-label">{label}</h6>
                <span className="info-card-value">₹{value}</span>
            </div>
        </div>
    );
};

export default InfoCard;