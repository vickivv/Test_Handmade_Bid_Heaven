from django.urls import path
from . import views
from .views import LoginView ,AdminLoginView,MessageAPIView

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/login/', AdminLoginView.as_view(), name='admin_login'),
    path('messages/send/',MessageAPIView.as_view(), name='send_message'),
    path('messages/delete/<int:message_id>/', MessageAPIView.as_view(),name='delete_message'),
    path('messages/<int:user_id>/',MessageAPIView.as_view(),name = 'get_messages'),
    
   
]
