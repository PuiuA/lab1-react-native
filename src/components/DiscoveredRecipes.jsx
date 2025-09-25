import { useState } from "react";
import RECIPES from "../assets/recipes.js";
import "./DiscoveredRecipes.css";

export default function DiscoveredRecipes({ discovered = [] }) {
    const [open, setOpen] = useState(false);
    const known = RECIPES.filter(r => discovered.includes(r.name));

    return (
        <div className="disc">
            <button className="btn" onClick={() => setOpen(v => !v)}>📜 Rețete</button>

            {open && (
                <div className="panel">
                    <button className="close" onClick={() => setOpen(false)}>×</button>
                    <h4 className="title">Retete descoperite</h4>

                    <div className="list">
                        {known.map(r => (
                            <div key={r.id} className="card">
                                <img className="icon" src={r.img} alt={r.name} />
                                <div className="info">
                                    <div className="name">{r.name}</div>
                                    <div className="desc">{r.description}</div>
                                </div>

                                <div className="band">
                                    {r.pattern.flat().map((cell, i) => {
                                        const img = cell ? RECIPES.find(x => x.name === cell)?.img : null;
                                        return (
                                            <div key={i} className={`slot ${cell ? "full" : ""}`}>
                                                {img && <img src={img} alt={cell} />}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ))}
                        {known.length === 0 && <p className="empty">Nu sunt retete descoperite</p>}
                    </div>
                </div>
            )}
        </div>
    );
}
