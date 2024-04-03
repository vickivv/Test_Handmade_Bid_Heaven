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
from django.urls import path
from handmadeBid import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('addproducts',views.add_product,name ='addproducts'),
    path('category', views.get_category, name='category'),
    path('uploadpicture', views.upload_picture),
    path('activeproducts', views.get_active_products),
    path('getstat', views.get_overview_stat),
    path('getrecentorders', views.get_recent_orders),
    path('getrecentbids', views.get_recent_bids),
    path('bestsaleproducts', views.get_best_products),
    path('soldoutproducts', views.get_soldout_products),
    path('getbids', views.get_bids),
    path('getorders', views.get_orders),
    path('orderdetail/<int:order_id>/', views.get_order_detail),
    path('getproducts/<int:product_id>/', views.get_products),
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
