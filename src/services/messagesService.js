// GET /api/workspace/:workspace_id/channels/:channel_id/messages
// Obtener la lista de mensajes del backend
import ENVIRONMENT from "../config/environment";

//Obtiene la lista de canales
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
        throw new Error("Error at get channels");
    }
    return response;
}

export {
    getMessagesByChannelId
}