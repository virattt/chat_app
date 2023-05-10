import json
from channels.generic.websocket import AsyncWebsocketConsumer

import json
import openai
from channels.generic.websocket import AsyncWebsocketConsumer
from django.conf import settings

openai.api_key = settings.OPENAI_API_KEY


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Forward the message to the OpenAI Chat API
        response = await self.forward_message_to_openai(message)

        # Send the response from the OpenAI Chat API to the frontend client
        await self.send(text_data=json.dumps({'message': response}))

    async def forward_message_to_openai(self, message):
        # You can customize the parameters based on the OpenAI Chat API documentation
        prompt = f"User: {message}\nAssistant:"
        response = openai.Completion.create(
            engine="text-davinci-002",
            prompt=prompt,
            max_tokens=150,
            n=1,
            stop=None,
            temperature=0.5,
        )

        return response.choices[0].text.strip()
