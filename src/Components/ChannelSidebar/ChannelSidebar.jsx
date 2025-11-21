import React, { useEffect } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'
import './ChannelSidebar.css'
import ICONS from '../../constanst/Icons'


const ChannelSidebar = ({channels, loading, error, response}) => {


    return (
        <aside className='channel-layout'>
            <div className='channel_icons'>
                <ICONS.Gear/>
                <ICONS.NewMessage/>
            </div>
            <input className='search'
                type="text"
                placeholder="Buscar canales"
              />
            <h3 className='channel-layout__title'>Canales</h3>
            {
                loading && <span className='text_secondary loading'>Cargando...</span>
            }
            {
                response && <ChannelList channel_list={channels}/>
            }
            {
                error && <span style={{color: 'red'}}>Error al obtener la lista de canales</span>
            }
        </aside>
    )
}

export default ChannelSidebar