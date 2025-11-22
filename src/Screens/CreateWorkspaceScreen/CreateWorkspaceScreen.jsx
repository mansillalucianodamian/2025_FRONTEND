import React from "react";
import CreateWorkpace from "../../Components/CreateWorkspace/CreateWorkspace";


const CreateWorkspaceScreen = () => {
    return (
        <div className="Form-container">
            <header className="Form-header">
                <img src="/logo Slack.png" alt="" />
            </header>
            <main className="Form-main">
                <h1 className="title-principal">Crear un nuevo espacio de trabajo</h1>
                <CreateWorkpace />
            </main>
            <footer className="Form-footer">
                <a href="">Privacidad y términos</a>
                <a href="">Contactarnos</a>
                <a href="">Cambiar región</a>
            </footer>
        </div>
    );
};

export default CreateWorkspaceScreen;