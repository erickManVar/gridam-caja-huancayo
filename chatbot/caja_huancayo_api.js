require('dotenv').config();
const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI();

// Training data
const TRAINING_DATA = [
    {
        messages: [
            { role: "system", content: "Eres el chatbot oficial de Caja Huancayo. Solo respondes preguntas relacionadas con la Caja y sus servicios." },
            { role: "user", content: "¿Cuál es el horario de atención?" },
            { role: "assistant", content: "El horario de atención de nuestras sedes es de lunes a viernes de 9:00 AM a 6:00 PM." }
        ]
    },
    // Add your other training examples here
];

router.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        const messages = [
            {
                role: "system",
                content: `Eres el chatbot oficial de Caja Huancayo. Reglas importantes:
1. SOLO respondes preguntas relacionadas con Caja Huancayo y sus servicios financieros
2. Siempre respondes en español
3. Si la pregunta no está relacionada con Caja Huancayo, indica amablemente que solo puedes responder sobre temas de la Caja
4. Mantienes un tono profesional pero amigable
5. Si no estás seguro de una información específica, recomiendas contactar directamente con la Caja`
            }
        ];

        // Add training context
        TRAINING_DATA.forEach(example => {
            messages.push(...example.messages.slice(1));
        });

        // Add user message
        messages.push({ role: "user", content: message });

        const completion = await openai.chat.completions.create({
            model: process.env.MODEL_CHOICE || 'gpt-4o-mini',
            messages: messages,
            temperature: 0.7,
        });

        res.json({ response: completion.choices[0].message.content });
    } catch (error) {
        console.error('Chat error:', error);
        res.status(500).json({ error: 'Error en el servicio de chat' });
    }
});

module.exports = router;
