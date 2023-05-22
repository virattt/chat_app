from typing import List

from langchain.agents import initialize_agent, load_tools, AgentType, AgentExecutor
from langchain.callbacks.base import BaseCallbackHandler
from langchain.chat_models import ChatOpenAI
from langchain.memory import ConversationBufferMemory

from chat.messages.chat_message_repository import ChatMessageRepository
from chat.models import MessageSender, ChatMessage
from project import settings


class AgentFactory:

    def __init__(self):
        self.chat_message_repository = ChatMessageRepository()

    async def create_agent(
        self,
        tool_names: List[str],
        chat_id: str = None,
        streaming=False,
        callback_handlers: List[BaseCallbackHandler] = None,
    ) -> AgentExecutor:
        # Instantiate the OpenAI LLM
        llm = ChatOpenAI(
            temperature=0,
            openai_api_key=settings.openai_api_key,
            streaming=streaming,
            callbacks=callback_handlers,
        )

        # Load the Tools that the Agent will use
        tools = load_tools(tool_names, llm=llm)

        # Load the memory and populate it with any previous messages
        memory = await self._load_agent_memory(chat_id)

        # Initialize and return the agent
        return initialize_agent(
            tools=tools,
            llm=llm,
            agent=AgentType.CHAT_CONVERSATIONAL_REACT_DESCRIPTION,
            verbose=True,
            memory=memory
        )

    async def _load_agent_memory(
        self,
        chat_id: str = None,
    ) -> ConversationBufferMemory:
        if not chat_id:
            return ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        # Create the conversational memory for the agent
        memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        # Load the messages for the chat_id from the DB
        chat_messages: List[ChatMessage] = await self.chat_message_repository.get_chat_messages(chat_id)

        # Add the messages to the memory
        for message in chat_messages:
            if message.sender == MessageSender.USER.value:
                # Add user message to the memory
                memory.chat_memory.add_user_message(message.content)
            elif message.sender == MessageSender.AI.value:
                # Add AI message to the memory
                memory.chat_memory.add_ai_message(message.content)

        return memory
