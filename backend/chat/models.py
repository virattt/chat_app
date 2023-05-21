# models.py
from enum import Enum

from django.db import models


class MessageSender(Enum):
    USER = 'USER'
    AI = 'AI'


class Chat(models.Model):
    name = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)


class ChatMessage(models.Model):
    content = models.TextField()
    chat = models.ForeignKey(Chat, related_name="messages", on_delete=models.CASCADE)
    sender = models.CharField(max_length=10, choices=[(tag.value, tag.name) for tag in MessageSender])
    timestamp = models.DateTimeField(auto_now_add=True)
