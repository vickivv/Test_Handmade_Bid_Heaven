from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from rest_framework.parsers import JSONParser
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import NormalUser,AdminUser
from rest_framework.decorators import api_view
from .serialization import NormalUserSerializer ,LoginSerializer ,AdminUserSerializer
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import check_password

from rest_framework.authentication import TokenAuthentication
from rest_framework.response import Response


from rest_framework import status
import json
import logging

logger = logging.getLogger(__name__)





@csrf_exempt
@require_http_methods(["POST"])
def signup(request):
    data = JSONParser().parse(request)
    serializer = NormalUserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return JsonResponse({'message': 'User created successfully'}, status=201)
    else:
        return JsonResponse(serializer.errors, status=400)
    


# when valid , return token and userid
class LoginView(APIView):
    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = NormalUser.objects.get(Username=username)
            if user.check_password(password):
                token, created = Token.objects.get_or_create(user=user)
                return Response({
        "token": token.key,
        "userId": user.UserID,
        "username": user.Username,  
    }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
        except NormalUser.DoesNotExist:
            return Response({"error": "Invalid username"}, status=status.HTTP_400_BAD_REQUEST)
        


class AdminLoginView(APIView):
    def post(self, request, *args, **kwargs):
        serializer = AdminUserSerializer(data=request.data)
        
        if serializer.is_valid():
            first_name = serializer.validated_data['Fname']
            last_name = serializer.validated_data['Lname']
            password = serializer.validated_data['Password']
            
            try:
                admin_user = AdminUser.objects.get(Fname=first_name, Lname=last_name)
                
                if check_password(password, admin_user.Password):
                    token, created = Token.objects.get_or_create(user=admin_user)
                    return Response({
                        "token": token.key,
                        "userId": admin_user.UserID,
                        "first_name": admin_user.Fname,
                        "last_name": admin_user.Lname
                    }, status=status.HTTP_200_OK)
                else:
                    return Response({"error": "Invalid password"}, status=status.HTTP_400_BAD_REQUEST)
            except AdminUser.DoesNotExist:
                return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

       