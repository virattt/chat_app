from django.urls import path
from django.urls import re_path
from . import consumers

websocket_urlpatterns = [
    path('ws/chat/', consumers.ChatConsumer.as_asgi()),

    # Websocket URL for a given chat_id
    re_path(r'ws/chat/(?P<chat_id>\w+)/$', consumers.ChatConsumer.as_asgi()),
]
