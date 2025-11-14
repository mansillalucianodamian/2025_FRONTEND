// GET /api/workspace/:workspace_id/channels/:channel_id/messages
// Obtener la lista de mensajes del backend
//Obtiene la lista de mensajes
import ENVIRONMENT from "../config/environment";


async function getMessagesByChannelId (workspace_id, channel_id){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "GET",
            headers: {
                authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
        }
    );
   
    const response = await response_http.json();
    console.log(response.ok)
     if (!response.ok) {
        throw new Error("Error al obtener lista de mensajes");
    }
    console.log(response)
    return response;
   
}

async function createMessage(workspace_id, channel_id, content) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/channels/${channel_id}/messages`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${localStorage.getItem("auth_token")}`,
            },
            body: JSON.stringify({ content }), // 👈 el body que espera tu backend
        }
    );

    const response = await response_http.json();

    if (!response_http.ok) {
        throw new Error("Error al crear mensaje: " + (response.message || ""));
    }

    return response; // devuelve el mensaje creado
}


export {
    getMessagesByChannelId, createMessage
}