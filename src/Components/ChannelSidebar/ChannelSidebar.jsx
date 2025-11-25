import React, { useEffect, useState } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { NavLink, useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'
import './ChannelSidebar.css'
import ICONS from '../../constanst/Icons'


const ChannelSidebar = ({ channels, loading, error, response, workspace_name, onChannelSelect }) => {
// estado para el texto de búsqueda
  const [searchTerm, setSearchTerm] = useState("")

  // filtrar canales según el texto
  const filteredChannels = channels.filter(channel =>
    channel.name.toLowerCase().includes(searchTerm.toLowerCase())
  )
    return (
        <aside className='channel-layout'>
            <div className='channel-layout__header'>
                <h3>{workspace_name}</h3>
            </div>
            <input 
                className='search'
                type="text"
                placeholder="Buscar canales"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <h3 className='channel-layout__title'>Canales</h3>
            {
                loading && <span className='text_secondary loading'>Cargando...</span>
            }
            {
                response && <ChannelList channel_list={filteredChannels} onChannelSelect={onChannelSelect}/>
            }
            {
                error && <span style={{ color: 'red' }}>Error al obtener la lista de canales</span>
            }
        </aside>
    )
}

export default ChannelSidebar