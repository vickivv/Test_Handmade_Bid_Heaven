from django.urls import path
from . import views
from .views import LoginView ,AdminLoginView

urlpatterns = [
    path('signup/', views.signup, name='signup'),
    path('login/', LoginView.as_view(), name='login'),
    path('admin/login/', AdminLoginView.as_view(), name='admin_login'),
]
