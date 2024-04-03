from rest_framework import viewsets
from django.shortcuts import HttpResponse
from .models import Products, Category, Normaluser, Adminuser, Pictures, Bidding, Orders, Payment
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from bs4 import BeautifulSoup
from django.core.files.base import ContentFile
from django.db.models import Sum
import json
from datetime import timedelta

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
def update_product(request, product_id):
    if request.method == 'PUT':
        

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

def get_products(request, product_id):
    if request.method=='GET':
        product=Products.objects.get(productid=product_id)
        pictures=Pictures.objects.filter(productid=product.productid)
        pictures=[]
        for p in pictures:
            picture_path=json.dumps(str(p.picture))
            pictures.append(picture_path.replace('"', ''))
        data={
            'name': product.name,
            'category': product.categoryid.cname,
            'startPrice': product.startprice,
            'inventory': product.inventory,
            'pictures': pictures,
            'description': product.description
        }
        return JsonResponse(data, safe=False)

def get_active_products(request):
    if request.method=='GET':
        products = Products.objects.filter(sellerid=21, status='Active')
        product_list = []
        for p in products:
            bidnum = Bidding.objects.filter(productid=p.productid).count()
            picture = Pictures.objects.filter(pictureid=p.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            p_item = {
                'picture': picture_path,
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

def get_soldout_products(request):
    if request.method=='GET':
        products = Products.objects.filter(sellerid=21, status='Sold Out')
        product_list = []
        for p in products:
            bidnum = Bidding.objects.filter(productid=p.productid).count()
            picture = Pictures.objects.filter(pictureid=p.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            p_item = {
                'picture': picture_path,
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
    
def get_overview_stat(request):
    if request.method == 'GET':
        product_list = Products.objects.filter(sellerid=21)
        active_num = Products.objects.filter(sellerid=21, status='Active').count()
        sold_out_num = Products.objects.filter(sellerid=21, status='Sold Out').count()
        bidding_list = []
        bidding_count = 0
        total_bidding_price = 0
        for p in product_list:
            biddings = Bidding.objects.filter(productid=p.productid)
            bidding_count += len(biddings)
            bidding_list.append(biddings)
        order_count = 0
        total_sales = 0
        for biddings in bidding_list:
            if len(biddings) == 0:
                continue
            for b in biddings:
                total_bidding_price += b.bidprice
                if Orders.objects.filter(biddingid=b.biddingid).exists():
                    order_count += 1
                    total_sales += b.bidprice * b.quantity
        data ={
            "activeProduct": active_num,
            "soldoutProduct": sold_out_num,
            "totalOrder": order_count,
            "totalSale": round(total_sales),
            "averageBid": round(total_bidding_price/bidding_count)
        }
        return JsonResponse(data, safe=False)
    

def get_recent_orders(request):
    if request.method=="GET":
        product_list = Products.objects.filter(sellerid=21)
        product_ids= [p.productid for p in product_list]
        bidding_list = Bidding.objects.filter(productid__in=product_ids)
        bidding_ids = [b.biddingid for b in bidding_list]
        recent_orders = Orders.objects.filter(biddingid__in=bidding_ids).order_by('-orderdate')[:4]
        data_list = []
        for order in recent_orders:
            pid=Bidding.objects.filter(biddingid=order.biddingid.biddingid).first().productid.productid
            product=Products.objects.filter(productid=pid).first()
            picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            item={
                'orderid': order.orderid,
                'orderStatus': order.orderstatus,
                'productName': product.name,
                'picture': picture_path.replace('"', '')
            }
            data_list.append(item)
        data={'result': data_list}
        return JsonResponse(data, safe=False)

def get_recent_bids(request):
    if request.method == 'GET':
        product_list = Products.objects.filter(sellerid=21)
        product_ids= [p.productid for p in product_list]
        recent_bids = Bidding.objects.filter(productid__in=product_ids).order_by('-biddate')[:4]
        data_list = []
        for bid in recent_bids:
            pid=bid.productid.productid
            product = Products.objects.filter(productid=pid).first()
            picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            item={
                'bidid': bid.biddingid,
                'bidStatus': bid.status,
                'productName': product.name,
                'picture': picture_path.replace('"', '')
            }
            data_list.append(item)
        
        data={'result': data_list}
        return JsonResponse(data,safe=False)

def get_best_products(request):
    if request.method=='GET':
        order_list = Bidding.objects.filter(biddingid__in=Orders.objects.values_list('biddingid', flat=True))
        product_quantities = order_list.values('productid').annotate(
            total_quantity=Sum('quantity')
        ).order_by('-total_quantity')[:3]
        data_list = []
        for element in product_quantities:
            product_id = element['productid']
            product=Products.objects.get(productid=product_id)
            picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            item={
                "category": product.categoryid.cname,
                "productname": product.name,
                "quantity": element['total_quantity'],
                'picture': picture_path.replace('"', '')
            }
            data_list.append(item)
        data={"result": data_list}
        
        return JsonResponse(data, safe=False)

def get_bids(request):
    if request.method=='GET':
        seller_id=21
        product_list = Products.objects.filter(sellerid=seller_id)
        product_ids= [p.productid for p in product_list]
        bidding_list = Bidding.objects.filter(productid__in=product_ids)
        count = len(bidding_list)
        data_list = []
        for bid in bidding_list: 
            product = bid.productid
            bidder = Normaluser.objects.get(userid=bid.bidderid.userid)
            bidder_name=bidder.username
            bidder_rate=bidder.rate
            final_date=bid.biddate+timedelta(days=bid.activedays)
            item={
                'productId': product.productid,
                'productName': product.name,
                'bidPrice': bid.bidprice,
                'quantity': bid.quantity,
                "bidDate": bid.biddate,
                "bidderName": bidder_name,
                "bidderRate": bidder_rate,
                "validDate": final_date
            }
            data_list.append(item)
        data={
            "result":data_list, 
            "count": count
        }
        return JsonResponse(data, safe=False)

def get_orders(request):
    if request.method == 'GET':
        seller_id=21
        product_list = Products.objects.filter(sellerid=seller_id)
        product_ids= [p.productid for p in product_list]
        bidding_list = Bidding.objects.filter(productid__in=product_ids)
        order_list = Orders.objects.filter(biddingid__in=bidding_list)
        data_list = []
        for order in order_list:
            bid=order.biddingid
            sale_amount=bid.quantity * bid.bidprice
            product=bid.productid
            picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
            picture_path=json.dumps(str(picture)).replace('"', '')
            item={
                "picture":picture_path,
                "orderid": order.orderid,
                "productName": product.name,
                "orderStatus": order.orderstatus,
                "orderDate": order.orderdate,
                "amount": sale_amount
            }
            data_list.append(item)
        data={
            "result": data_list
        }
        return JsonResponse(data, safe=False)

def get_order_detail(request, order_id):
    if request.method=='GET':
        order = Orders.objects.get(pk=order_id)
        bidding = order.biddingid
        totalAmount = bidding.quantity * bidding.bidprice
        product = bidding.productid
        picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
        picture_path=json.dumps(str(picture)).replace('"', '')
        payment = Payment.objects.get(orderid=order_id)
        category=product.categoryid
        data={
            "orderid": order_id,
            "orderDate": order.orderdate,
            "buyerid": bidding.bidderid.userid,
            "quantity": bidding.quantity,
            "totalAmount": totalAmount,
            "paymentMethod": payment.paymentmethod,
            "paymentStatus": payment.paymentstatus,
            "productName": product.name,
            "productid": product.productid,
            "picture":picture_path,
            "startPrice": product.startprice,
            "category": category.cname
        }
        print(data)
        return JsonResponse(data, safe=False)
