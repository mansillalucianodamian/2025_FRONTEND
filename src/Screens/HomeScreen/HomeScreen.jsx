import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { deleteWorkspace, getWorkspaces } from '../../services/workspaceService'
import { Link, useNavigate } from 'react-router'
import './HomeScreen.css'


const HomeScreen = () => {
  const navigate = useNavigate();
  const { sendRequest, response, loading, error } = useFetch()

  useEffect(
    () => {
      sendRequest(
        () => getWorkspaces()
      )
    },
    []
  )
  const handleDeleteWorkspace = async (workspace_id) => {
    try {
      await deleteWorkspace(workspace_id)
      alert("Workspace eliminado correctamente")
      // refrescar lista
      sendRequest(() => getWorkspaces())
    } catch (err) {
      console.error("Error eliminando workspace:", err)
      alert("No se pudo eliminar el workspace")
    }
  }
  console.log(response, loading, error)
  return (

    <div className="workspaces-container">
      <header className="workspaces-header">
        <h1>👋 ¡Hola de nuevo!</h1>
      </header>

      {loading ? (
        <span className="loading">Cargando...</span>
      ) : (
        <div className="workspaces-content">
          {response && response.data && (
            <h2 className="workspaces-subtitle">
              Espacios de trabajo para{" "}
              <span className="user-email">{response.data.email}</span>
            </h2>
          )}


          {response && response.data.workspaces.length > 0 ? (
            response.data.workspaces.map((workspace) => (
              <div key={workspace.workspace_id} className="workspace-card">
                <div className="workspace-card__left">
                  <div className="workspace-logo">
                    <img src="/slack_worskpaces.png" alt="logo" />
                  </div>
                  <div className="workspace-info">
                    <h3>{workspace.workspace_name}</h3>
                  </div>
                </div>

                <div className="workspace-card__right">
                  <Link
                    to={`/workspace/${workspace.workspace_id}`}
                    className="workspace-button"
                  >
                    Iniciar Slack
                  </Link>
                  <button
                    className="workspace-button--danger"
                    onClick={() => handleDeleteWorkspace(workspace.workspace_id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="no-workspaces">No tienes espacios aún</p>
          )}

          {/* Bloque para crear nuevo workspace */}
          <div className="workspace-new">
            <div className="workspace-new__left">
              <img
                src="/slack_worskpaces.png"
                alt="Nuevo espacio"
                className="workspace-new__img"
              />
              <span>¿Necesitas crear un nuevo espacio de trabajo?</span>
            </div>
            <div className="workspace-new__right">
              <button
                className="workspace-button--outlined"
                onClick={() => navigate("/workspace-new")}
              >
                Crear un nuevo espacio de trabajo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen

