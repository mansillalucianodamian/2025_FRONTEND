import ENVIRONMENT from "../config/environment";

export async function getWorkspaces () {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al obtener lista de workspaces')
    }
    const response = await response_http.json()
    return response
}
/*
createWorkspace(name, url_img = '')
Consumir la api para crear un workspace
*/

export async function createWorkspace(name, url_img = '') {

    const response_http = await fetch(
        ENVIRONMENT.URL_API + '/api/workspace',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({name, url_img})
        }
    )
    if(!response_http.ok){
        throw new Error('Error al crear workspace')
    }
    const response = await response_http.json()
    return response
}

/* '/:workspace_id/invite', crear funcion para invitar usuarios
 */

export async function inviteUser (invited_email, workspace_id){
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}/invite`,
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            },
            body: JSON.stringify({invited_email})
        }
    )
    if(!response_http.ok){
       const data = await response_http.json().catch(() => ({}));
    throw { response: { status: response_http.status, data } };
    }
    const response = await response_http.json()
    return response
}

export async function deleteWorkspace(workspace_id) {
    const response_http = await fetch(
        ENVIRONMENT.URL_API + `/api/workspace/${workspace_id}`,
        {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('auth_token')}`
            }
        }
    )
    if(!response_http.ok){
        throw new Error('Error al eliminar workspace')
    }
    const response = await response_http.json()
    return response
}
