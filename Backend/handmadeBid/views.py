from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NormalUser,AdminUser
from rest_framework.decorators import api_view
from .serialization import NormalUserSerializer ,LoginSerializer ,AdminUserSerializer,AdminLoginSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password



from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response


from rest_framework import status
import json
import logging

logger = logging.getLogger(__name__)

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serialization import NormalUserSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny

@csrf_exempt
@api_view(['POST'])
def signup(request):
    serializer = NormalUserSerializer(data=request.data)
    
    if serializer.is_valid():
        user = serializer.save()
        return Response({
            'message': 'User created successfully',
            'user_id': user.base_user.UserID if hasattr(user, 'base_user') else user.UserID
        }, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    


class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('Username')  
        password = request.data.get('password')
        try:
            user = NormalUser.objects.get(Username=username) 
            base_user = user.base_user
            if base_user.check_password(password):  
                token, created = Token.objects.get_or_create(user=base_user)
                return Response({
                    "token": token.key,
                    "userId": base_user.UserID,
                    "username": user.Username,  # Make sure this is the correct attribute
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        except NormalUser.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)

        




class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AdminLoginSerializer(data=request.data)  
        if serializer.is_valid():
            Email = serializer.validated_data.get('Email')  
            password = serializer.validated_data.get('password') 
            try:
                admin_user = AdminUser.objects.get(base_user__Email=Email)
                if admin_user.base_user.check_password(password):
                    token, created = Token.objects.get_or_create(user=admin_user.base_user)
                    return Response({
                        "token": token.key,
                        "adminUserId": admin_user.UserID,  
                        "email": Email, 
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
            except AdminUser.DoesNotExist:
                return Response({"error": "Invalid email"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

