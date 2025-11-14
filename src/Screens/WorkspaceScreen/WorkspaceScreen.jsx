import React from 'react'
import ChannelSidebar from '../../Components/ChannelSidebar/ChannelSidebar'
import ChannelDetail from '../../Components/ChannelDetail/ChannelDetail'
import './WorkpaceScreen.css'
import ICONS from '../../assets/constanst/icons'
import MessageInput from '../../Components/MessageInput/MessageInput'
import { useParams, useSearchParams } from 'react-router'



const WorkspaceScreen = () => {
  // Obtenemos los IDs desde la URL
  const { workspace_id, channel_id } = useParams();

  // Callback para manejar mensajes nuevos
  const addMessage = (msg) => {
    console.log("Nuevo mensaje recibido:", msg);
    // acá podrías actualizar el estado de mensajes si lo manejás en este nivel
  };
  return (
    <div className='workspace-layout'>
      <aside className='workspace-icons'>
        <div className='workspace-icons__top'>
          <ICONS.Home className='icon'/>
          <ICONS.Messages className='icon'/>
          <ICONS.Activity className='icon'/>
          <ICONS.File className='icon'/>
          <ICONS.Tools className='icon'/>
        </div>
        <div className='workspace-icons__bottom'>
          <ICONS.Home className='icon'/>
        </div>
      </aside>
      <div className='workspace-sidebar'>
        <ChannelSidebar />
      </div>
      <div className='workspace-menssage'>
        <ChannelDetail />
      </div>
    </div>
  )
}

export default WorkspaceScreen