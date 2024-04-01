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

from .queries import get_all_orders, get_orders_by_status, get_order_details, get_all_bids, get_bids_by_status, \
    get_bid_details, get_overview_order, get_overview_bid

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


class GetOverviewOrderAPIView(APIView):
    def get(self, request):
        data = get_overview_order()
        return Response(data)

class GetOverviewBidAPIView(APIView):
    def get(self, request):
        data = get_overview_bid()
        return Response(data)

class GetAllOrdersAPIView(APIView):
    def get(self, request):
        data_str = request.query_params.get('status', None)
        if data_str and data_str != 'All Orders':
            data = get_orders_by_status(data_str)
            return Response(data)
        data = get_all_orders()
        return Response(data)


class GetOrderDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order_id = self.kwargs.get('orderId')
        data = get_order_details(order_id)
        return Response(data)


class GetAllBidsAPIView(APIView):
    def get(self, request):
        data_str = request.query_params.get('status', None)
        if data_str and data_str != 'All Bids':
            data = get_bids_by_status(data_str)
            return Response(data)
        data = get_all_bids()
        return Response(data)


class GetBidDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        bid_id = self.kwargs.get('BiddingID')
        data = get_bid_details(bid_id)
        return Response(data)