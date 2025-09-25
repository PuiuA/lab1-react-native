import "./Crafting.css";
import RECIPES from "../assets/recipes.js";


export default function Crafting({
                                     slots = [],
                                     onCellClick,
                                     onDropFromInventory,
                                     onMoveInsideCrafting,
                                     result,
                                     onTakeResult,
                                 }) {
    function handleDrop(e, index) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;
        const parsed = JSON.parse(data);

        if (parsed.source === "inventory") {
            onDropFromInventory?.(parsed.index, index);
        }
        if (parsed.source === "crafting") {
            onMoveInsideCrafting?.(parsed.index, index);
        }
    }

    function handleDragStart(e, index) {
        if (!slots[index]) return;
        e.dataTransfer.setData(
            "text/plain",
            JSON.stringify({ source: "crafting", index })
        );
    }

    return (
        <div className="crafting">
            <div className="crafting__wrapper">
                <div className="crafting__grid">
                    {slots.map((v, i) => {
                        const rec = RECIPES.find(r => r.name === v);
                        return (
                            <div
                                key={i}
                                className={`crafting__cell ${v ? "is-full" : "is-empty"}`}
                                draggable={!!v}
                                onDragStart={(e) => handleDragStart(e, i)}
                                onDrop={(e) => handleDrop(e, i)}
                                onDragOver={(e) => e.preventDefault()}
                                onClick={() => v && onCellClick?.(i)}
                                title={v || "gol"}
                            >
                                {rec ? (<img src={rec.img} alt={rec.name}/>) : v || ""}
                            </div>
                        );
                    })}
                </div>

                <div
                    className={`crafting__result ${result ? "is-full" : "is-empty"}`}
                    onClick={onTakeResult}
                    title={result || "Rezultat"}
                >
                    {result ? (() => {
                        const rec = RECIPES.find(r => r.name === result);
                        return rec ? (
                            <img src={rec.img} alt={rec.name}/>
                        ) : result;
                    })() : ""}
                </div>
            </div>
        </div>
    );
}
