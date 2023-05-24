from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ChatViewSet, AgentViewSet

router = DefaultRouter()
router.register(r'chats', ChatViewSet)
router.register(r'agents', AgentViewSet)

urlpatterns = [
    path('', include(router.urls)),
]