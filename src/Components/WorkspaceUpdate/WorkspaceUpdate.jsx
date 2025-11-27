import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWorkspaces, updateWorkspaces } from "../../services/workspaceService";
import "./WorkspaceUpdate.css";

export default function WorkspaceUpdate() {
    const { workspace_id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [url_img, setUrlImg] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    // Traer datos actuales del workspace
    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getWorkspaces(); // trae todos
                // buscar el workspace correcto
                const workspaces = data.data?.workspaces || [];
                const workspace = workspaces.find((w) => w.workspace_id === workspace_id);
                if (workspace) {
                    setName(workspace.workspace_name || "");
                    setUrlImg(workspace.url_img || "");
                }
            } catch (err) {
                console.error("Error cargando workspace:", err);
                setError("No se pudo cargar el workspace");
            }
        }
        fetchData();
    }, [workspace_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await updateWorkspaces(workspace_id, name); // 👈 solo name
            alert("Workspace actualizado correctamente"); // feedback
            navigate(`/workspace/${workspace_id}`); // volver al detalle
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="workspace-update">
            <form className="form" onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label className="new-title">Nuevo nombre del workspace:</label>
                    <input 
                        className='imput'
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nuevo nombre del workspace"
                    />
                </div>
                <button className='button-principal' type="submit" disabled={loading}>
                    {loading ? "Actualizando..." : "Actualizar"}
                </button>
            </form>
            {error && <p className="error">{error}</p>}
        </div>
    );
}
