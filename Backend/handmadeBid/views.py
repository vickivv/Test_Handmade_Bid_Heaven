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
    get_bid_details, get_overview_pay, get_overview_order, get_overview_bid, add_review, add_address, get_payment_item, \
    get_default_delivery, get_all_addresses, set_default_delivery, cancel_order

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


class GetOverviewPayAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')

        if not user_id:
            return JsonResponse({'error': 'userId parameter is required'}, status=400)
        try:
            user_id = int(user_id)
        except ValueError:
            return JsonResponse({'error': 'Invalid userId'}, status=400)

        data = get_overview_pay(user_id)
        return Response(data)


class GetOverviewOrderAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')

        if not user_id:
            return JsonResponse({'error': 'userId parameter is required'}, status=400)
        try:
            user_id = int(user_id)
        except ValueError:
            return JsonResponse({'error': 'Invalid userId'}, status=400)

        data = get_overview_order(user_id)
        return Response(data)

class GetOverviewBidAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')

        if not user_id:
            return JsonResponse({'error': 'userId parameter is required'}, status=400)
        try:
            user_id = int(user_id)
        except ValueError:
            return JsonResponse({'error': 'Invalid userId'}, status=400)

        data = get_overview_bid(userID=user_id)
        return Response(data)

class GetAllOrdersAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('userId')
        data_str = request.query_params.get('status', None)

        if not user_id:
            return JsonResponse({'error': 'userId parameter is required'}, status=400)
        try:
            # 尝试将 userId 转换为整数
            user_id = int(user_id)
        except ValueError:
            # 如果转换失败，返回错误响应
            return JsonResponse({'error': 'Invalid userId'}, status=400)

        if data_str and data_str != 'All Orders':
            data = get_orders_by_status(user_id, data_str)
            return Response(data)
        data = get_all_orders(userID=user_id)
        return Response(data)


class GetOrderDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order_id = self.kwargs.get('orderId')
        data = get_order_details(order_id)
        return Response(data)


class GetAllBidsAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')
        data_str = request.query_params.get('status', None)

        if not user_id:
            return JsonResponse({'error': 'userId parameter is required'}, status=400)
        try:
            # 尝试将 userId 转换为整数
            user_id = int(user_id)
        except ValueError:
            # 如果转换失败，返回错误响应
            return JsonResponse({'error': 'Invalid userId'}, status=400)

        if data_str and data_str != 'All Bids':
            data = get_bids_by_status(user_id, data_str)
            return Response(data)
        data = get_all_bids(user_id)
        return Response(data)


class GetBidDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        bid_id = self.kwargs.get('BiddingID')
        data = get_bid_details(bid_id)
        return Response(data)


class AddReviewAPIView(APIView):
    def post(self, request, *args, **kwargs):
        data = json.loads(request.body)

        userID = data.get('userid')
        sellerID = data.get('sellerid')
        content = data.get('data')
        ProductID = data.get('productid')
        OrderID = data.get('orderid')
        Rate = data.get('rate')

        if add_review(userID, sellerID, content, ProductID, OrderID, Rate):
            return JsonResponse({"success": True})
        else:
            return JsonResponse({"error": "Unable to add review"}, status=400)


class GetAllAddressesAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')
        data = get_all_addresses(user_id)
        return Response(data)

class AddAddressAPIView(APIView):
    def post(self, request):
        data = json.loads(request.body)
        Fname = data.get('First name')
        Lname = data.get('Last name')
        UserID = data.get('userId')
        Street = data.get('Address line one')
        StreetOptional = data.get('Address line two')
        City = data.get('City')
        State = data.get('State')
        Zipcode = data.get('Zipcode')

        if add_address(Fname, Lname, UserID, Street, StreetOptional, City, State, Zipcode):
            return JsonResponse({'success': True})
        else:
            return JsonResponse({"error": "Unable to add review"}, status=400)

class GetDefaultDeliveryAPIView(APIView):
    def get(self, request):
        user_id = request.query_params.get('userId')
        data = get_default_delivery(user_id)
        return Response(data)


class SetDefaultDeliveryAPIView(APIView):
    def put(self, request):
        user_id = request.query_params.get('userId')
        address_id = request.query_params.get('addressId')
        if set_default_delivery(user_id, address_id):
            return JsonResponse({'success': True})
        else:
            return JsonResponse({"error": "Unable to set"}, status=400)

class GetPaymentItemAPIView(APIView):
    def get(self, request, *args, **kwargs):
        order_id = self.kwargs.get('orderId')
        data = get_payment_item(order_id)
        return Response(data)


class CancelOrderAPIView(APIView):
    def put(self, request):
        data = json.loads(request.body)

        order_id = data.get('orderid')
        if cancel_order(order_id):
            return JsonResponse({'success': True, 'id': order_id})
        else:
            return JsonResponse({"error": "Unable to set"}, status=400)

