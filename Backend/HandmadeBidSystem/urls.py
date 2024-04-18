"""
URL configuration for HandmadeBidSystem project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from handmadeBid import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('handmadeBid.urls')),

    path('api/get_account_detail',
         views.GetAccountDetailAPIView.as_view(), name='get_account_detail'),
    path('api/set_account_detail',
         views.SetAccountDetailAPIView.as_view(), name='get_account_detail'),

    path('api/get_overview_pay', views.GetOverviewPayAPIView.as_view(),
         name='get_overview_pay'),
    path('api/get_overview_order',
         views.GetOverviewOrderAPIView.as_view(), name='get_overview_order'),
    path('api/get_overview_bid', views.GetOverviewBidAPIView.as_view(),
         name='get_overview_bid'),
    path('api/get_payment_item/<int:orderId>',
         views.GetPaymentItemAPIView.as_view(), name='get_payment_item'),
    path('api/get_all_addresses', views.GetAllAddressesAPIView.as_view(),
         name='get_all_addresses'),
    path('api/get_default_delivery',
         views.GetDefaultDeliveryAPIView.as_view(), name='get_default_delivery'),
    path('api/set_default_delivery',
         views.SetDefaultDeliveryAPIView.as_view(), name='ser_default_delivery'),
    path('api/cancel_order', views.CancelOrderAPIView.as_view(), name='cancel_order'),
    path('api/set_order', views.SetOrderAPIView.as_view(), name='set_order'),
    path('api/cancel_bid', views.CancelBidAPIView.as_view(), name='cancel_bid'),
    path('api/get_all_orders', views.GetAllOrdersAPIView.as_view(),
         name='get_all_orders'),
    path('api/admin_get_all_orders',
         views.AdminGetAllOrdersAPIView.as_view(), name='admin_get_all_orders'),
     path('api/admin_get_all_users',
         views.AdminGetAllUsersAPIView.as_view(), name='admin_get_all_users'),
     # path('api/delete_user', views.delete_user_view, name='delete_user'),
    path('api/get_all_orders/<int:orderId>',
         views.GetOrderDetailAPIView.as_view(), name='get_order_detail'),
    path('api/get_all_bids', views.GetAllBidsAPIView.as_view(), name='get_all_bids'),
    path('api/get_all_bids/<int:BiddingID>',
         views.GetBidDetailAPIView.as_view(), name='get_bid_detail'),
    path('api/insert_review', views.AddReviewAPIView.as_view(), name='add_review'),
    path('api/add_address', views.AddAddressAPIView.as_view(), name='add_address'),

    path('addproducts', views.add_product, name='addproducts'),
    path('category', views.get_category, name='category'),
    path('uploadpicture', views.upload_picture),
    path('getproducts', views.get_products),
    path('getallproducts', views.get_all_products),
    path('getstat/<int:userId>/', views.get_overview_stat),
    path('getrecentorders/<int:userId>/', views.get_recent_orders),
    path('getrecentbids/<int:userId>/', views.get_recent_bids),
    path('bestsaleproducts/<int:userId>/', views.get_best_products),
    path('getbids', views.get_bids),
    path('getorders/<int:userId>/', views.get_orders),
    path('orderdetail/<int:order_id>/', views.get_order_detail),
    path('getproduct/<int:product_id>/', views.get_product),
    path('updateproduct/<int:product_id>/', views.update_product),
    path('deleteproduct/<int:product_id>/', views.delete_product),
    path('updatebidstatus/<int:bidding_id>/', views.update_bid_status),
    path('addorder/<int:bidding_id>/', views.add_order),
    path('productbids/<int:product_id>/', views.get_product_bids),
    path('addrate', views.add_rate),
    path('addshipment', views.add_shipment),
    path('getusername/<int:userId>/', views.get_username),
    path('addbid', views.add_bid),
    path('bestcategory/<int:userId>/', views.get_bestsale_category),
    

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)



