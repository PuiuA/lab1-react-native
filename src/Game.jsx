import { useEffect, useMemo, useState } from "react";
import DiscoveryPanel from "./components/DiscoveryPanel.jsx";
import Crafting from "./components/Crafting.jsx";
import Resources from "./components/Resources.jsx";
import Inventory from "./components/Inventory.jsx";
import Garbage from "./components/Garbage.jsx";
import RECIPES from "./assets/recipes.js";
import "./Game.css";
import DiscoveredRecipes from "./components/DiscoveredRecipes.jsx";


const COLS = 9;
const START_ROWS = 3;
const BASE_SIZE = START_ROWS * COLS;

function trimInventory(next) {
    let len = next.length;
    while (len > BASE_SIZE) {
        let allEmpty = true;
        for (let i = len - COLS; i < len; i++) {
            if (next[i] !== null) { allEmpty = false; break; }
        }
        if (!allEmpty) break;
        next = next.slice(0, len - COLS);
        len = next.length;
    }
    if (next.length < BASE_SIZE) {
        next = [...next, ...Array(BASE_SIZE - next.length).fill(null)];
    }
    return next;
}

const LS_KEYS = {
    inventory: "cm_inventory",
    crafting: "cm_crafting",
    result: "cm_result",
    recipes: "cm_recipes_seeded",
};

function makeEmptySlots(rows) {
    return Array(rows * COLS).fill(null);
}

function loadLS(key, fallback) {
    try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : fallback;
    } catch {
        return fallback;
    }
}

function saveLS(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function matchesPattern(grid, pattern) {
    for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
            const need = pattern[r][c] ?? null;
            const has = grid[r * 3 + c] ?? null;
            if (need !== has) return false;
        }
    }
    return true;
}

