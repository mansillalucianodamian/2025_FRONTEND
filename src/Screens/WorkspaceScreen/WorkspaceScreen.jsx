import React, { useState } from 'react'
import ChannelSidebar from '../../Components/ChannelSidebar/ChannelSidebar'
import ChannelDetail from '../../Components/ChannelDetail/ChannelDetail'
import './WorkpaceScreen.css'
import ICONS from '../../assets/constants/icons'
import { NavLink, useParams, useSearchParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import CreateChannelModal from '../../Components/CreateChannelModal/CreateChannelModal'
import { createChannel } from '../../services/channelService'



const WorkspaceScreen = () => {
  // Obtenemos los IDs desde la URL
  const { workspace_id } = useParams();
  // Estado para abrir/cerrar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Hook useFetch para peticiones
  const { sendRequest, loading, error, response } = useFetch();

const [channels, setChannels] = useState([]);
  const handleCreateChannel = async (channelName) => {
    await sendRequest(async () => {
      const res = await createChannel(workspace_id, channelName);
      setChannels((prev) => [...prev, res]);
      return { ok: true, ...res }; 
    });
  };

  return (
    <div className='workspace-layout'>
      <aside className='workspace-icons'>
        <div className='workspace-icons__top'>
          <NavLink to="/home"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Home className='icon' />
          </NavLink>
          <span className='text-small'>Home</span>
          <NavLink to="/home"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Messages className='icon' />
          </NavLink>
          <span className='text-small'>Mensajes directos</span>
          <NavLink to=""
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Activity className='icon' />
          </NavLink>
          <span className='text-small'>Actividad</span>
          <NavLink to=""
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.File className='icon' />
          </NavLink>
          <span className='text-small'>Archivos</span>
          <NavLink to=""
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Tools className='icon' />
          </NavLink>
          <span className='text-small'>Herra- mientas</span>
        </div>
        <div className='workspace-icons__bottom'>
          <button className="nav-icon" onClick={() => setIsModalOpen(true)}>
            <ICONS.plus className='icon' />
          </button>
          <span className='text-small'>Crear</span>
        </div>
      </aside>
      <div className='workspace-sidebar'>
        <ChannelSidebar channels={channels} />
      </div>
      <div className='workspace-menssage'>
        <ChannelDetail />
      </div>

      <CreateChannelModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateChannel}
      />

      {loading && <p>Cargando...</p>}
      {error && <p style={{ color: "red" }}>{error.message}</p>}
      {response && <p>Canal creado correctamente ✅</p>}

    </div>
  )
}

export default WorkspaceScreen