import { useState } from "react";
import { createMessage } from "../../services/messagesService"; 
import "./MessageInput.css";
import ICONS from '../../constanst/Icons';

function MessageInput({ workspace_id, channel_id, onMessageSent }) {
    const [text, setText] = useState("");

    const handleSend = async () => {
        if (!text.trim()) return;
        try {
            const newMessage = await createMessage(workspace_id, channel_id, text);
            onMessageSent(newMessage); // callback para actualizar la lista de mensajes en el padre
            setText(""); // limpiar input
        } catch (err) {
            console.error("Error al enviar mensaje", err);
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="message-input">
            <input 
                type="text"
                placeholder="Escribe tu mensaje..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            <button onClick={handleSend}><ICONS.send /></button>
        </div>
    );
}

export default MessageInput;
