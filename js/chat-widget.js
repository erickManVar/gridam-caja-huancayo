class ChatWidget {
    constructor() {
        this.createChatWidget();
        this.isOpen = false;
    }

    createChatWidget() {
        // Create chat widget container
        const chatWidget = document.createElement('div');
        chatWidget.id = 'chat-widget';
        chatWidget.innerHTML = `
            <style>
                #chat-widget {
                    position: fixed;
                    bottom: 20px;
                    right: 20px;
                    z-index: 1000;
                    font-family: Arial, sans-serif;
                }
                
                .chat-button {
                    background-color: #007bff;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 60px;
                    height: 60px;
                    cursor: pointer;
                    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .chat-container {
                    display: none;
                    position: fixed;
                    bottom: 90px;
                    right: 20px;
                    width: 300px;
                    height: 400px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    flex-direction: column;
                }

                .chat-header {
                    background: #007bff;
                    color: white;
                    padding: 15px;
                    border-radius: 10px 10px 0 0;
                    text-align: center;
                }

                .chat-messages {
                    flex-grow: 1;
                    overflow-y: auto;
                    padding: 15px;
                }

                .message {
                    margin-bottom: 10px;
                    padding: 8px 12px;
                    border-radius: 15px;
                    max-width: 80%;
                }

                .user-message {
                    background: #e9ecef;
                    margin-left: auto;
                }

                .bot-message {
                    background: #007bff;
                    color: white;
                }

                .chat-input {
                    padding: 15px;
                    border-top: 1px solid #dee2e6;
                    display: flex;
                }

                .chat-input input {
                    flex-grow: 1;
                    padding: 8px;
                    border: 1px solid #dee2e6;
                    border-radius: 20px;
                    margin-right: 10px;
                }

                .chat-input button {
                    background: #007bff;
                    color: white;
                    border: none;
                    padding: 8px 15px;
                    border-radius: 20px;
                    cursor: pointer;
                }
            </style>
            <div class="chat-container">
                <div class="chat-header">
                    Chat con Caja Huancayo
                </div>
                <div class="chat-messages"></div>
                <div class="chat-input">
                    <input type="text" placeholder="Escribe tu mensaje...">
                    <button>Enviar</button>
                </div>
            </div>
            <button class="chat-button">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                </svg>
            </button>
        `;

        document.body.appendChild(chatWidget);
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        const chatButton = document.querySelector('.chat-button');
        const chatContainer = document.querySelector('.chat-container');
        const sendButton = document.querySelector('.chat-input button');
        const input = document.querySelector('.chat-input input');
        const messagesContainer = document.querySelector('.chat-messages');

        chatButton.addEventListener('click', () => {
            this.isOpen = !this.isOpen;
            chatContainer.style.display = this.isOpen ? 'flex' : 'none';
            if (this.isOpen) {
                input.focus();
            }
        });

        const sendMessage = async () => {
            const message = input.value.trim();
            if (!message) return;

            // Add user message to chat
            this.addMessage(message, 'user');
            input.value = '';

            try {
                const response = await fetch('/api/chat', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ message }),
                });

                const data = await response.json();
                if (data.response) {
                    this.addMessage(data.response, 'bot');
                }
            } catch (error) {
                console.error('Error:', error);
                this.addMessage('Lo siento, hubo un error al procesar tu mensaje.', 'bot');
            }
        };

        sendButton.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });
    }

    addMessage(text, type) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
}

// Initialize chat widget when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ChatWidget();
});
