from rest_framework import serializers

from .models import Agent
from .models import Chat, ChatMessage


class ChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chat
        fields = ['id', 'name', 'created_at', 'updated_at']


class ChatMessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = ['id', 'content', 'chat', 'sender', 'timestamp']


class AgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agent
        fields = ['name', 'agent_type', 'token', 'created_at', 'updated_at', 'is_active']
