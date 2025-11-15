import React, { useEffect } from "react";
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId } from '../../services/messagesService'
import './ChannelDetail.css'
import MessageInput from "../MessageInput/MessageInput";

const ChannelDetail = () => {
    const { channel_id, workspace_id } = useParams()
    if (!channel_id) {
        return (
            <div>
                <span>Canal no seleccionado</span>
            </div>
        )
    }
    const { response, error, loading, sendRequest } = useFetch();

    async function loadMessagesList(channel_id) {
        try {
            sendRequest(
                async () => {
                    return await getMessagesByChannelId(workspace_id, channel_id)
                }
            )
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(
        () => {
            loadMessagesList(channel_id);
        },
        [
            channel_id
        ]
    )
    console.log(response, error, loading)

    let messages = response?.data ? response.data.messages : null
    console.log(messages)
    // callback para agregar mensaje nuevo
    const addMessage = async (msg) => {
        // actualizamos la lista localmente
        response.data.messages.push(msg);
        // o refrescamos desde el backend:
        await sendRequest(() => getMessagesByChannelId(workspace_id, channel_id));
    };
    
    return (
        <div className="message-container">
            {messages && messages.length > 0 && (
                <div className="messages-list">
                    {messages.map((message, index) => (
                        <div className="message-buble" key={index}>
                            <div className="message_top">
                                <p className="text_name_user">{message.user_name}</p>
                                <p className="text_hour">
                                    {message.message_create_date
                                        ? new Date(message.message_create_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                        : "Enviando..."}
                                </p>
                            </div>
                            <div className="message_button">
                                <p>{message.message_content}</p>
                            </div>
                        </div>
                    ))}
                    
                </div>
            )}
            {messages && messages.length === 0 && <p className="text_secondary">No se encontraron mensajes.</p>}
            <div>
                <MessageInput
                        workspace_id={workspace_id}
                        channel_id={channel_id}
                        onMessageSent={addMessage} 
            />
            </div>
            
        </div>
    )
}

export default ChannelDetail;