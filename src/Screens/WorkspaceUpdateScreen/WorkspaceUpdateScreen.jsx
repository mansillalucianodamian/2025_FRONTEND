import WorkspaceUpdate from "../../Components/WorkspaceUpdate/WorkspaceUpdate";


export default function WorkspaceUpdateScreen() {
    return (
        <div className="workspace-screen">
            <header className="Form-header">
                <img src="/logo Slack.png" alt="" />
            </header>
            <main className="Form-main">
                <h1 className="title-principal">Actualizar Workspace</h1>
                 <WorkspaceUpdate />
            </main>
           
        </div>
    );
}
