from django.urls import path
from . import views
from .views import LoginView

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/login/', LoginView.as_view(), name='admin_login'),
]
