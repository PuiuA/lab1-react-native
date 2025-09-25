import "./Inventory.css";
import RECIPES from "../assets/recipes.js";

export default function Inventory({slots = [], cols = 9, onDropFromCrafting, onTake, onMoveInsideInventory}) {
    function handleDragStart(e, index) {
        if (!slots[index]) return;
        e.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ source: "inventory", index })
        );
    }

    function handleDrop(e, index) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;
        const parsed = JSON.parse(data);

        if (parsed.source === "crafting") {
            onDropFromCrafting?.(parsed.index, index);
        }
        if (parsed.source === "inventory") {
            onMoveInsideInventory?.(parsed.index, index);
        }
    }

    return (
        <div className="inventory">
            <div className="inventory__grid" style={{ gridTemplateColumns: `repeat(${cols}, 60px)` }}>
                {slots.map((v, i) => {
                    const rec = RECIPES.find(r => r.name === v);
                    return (
                        <div key={i} className={`inventory__cell ${v ? "is-full" : "is-empty"}`}
                            draggable={!!v} onDragStart={(e) => handleDragStart(e, i)}
                            onDrop={(e) => handleDrop(e, i)}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => v && onTake?.(i)} title={v || "gol"}>
                            {rec ? (<img src={rec.img} alt={rec.name}/>) : v || ""}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
