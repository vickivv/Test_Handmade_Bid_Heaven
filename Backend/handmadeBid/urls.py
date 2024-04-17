from django.urls import path
from . import views
from .views import LoginView ,AdminLoginView,MessageAPIView,delete_user_view

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', LoginView.as_view(), name='login'),
     path('delete_user/<int:user_id>/', delete_user_view, name='delete_user'),
    path('admin/login/', AdminLoginView.as_view(), name='admin_login'),
    path('messages/send/',MessageAPIView.as_view(), name='send_message'),
    path('messages/delete/<int:message_id>/', MessageAPIView.as_view(),name='delete_message'),
    path('messages/<int:user_id>/',MessageAPIView.as_view(),name = 'get_messages'),
    
   
]
