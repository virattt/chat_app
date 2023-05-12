import json

from channels.generic.websocket import AsyncWebsocketConsumer
from langchain.agents import load_tools, initialize_agent, AgentType
from langchain.chat_models import ChatOpenAI

from project import settings


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()

    async def disconnect(self, close_code):
        pass

    async def receive(self, text_data):
        text_data_json = json.loads(text_data)
        message = text_data_json['message']

        # Forward the message to LangChain
        response = await self.message_agent(message)

        # Send the response from the OpenAI Chat API to the frontend client
        await self.send(text_data=json.dumps({'message': response}))

    async def message_agent(self, message):
        # Define the LLM that the tools will use
        llm = ChatOpenAI(temperature=0, openai_api_key=settings.openai_api_key, streaming=True)

        # Load the Tools that the Agent will use
        tools = load_tools(["llm-math"], llm=llm)

        # Initialize the Agent
        agent = initialize_agent(tools, llm, agent=AgentType.ZERO_SHOT_REACT_DESCRIPTION, verbose=True)

        # Interact with the Agent
        response = agent.run(message)
        return response
