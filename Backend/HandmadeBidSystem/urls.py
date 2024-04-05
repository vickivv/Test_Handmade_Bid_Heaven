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

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('handmadeBid.urls')),
    path('api/get_overview_pay', views.GetOverviewPayAPIView.as_view(), name='get_overview_pay'),
    path('api/get_overview_order', views.GetOverviewOrderAPIView.as_view(), name='get_overview_order'),
    path('api/get_overview_bid', views.GetOverviewBidAPIView.as_view(), name='get_overview_bid'),
    path('api/get_payment_item/<int:orderId>', views.GetPaymentItemAPIView.as_view(), name='get_payment_item'),
    path('api/get_all_addresses', views.GetAllAddressesAPIView.as_view(), name='get_all_addresses'),
    path('api/get_default_delivery', views.GetDefaultDeliveryAPIView.as_view(), name='get_default_delivery'),
    path('api/set_default_delivery', views.SetDefaultDeliveryAPIView.as_view(), name='ser_default_delivery'),
    path('api/cancel_order', views.CancelOrderAPIView.as_view(), name='cancel_order'),

    path('api/get_all_orders', views.GetAllOrdersAPIView.as_view(), name='get_all_orders'),
    path('api/get_all_orders/<int:orderId>', views.GetOrderDetailAPIView.as_view(), name='get_order_detail'),
    path('api/get_all_bids', views.GetAllBidsAPIView.as_view(), name='get_all_bids'),
    path('api/get_all_bids/<int:BiddingID>', views.GetBidDetailAPIView.as_view(), name='get_bid_detail'),
    path('api/insert_review', views.AddReviewAPIView.as_view(), name='add_review'),
    path('api/add_address', views.AddAddressAPIView.as_view(), name='add_address')
]

