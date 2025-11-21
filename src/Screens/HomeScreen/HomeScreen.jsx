import React, { useEffect } from 'react'
import useFetch from '../../hooks/useFetch'
import { getWorkspaces } from '../../services/workspaceService'
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
                    {/* En caso de que tengas un logo dinámico */}
                    <img src="/slack_worskpaces.png" alt="logo" />
                  </div>
                  <div className="workspace-info">
                    <h3>{workspace.workspace_name}</h3>
                    <p>0 miembros</p>
                  </div>
                </div>

                <div className="workspace-card__right">
                  <Link
                    to={`/workspace/${workspace.workspace_id}`}
                    className="workspace-button"
                  >
                    Iniciar Slack
                  </Link>
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
              <span>¿Quieres usar Slack con otro equipo?</span>
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

