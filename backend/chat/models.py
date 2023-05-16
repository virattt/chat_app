# models.py
from enum import Enum

from django.db import models


class MessageSender(Enum):
    USER = 'USER'
    AI = 'AI'


class ChatMessage(models.Model):
    content = models.TextField()
    chat_id = models.CharField(max_length=255, db_index=True)
    sender = models.CharField(max_length=10, choices=[(tag.value, tag.name) for tag in MessageSender])
    timestamp = models.DateTimeField(auto_now_add=True)
