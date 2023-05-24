import json
from typing import Optional, Any, Dict, List
from uuid import UUID

from channels.generic.websocket import AsyncWebsocketConsumer
from langchain.callbacks.base import AsyncCallbackHandler
from langchain.schema import LLMResult, BaseMessage


class AsyncStreamingCallbackHandler(AsyncCallbackHandler):

    def __init__(self, consumer: AsyncWebsocketConsumer):
        self.consumer = consumer

    async def on_llm_new_token(
        self,
        token: str,
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any,
    ) -> None:
        # Send the token to any consumers (e.g. frontend client)
        await self.consumer.send(text_data=json.dumps({'message': token, 'type': 'debug'}))

    async def on_llm_end(
        self,
        response: LLMResult,
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any,
    ) -> None:
        # When the LLM ends, add a new line so that debug messages are spaced with new lines.
        await self.consumer.send(text_data=json.dumps({'message': '\n\n', 'type': 'debug'}))

    async def on_chat_model_start(
        self, serialized: Dict[str, Any],
        messages: List[List[BaseMessage]],
        *,
        run_id: UUID,
        parent_run_id: Optional[UUID] = None,
        **kwargs: Any
    ) -> Any:
        # Do nothing
        pass
