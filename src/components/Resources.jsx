import "./Resources.css";

export default function Resources({ onPick }) {
    return (
        <div className="resources">
            <div className="resources__list">
                <button className="resources__item resources__item--metal"  onClick={() => onPick?.("Metal")}>
                    <img src="src/images/metal.png" alt="Metal" />
                </button>
                <button className="resources__item resources__item--pamant" onClick={() => onPick?.("Pamant")}>
                    <img src="src/images/pamant.png" alt="Pamant" />
                </button>
                <button className="resources__item resources__item--lemn"   onClick={() => onPick?.("Lemn")}>
                    <img src="src/images/wood.png" alt="Lemn" />
                </button>
            </div>
        </div>
    );
}
