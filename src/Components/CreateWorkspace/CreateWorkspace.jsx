import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import { createWorkspace } from '../../services/workspaceService'
import useFetch from '../../hooks/useFetch'
import useForm from '../../hooks/useForm'

const CreateWorkpace = () => {
    const navigation = useNavigate()
    const { response, loading, error, sendRequest } = useFetch()

    const initial_state = {
        workspace_name: ''
    }

    const onSubmit = (form_data) => {

        sendRequest(
            async () => {
                return await createWorkspace(form_data.workspace_name, '')
            }
        )
    }
    useEffect(
        () => {
            if (response && response.ok) {
                /* 
                Si todo esta bien cargar lista de workspaces en home
                 */
                navigation('/home')
            }
        },
        [response]
    )

   const { form_state, onInputChange, handleSubmit } = useForm(initial_state, onSubmit);
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="workspace_name">Nombre del espacio de trabajo</label>
                    <input type="text" name="workspace_name" id="workspace_name" value={form_state.workspace_name} onChange={onInputChange} />
                </div>
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>
                }
                <button type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear espacio de trabajo'}
                </button>
            </form>
        </div>
    )
}


export default CreateWorkpace