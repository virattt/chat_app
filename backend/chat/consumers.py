import json
import os
import sys
from typing import Optional, Any, Dict, List
from uuid import UUID

import django
from asgiref.sync import async_to_sync
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.schema import BaseMessage

from chat.agents.agent_factory import AgentFactory
from chat.messages.chat_message_repository import ChatMessageRepository

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')
django.setup()

from channels.generic.websocket import AsyncWebsocketConsumer
from langchain.agents import AgentExecutor

from chat.models import MessageSender


class ChatConsumer(AsyncWebsocketConsumer):
    # The LLM agent for this chat application
    agent: AgentExecutor

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.agent_factory = AgentFactory()
        self.chat_message_repository = ChatMessageRepository()

    async def connect(self):
        # Get the chat_id from the client
        chat_id = self.scope['url_route']['kwargs'].get('chat_id')

        # Create the agent when the websocket connection with the client is established
        self.agent = await self.agent_factory.create_agent(
            tool_names=["llm-math"],
            chat_id=chat_id,
            streaming=True,
            callback_handlers=[MyCustomHandler(self)],
        )

        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']
        chat_id = text_data_json['chat_id']

        # Forward the message to LangChain
        response = await self.message_agent(message, chat_id)

        # Send the response from the OpenAI Chat API to the frontend client
        await self.send(text_data=json.dumps({'message': response}))

    async def message_agent(self, message: str, chat_id: str):
        # Save the user message to the database
        await self.chat_message_repository.save_message(message=message, sender=MessageSender.USER.value, chat_id=chat_id)

        # Call the agent
        response = self.agent.run(message)

        # Save the AI message to the database
        await self.chat_message_repository.save_message(message=response, sender=MessageSender.AI.value, chat_id=chat_id)

        return response

    def my_callback(self, message):
        print("Callback received:", message)


class MyCustomHandler(AsyncCallbackHandler):

    def __init__(self, consumer):
        self.consumer = consumer

    async def on_chat_model_start(
        self,
        serialized: Dict[str, Any],
        messages: List[List[BaseMessage]],
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any
    ) -> Any:
        pass

    async def on_llm_new_token(
        self,
        token: str,
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any,
    ) -> None:
        sys.stdout.write(token)
        sys.stdout.flush()
        async_to_sync(self.consumer.send)(text_data=token)