export default function Game() {
    useEffect(() => {
        if (!localStorage.getItem(LS_KEYS.recipes)) {
            localStorage.setItem(LS_KEYS.recipes, "1");
        }
    }, []);

    const [inventory, setInventory] = useState(() => loadLS(LS_KEYS.inventory, makeEmptySlots(START_ROWS)));
    const [crafting, setCrafting] = useState(() => loadLS(LS_KEYS.crafting, Array(9).fill(null)));
    const [result, setResult] = useState(() => loadLS(LS_KEYS.result, null));
    const [discovered, setDiscovered] = useState(() => loadLS("cm_discovered", []));
    const [win, setWin] = useState(false);

    useEffect(() => saveLS("cm_discovered", discovered), [discovered]);
    useEffect(() => saveLS(LS_KEYS.inventory, inventory), [inventory]);
    useEffect(() => saveLS(LS_KEYS.crafting, crafting), [crafting]);
    useEffect(() => saveLS(LS_KEYS.result, result), [result]);

    function handleMoveInsideInventory(srcIdx, dstIdx) {
        if (srcIdx === dstIdx) return;

        setInventory((prev) => {
            const next = [...prev];
            const srcVal = next[srcIdx];
            const dstVal = next[dstIdx];
            if (!srcVal) return prev;

            if (!dstVal) { next[dstIdx] = srcVal; next[srcIdx] = null; }
            else { next[dstIdx] = srcVal; next[srcIdx] = dstVal; }

            return trimInventory(next);
        });
    }


    function handleMoveInsideCrafting(srcIdx, dstIdx) {
        if (srcIdx === dstIdx) return;

        setCrafting((prev) => {
            const next = [...prev];
            const srcVal = next[srcIdx];
            const dstVal = next[dstIdx];

            if (!srcVal) return prev;

            // destinatia e goala -> muta
            //daca e plina -> SWAP (schimb)
            if (!dstVal) {
                next[dstIdx] = srcVal;
                next[srcIdx] = null;
            } else {
                next[dstIdx] = srcVal;
                next[srcIdx] = dstVal;
            }
            return next;
        });
    }

    function handleDropFromInventory(invIndex, craftIndex) {
        const item = inventory[invIndex];
        if (!item) return;

        setInventory((prev) => {
            const next = [...prev];
            next[invIndex] = null;
            return trimInventory(next);
        });

        setCrafting((prev) => {
            const next = [...prev];
            if (!next[craftIndex]) {
                next[craftIndex] = item;
            }
            return next;
        });
    }
    function handleDropFromCrafting(craftIndex, invIndex) {
        const item = crafting[craftIndex];
        if (!item) return;

        setCrafting((prev) => {
            const next = [...prev];
            next[craftIndex] = null;
            return next;
        });

        setInventory((prev) => {
            const next = [...prev];
            if (!next[invIndex]) {
                next[invIndex] = item;
            }
            return trimInventory(next);
        });
    }

    function handleMoveFromInventoryToGarbage(invIndex) {
        setInventory((prev) => {
            const next = [...prev];
            next[invIndex] = null;   // șterge itemul
            return trimInventory(next);
        });
    }

    function handleMoveFromCraftingToGarbage(craftIndex) {
        setCrafting((prev) => {
            const next = [...prev];
            next[craftIndex] = null; // șterge itemul
            return next;
        });
    }


    function addToInventory(itemName) {
        setInventory((prev) => {
            const idx = prev.findIndex((x) => x === null);
            if (idx !== -1) {
                const copy = [...prev];
                copy[idx] = itemName;
                return copy;
            }
            const extended = [...prev, ...Array(COLS).fill(null)];
            extended[prev.length] = itemName;
            return extended;
        });
    }

    function handlePickFromResources(itemName) {
        addToInventory(itemName);
    }

    function moveFromInventoryToCraft(invIndex) {
        const item = inventory[invIndex];
        if (!item) return;
        const target = crafting.findIndex((c) => c === null);
        if (target === -1) return;

        setCrafting((prev) => {
            const next = [...prev];
            next[target] = item;
            return next;
        });
        setInventory((prev) => {
            const next = [...prev];
            next[invIndex] = null;
            return trimInventory(next);
        });
    }

    function returnFromCraftToInventory(craftIndex) {
        const item = crafting[craftIndex];
        if (!item) return;
        addToInventory(item);
        setCrafting((prev) => {
            const next = [...prev];
            next[craftIndex] = null;
            return next;
        });
    }

    function takeResult() {
        if (!result) return;
        addToInventory(result);
        setDiscovered(prev => {
            const already = prev.includes(result);
            const next = already ? prev : [...prev, result];

            if (!already && result === "Platou moldovenesc") {
                setWin(true);
            }
            return next;
        });
        setResult(null);
        setCrafting(Array(9).fill(null));
    }

    // verificam craftul
    const matched = useMemo(() => {
        for (const rec of RECIPES) {
            if (matchesPattern(crafting, rec.pattern)) return rec.name;
        }
        return null;
    }, [crafting]);

    // verificare la schimbari pe masa de craft
    useEffect(() => {
        setResult(matched || null);
    }, [matched]);

    function resetAll() {
        if (!window.confirm("Resetezi tot progresul?")) return;

        // șterge din localStorage
        localStorage.removeItem(LS_KEYS.inventory);
        localStorage.removeItem(LS_KEYS.crafting);
        localStorage.removeItem(LS_KEYS.result);
        localStorage.removeItem("cm_discovered");

        // revine la starea initiala
        setInventory(makeEmptySlots(START_ROWS));
        setCrafting(Array(9).fill(null));
        setResult(null);
        setDiscovered([]);
    }


    return (
        <>
            <div className="upperDiv">
                <Crafting slots={crafting} result={result} onTakeResult={takeResult} onCellClick={returnFromCraftToInventory}
                    onDropFromInventory={handleDropFromInventory} onMoveInsideCrafting={handleMoveInsideCrafting}/>
                <div style={{ marginLeft: "auto" }}>
                    <DiscoveredRecipes discovered={discovered} />
                </div>
            </div>

            <div className="lowerDiv">
                <Resources onPick={handlePickFromResources} />
                <Inventory slots={inventory} cols={COLS} onDropFromCrafting={handleDropFromCrafting}
                    onTake={moveFromInventoryToCraft} onMoveInsideInventory={handleMoveInsideInventory}/>
                <Garbage onMoveFromInventoryToGarbage ={handleMoveFromInventoryToGarbage}
                    onMoveFromCraftingToGarbage={handleMoveFromCraftingToGarbage}/>
                <button className="btnReset" onClick={resetAll}>Reset</button>
            </div>
            {/* Cand castigi*/}
            {win && (
                <div className="win" onClick={() => setWin(false)}>
                    <div className="win__box" onClick={(e) => e.stopPropagation()}>
                        <h2>🎉 Felicitări!</h2>
                        <p>Ai creat <strong>Platou moldovenesc</strong> și ai câștigat jocul.</p>
                        <button className="win__btn" onClick={() => setWin(false)}>Închide</button>
                    </div>
                </div>
            )}
        </>
    );
}
