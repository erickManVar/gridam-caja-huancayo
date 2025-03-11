# Gridam Website with Caja Huancayo Chatbot

This repository contains:
- Static website (served via GitHub Pages)
- Chatbot API (deployed to Render)

## Local Development

1. Install Python dependencies:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
```

2. Set up environment variables:
Create a `.env` file with:
```
OPENAI_API_KEY=your_api_key_here
MODEL_CHOICE=gpt-4o-mini
```

3. Run the development servers:
```bash
# Terminal 1: Run the API
python chatbot_api.py

# Terminal 2: Run the website
python -m http.server 3000
```

## Deployment
- Website is automatically deployed to GitHub Pages
- API is deployed to Render using the following settings:
  - Build Command: `pip install -r requirements.txt`
  - Start Command: `gunicorn -c gunicorn_config.py chatbot_api:app`
