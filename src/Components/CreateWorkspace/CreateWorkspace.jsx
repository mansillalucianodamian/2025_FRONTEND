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
            <form className="form" onSubmit={handleSubmit}>
                <div className='form-field'>
                    <label htmlFor="workspace_name"></label>
                    <input className='imput'
                    type="text" 
                    placeholder='Nombre del Workspaces'
                    name="workspace_name" 
                    id="workspace_name" 
                    value={form_state.workspace_name} 
                    onChange={onInputChange} />
                </div>
                {
                    error && <span style={{ color: 'red' }}>{error.message}</span>
                }
                <button className='button-principal' type="submit" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear espacio de trabajo'}
                </button>
            </form>
        </div>
    )
}


export default CreateWorkpace