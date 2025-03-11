from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
from openai import OpenAI
import os

# Load environment variables
load_dotenv()
print("Environment variables loaded")

app = Flask(__name__)
CORS(app)  # This allows your website to make requests to this API
print("Flask app created with CORS enabled")

# Initialize OpenAI client
openai_client = OpenAI()
print("OpenAI client initialized")

# Training data
TRAINING_DATA = [
    {
        "messages": [
            {"role": "system", "content": "Eres el chatbot oficial de Caja Huancayo. Solo respondes preguntas relacionadas con la Caja y sus servicios."},
            {"role": "user", "content": "¿Cuál es el horario de atención?"},
            {"role": "assistant", "content": "El horario de atención de nuestras sedes es de lunes a viernes de 9:00 AM a 6:00 PM."}
        ]
    },
    {
        "messages": [
            {"role": "user", "content": "¿Dan préstamos personales?"},
            {"role": "assistant", "content": "Sí, ofrecemos préstamos personales. Puedes acercarte a una de nuestras agencias o visitar nuestra página web para más información."}
        ]
    }
]

@app.route('/api/chat', methods=['POST'])
def chat():
    try:
        print("Received chat request")
        data = request.json
        user_message = data.get('message', '')
        print(f"User message: {user_message}")

        # Prepare the conversation with system message and training context
        messages = [
            {
                "role": "system",
                "content": """Eres el chatbot oficial de Caja Huancayo. Reglas importantes:
1. SOLO respondes preguntas relacionadas con Caja Huancayo y sus servicios financieros
2. Siempre respondes en español
3. Si la pregunta no está relacionada con Caja Huancayo, indica amablemente que solo puedes responder sobre temas de la Caja
4. Mantienes un tono profesional pero amigable
5. Si no estás seguro de una información específica, recomiendas contactar directamente con la Caja"""
            }
        ]
        
        # Add training context
        for example in TRAINING_DATA:
            messages.extend(example["messages"][1:])
        
        # Add user message
        messages.append({"role": "user", "content": user_message})
        
        print("Getting response from OpenAI")
        # Get response from OpenAI
        response = openai_client.chat.completions.create(
            model=os.getenv('MODEL_CHOICE', 'gpt-4o-mini'),
            messages=messages,
            temperature=0.7
        )
        
        bot_response = response.choices[0].message.content
        print(f"Bot response: {bot_response}")
        
        return jsonify({
            "response": bot_response
        })

    except Exception as e:
        print(f"Error in chat endpoint: {str(e)}")
        return jsonify({
            "error": str(e)
        }), 500

if __name__ == '__main__':
    print("Starting Flask server...")
    app.run(port=5000, debug=True)
