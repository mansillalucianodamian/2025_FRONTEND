import React, { useEffect } from 'react'
import ChannelList from '../ChannelList/ChannelList'
import useFetch from '../../hooks/useFetch'
import { useParams } from 'react-router'
import { getChannelList } from '../../services/channelService'
import './ChannelSidebar.css'
import ICONS from '../../constanst/Icons'


const ChannelSidebar = () => {
    const {
        response, 
        loading, 
        error, 
        sendRequest
    } = useFetch()
    const {workspace_id} = useParams()

    //Responsable de cargar la lista de canales
    function loadChannelList (){
        sendRequest(
            async () => {
                return await getChannelList( workspace_id )
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

/*     console.log(response, error, loading) */

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
                response && <ChannelList channel_list={response.data.channels}/>
            }
            {
                error && <span style={{color: 'red'}}>Error al obtener la lista de canales</span>
            }
        </aside>
    )
}

export default ChannelSidebar