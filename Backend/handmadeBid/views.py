from rest_framework import viewsets
from django.shortcuts import HttpResponse
from .models import Products, Category, Normaluser, Adminuser, Pictures, Bidding
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from bs4 import BeautifulSoup
from django.core.files.base import ContentFile
import base64
import json

@csrf_exempt 
def add_product(request):
    if request.method == 'POST':
        print(request.POST)
        name = request.POST['name']
        category_name = request.POST['category']
        html_description = request.POST['description']
        soup = BeautifulSoup(html_description, 'html.parser')
        description = soup.p.text.strip()
        startPrice = request.POST['startPrice']
        inventory = request.POST['inventory']
        category = Category.objects.filter(cname = category_name).first()
        today = date.today()
        seller = Normaluser.objects.get(userid=21)
        manager = Adminuser.objects.filter(userid = 11).first()
        pictureList = request.POST['pictures']

        firstKey = 0
        for s in pictureList:
            if s==',':
                break
            firstKey = firstKey * 10 + int(s)
          
        new_product = Products( 
            name=name,
            categoryid=category,
            description = description,
            startprice = startPrice,
            postdate = today,
            status='Active',
            inventory = inventory,
            sellerid = seller,
            pictureid = firstKey,
            manageid = manager
        )
        new_product.save()

        productId = new_product.pk
        x = 0
        for key in pictureList:
            if key==',':
                Pictures.objects.filter(pictureid=x).update(productid=productId)
                x=0
            else:
                x = x * 10 + int(key)
        Pictures.objects.filter(pictureid=x).update(productid=productId)

        return HttpResponse('submit success')

def get_category(request):
    if request.method == 'GET':
        category = Category.objects.all()
        category_list = []
        id = 0
        for c in category:
            c_item = {
                'id':id,
                'name':c.cname
            }
            category_list.append(c_item)
            id+=1
        return JsonResponse(category_list, safe=False)

@csrf_exempt 
def upload_picture(request):
    if request.method == 'POST':
        # img_data = request.FILES['image']
        new_img = Pictures(
            picture=request.FILES.get('image'),  
        )
        new_img.save()
        return JsonResponse(new_img.pk, safe=False)

def get_products(request):
    if request.method=='GET':
        products = Products.objects.filter(sellerid=21)
        product_list = []
        for p in products:
            bidnum = Bidding.objects.filter(productid=p.productid).count()
            # if p.pictureid:
            picture = Pictures.objects.filter(pictureid=p.pictureid).first().picture
            print(picture)
            picture_path=json.dumps(str(picture))
            print(picture_path)
            p_item = {
                'picture': picture_path,
                # 'content_type': content_type,
                'name': p.name,
                'category': p.categoryid.cname,
                'description': p.description,
                'startPrice': p.startprice,
                'inventory': p.inventory,
                'bidnum': bidnum,
                'postdate': p.postdate
            }
            product_list.append(p_item)
        data={
            'result': product_list,
            'total_count': len(product_list)
        }
        
        return JsonResponse(data, safe=False)