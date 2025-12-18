export default function ({ user, weight = 1 }) {
  return {
    id: "q-llm-function-calling",
    weight,
    question: `
      <h3>LLM Function Calling with Multi-Step Context</h3>
      <p>Implement an LLM-powered assistant that can:</p>
      <ol>
        <li>Query a SQL database for user data</li>
        <li>Fetch weather from an external API</li>
        <li>Send email notifications</li>
        <li>Maintain conversation context across multiple function calls</li>
      </ol>
      <p><strong>Use OpenAI function calling API with proper error handling and context management.</strong></p>
    `,
    input: "textarea",
    answer: String.raw`import openai
import sqlite3
import requests
import json

class LLMAssistant:
    def __init__(self, api_key, db_path, weather_api_key):
        openai.api_key = api_key
        self.db_path = db_path
        self.weather_api_key = weather_api_key
        self.conversation_history = []
        self.total_tokens = 0
        
        self.functions = [
            {
                "name": "query_database",
                "description": "Query user database with SQL",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "query": {"type": "string", "description": "SQL query"}
                    },
                    "required": ["query"]
                }
            },
            {
                "name": "get_weather",
                "description": "Get weather for a city",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "city": {"type": "string"}
                    },
                    "required": ["city"]
                }
            }
        ]
    
    def query_database(self, query):
        conn = sqlite3.connect(self.db_path)
        conn.row_factory = sqlite3.Row
        cursor = conn.cursor()
        try:
            cursor.execute(query)
            results = [dict(row) for row in cursor.fetchall()]
            return results
        except Exception as e:
            return {"error": str(e)}
        finally:
            conn.close()
    
    def get_weather(self, city):
        url = f"http://api.openweathermap.org/data/2.5/weather"
        params = {"q": city, "appid": self.weather_api_key}
        response = requests.get(url, params=params)
        return response.json()
        
    def process_query(self, user_query):
        self.conversation_history.append({"role": "user", "content": user_query})
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=self.conversation_history,
            functions=self.functions
        )
        return response`,
  };
}
