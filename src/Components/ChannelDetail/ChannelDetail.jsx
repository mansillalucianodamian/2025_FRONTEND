import React, { use, useContext, useEffect, useState } from "react";
import { useParams } from 'react-router'
import useFetch from '../../hooks/useFetch'
import { getMessagesByChannelId } from '../../services/messagesService'
import './ChannelDetail.css'
import MessageInput from "../MessageInput/MessageInput";
import { AuthContext } from "../../Context/AuthContext";
import InviteUserModal from "../InviteUserModal/InviteUserModal";
import ICONS from "../../constanst/Icons";

const ChannelDetail = ({ onBack }) => {
    const { channel_id, workspace_id } = useParams()
    const [showInviteModal, setShowInviteModal] = useState(false);
    const { user } = useContext(AuthContext)
    const { response, error, loading, sendRequest } = useFetch();

    useEffect(
        () => {
            loadMessagesList(channel_id);
        },
        [
            channel_id
        ]
    )

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

    if (!channel_id) {
        return (
            <div>
                <span className="text_secondary">Canal no seleccionado</span>
            </div>
        )
    }

    const channelName = response?.data?.channel_name || channel_id;
    const formattedChannelName = `# ${channelName?.toLowerCase()}`;


    let messages = response?.data ? response.data.messages : []
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
            <div className="message-header">
                <div className="header-left">
                    <button className="icon-especial" onClick={onBack}>
                        <ICONS.back className="icon" />
                    </button>
                    <h2 className="channel-name">{formattedChannelName}</h2>
                </div>

                <div className="header-right">
                    <button onClick={() => setShowInviteModal(true)}> Invitar </button>
                </div>

                {showInviteModal && (
                    <InviteUserModal
                        workspace_id={workspace_id}
                        onClose={() => setShowInviteModal(false)}
                        onInvited={(res) => console.log("Usuario invitado:", res)}
                    />
                )}
            </div>
            {messages.length > 0 ? (
                <div className="messages-list">
                    {messages.map((message, index) => {
                        const isMine = message.user_name === user?.name
                        return (
                            <div
                                key={index}
                                className={`message-buble ${isMine ? "my-message" : "other-message"}`}
                            >
                                <div className="message_top">
                                    <p className="text_name_user">{message.user_name}</p>
                                    <p className="text_hour">
                                        {message.message_create_date
                                            ? new Date(message.message_create_date).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit",
                                            })
                                            : "Enviando..."}
                                    </p>
                                </div>
                                <div className="message_button">
                                    <p>{message.message_content}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p className="text_secondary">No se encontraron mensajes.</p>
            )}
            <div className="message-input-container">
                <MessageInput
                    workspace_id={workspace_id}
                    channel_id={channel_id}
                    onMessageSent={addMessage}
                />
            </div>
        </div>
    );
};
export default ChannelDetail;