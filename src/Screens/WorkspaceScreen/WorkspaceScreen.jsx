import React, { use, useEffect, useState } from 'react'
import ChannelSidebar from '../../Components/ChannelSidebar/ChannelSidebar'
import ChannelDetail from '../../Components/ChannelDetail/ChannelDetail'
import './WorkpaceScreen.css'
import { NavLink, useParams, useSearchParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import CreateChannelModal from '../../Components/CreateChannelModal/CreateChannelModal';
import { createChannel, getChannelList } from '../../services/channelService';
import ICONS from '../../constanst/Icons'
import { getWorkspaces } from '../../services/workspaceService'

const WorkspaceScreen = () => {
  const {
    response,
    loading,
    error,
    sendRequest
  } = useFetch()
  // Obtenemos los IDs desde la URL
  const { workspace_id } = useParams();
  const [workspace, setWorkspace] = useState(null);

  //Responsable de cargar la lista de canales
  function loadChannelList() {
    sendRequest(
      async () => {
        return await getChannelList(workspace_id)
      }
    )
  }

  //Apenas se cargue el componente debemos intentar obtener la lista de canales, tambien se debe re-ejecutar si cambia el workspace_id
  useEffect(
    () => {
      loadChannelList()
    },
    [workspace_id] //Cada vez que cambie workspace_id re ejecutar el efecto
  )

  // Cargar workspace seleccionado cada vez que cambie workspace_id
  useEffect(() => {
    if (!workspace_id) return;

    getWorkspaces()
      .then((res) => {
        const list = res?.data?.workspaces || [];
        const ws = list.find((w) => w.workspace_id === workspace_id);
        setWorkspace(ws || null);
      })
      .catch((err) => {
        console.error("Error al obtener workspace:", err);
        setWorkspace(null);
      });
  }, [workspace_id]);



  // Estado para abrir/cerrar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Hook useFetch para peticiones

  const [channels, setChannels] = useState([]);
  const [newChannel, setNewChannel] = useState(null);
  const [channelCreated, setChannelCreated] = useState(false);
  const [showMessages, setShowMessages] = useState(false);//manejar mensajes
  const [selectedChannel, setSelectedChannel] = useState(null);
  const [activeChannel, setActiveChannel] = useState(null);

  const [selfChannelActive, setSelfChannelActive] = useState(false);

  const handleCreateChannel = async (channelName) => {
    await sendRequest(async () => {
      const res = await createChannel(workspace_id, channelName);
      setChannelCreated(true);
      return res
    });
  };
  
  useEffect(() => {
    if (response && response.ok && response.data) {
      setChannels(response.data.channels);
      const lastChannel = response.data.channels[response.data.channels.length - 1];
      setNewChannel(lastChannel);
      console.log("nuevo canal", newChannel)
    }
  }, [response, channelCreated]);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setChannelCreated(false);
    setNewChannel(null);
  };

  return (
    <div className='workspace-layout'>
      <aside className={`workspace-icons ${showMessages ? "hidden-mobile" : ""}`}>
        <div className='workspace-icons__top'>
          <NavLink to="/home"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Home className='icon' />
          </NavLink>
          <span className='text-small'>Home</span>
          <NavLink to="javascript:void(0)"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Messages className='icon' />
          </NavLink>
          <span className='text-small'>Mensajes directos</span>
          <NavLink to="javascript:void(0)"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.Activity className='icon' />
          </NavLink>
          <span className='text-small'>Actividad</span>
          <NavLink to="javascript:void(0)"
            className={({ isActive }) => isActive ? "nav-icon active" : "nav-icon"}>
            <ICONS.File className='icon' />
          </NavLink>
          <span className='text-small'>Archivos</span>
          <NavLink to="javascript:void(0)"
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
      <div
        className={`workspace-sidebar ${showMessages ? "hidden-mobile" : ""}`}
      >
        <ChannelSidebar channels={channels} loading={loading} error={error} response={response} workspace_id={workspace_id}
          workspace_name={workspace?.workspace_name || "Workspace" } 
          onChannelSelect={(channel) => {setSelectedChannel(channel); setShowMessages(true);}} />
      </div>
      <div className={`workspace-menssage ${showMessages ? "show-mobile" : ""}`}>
         <ChannelDetail channel_id={selectedChannel?._id} workspace_id={workspace_id} onBack={() => setShowMessages(false)} />
      </div>
      <CreateChannelModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCreate={handleCreateChannel}
        newChannel={newChannel}
        channelCreated={channelCreated}
      />
    </div>
  )
}

export default WorkspaceScreen