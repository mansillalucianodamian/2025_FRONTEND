import { useState } from "react";
import { inviteUser } from "../../services/workspaceService";

const InviteUserModal = ({ workspace_id, onClose, onInvited }) => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleInvite = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await inviteUser(email, workspace_id);
            // callback para el padre (ej. refrescar lista de miembros)
            if (onInvited) onInvited(response);
            onClose(); // cerrar modal
        } catch (err) {
            setError("Error al invitar usuario");
            console.error(err);
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
                    {error && <p className="error-text">{error}</p>}
                    <div className="modal-actions">
                        <button type="submit" disabled={loading}>
                            {loading ? "Invitando..." : "Invitar"}
                        </button>
                        <button type="button" onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InviteUserModal;