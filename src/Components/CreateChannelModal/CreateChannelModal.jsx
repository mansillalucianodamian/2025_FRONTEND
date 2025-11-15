import { useState } from "react";
import "./CreateChannelModal.css";

export default function CreateChannelModal({ isOpen, onClose, onCreate }) {
    const [channelName, setChannelName] = useState("");
    const maxLength = 80;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!channelName.trim()) return;
        onCreate(channelName.trim()); // el padre decide qué hacer con el nombre
        setChannelName("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>Crear un canal</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="# p. ej., plan-presupuesto"
                        value={channelName}
                        onChange={(e) => setChannelName(e.target.value)}
                        maxLength={maxLength}
                    />
                    <p className="description">
                        Los canales son donde ocurren las conversaciones sobre un tema. Usa un nombre que se pueda buscar y comprender fácilmente.
                    </p>
                    <div className="char-count">{channelName.length}/{maxLength}</div>
                    <div className="modal-actions">
                        <button type="submit" disabled={!channelName.trim()}>
                            Siguiente
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
