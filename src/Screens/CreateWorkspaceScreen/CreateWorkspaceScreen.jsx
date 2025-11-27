import React from "react";
import CreateWorkpace from "../../Components/CreateWorkspace/CreateWorkspace";


const CreateWorkspaceScreen = () => {
    return (
        <div>
            <header className="Form-header">
                <img src="/logo Slack.png" alt="" />
            </header>
            <main className="Form-main">
                <h1 className="title-principal">Crear un nuevo espacio de trabajo</h1>
                <CreateWorkpace />
            </main>
        </div>
    );
};

export default CreateWorkspaceScreen;