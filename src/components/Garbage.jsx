import "./Garbage.css";

export default function Garbage({onMoveFromInventoryToGarbage, onMoveFromCraftingToGarbage,}) {
    function handleDrop(e) {
        e.preventDefault();
        const data = e.dataTransfer.getData("text/plain");
        if (!data) return;
        const parsed = JSON.parse(data);

        if (parsed.source === "inventory") {
            onMoveFromInventoryToGarbage?.(parsed.index);
        }
        if (parsed.source === "crafting") {
            onMoveFromCraftingToGarbage?.(parsed.index);
        }
    }

    return (
        <div className="garbage-container" onDrop={handleDrop} onDragOver={(e) => e.preventDefault()}
            title="Arunca in gunoi">
            🗑️ Garbage
        </div>
    );
}
