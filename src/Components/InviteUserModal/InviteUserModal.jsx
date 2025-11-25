import React, { useState } from "react";
import { inviteUser } from "../../services/workspaceService";

const InviteUserModal = ({ workspace_id, onClose, onInvited }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    const handleInvite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);

        try {
            const response = await inviteUser(email, workspace_id);

            // callback para el padre (ej. refrescar lista de miembros)
            if (onInvited) onInvited(response);

            setSuccess("Invitación enviada con éxito ✅");
            setEmail(""); // limpiar input
        } catch (err) {
            // Manejo de errores según status del backend
            const status = err.response?.status;
            if (status === 404) {
                setError("Ese usuario no está registrado. Pídele que se registre primero.");
            } else if (status === 409) {
                setError("Ese usuario ya forma parte del workspace.");
            } else {
                setError("Error interno al invitar usuario.");
            }
            console.error("Error invitando usuario:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2>Invitar usuario</h2>
                <form onSubmit={handleInvite}>
                    <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    {/* Mensajes de feedback */}
                    {error && <p className="error-text">{error}</p>}
                    {success && <p className="success-text">{success}</p>}

                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? "Invitando..." : "Invitar"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cerrar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteUserModal;
