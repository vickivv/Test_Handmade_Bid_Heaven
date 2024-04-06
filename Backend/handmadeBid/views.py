from rest_framework import viewsets
from django.shortcuts import HttpResponse
from .models import Products, Category, Normaluser, Adminuser, Pictures, Bidding, Orders, Payment, Reviews, Shipment
from datetime import date
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from bs4 import BeautifulSoup
from django.core.files.base import ContentFile
from django.db.models import Sum
import json
from datetime import timedelta
from django.http import HttpResponseNotFound

@csrf_exempt 
def add_product(request):
    if request.method == 'POST':
        name = request.POST['name']
        categoryId = request.POST['category']
        description = request.POST['description']
        startPrice = request.POST['startPrice']
        inventory = request.POST['inventory']
        category = Category.objects.get(pk=categoryId)
        
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

@csrf_exempt 
def update_product(request, product_id):

    seller_id=21
    if request.method == 'POST':
        product = Products.objects.get(pk=product_id)
        product.name=request.POST['name']
        category_name = request.POST['category']
        product.description = request.POST['description']
        product.startPrice = request.POST['startPrice']
        product.inventory = request.POST['inventory']
        product.categoryid = Category.objects.get(cname = category_name)
        product.postdate = date.today()
        product.manager = Adminuser.objects.filter(userid = 11).first()
        pictureList = request.POST['pictures']

        firstKey = 0
        for s in pictureList:
            if s==',':
                break
            firstKey = firstKey * 10 + int(s)
        
        product.pictureid = firstKey
        product.save()

        x = 0
        for key in pictureList:
            if key==',':
                Pictures.objects.filter(pictureid=x).update(productid=product_id)
                x=0
            else:
                x = x * 10 + int(key)
        Pictures.objects.filter(pictureid=x).update(productid=product_id)
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

def get_product(request, product_id):
    if request.method=='GET':
        product=Products.objects.get(productid=product_id)
        pictures=Pictures.objects.filter(productid=product.productid)
        cover=Pictures.objects.get(pictureid=product.pictureid)
        cover_path=json.dumps(str(cover.picture))
        picture_list=[]
        picture_keys=[]
        for p in pictures:
            picture_path=json.dumps(str(p.picture))
            picture_list.append(picture_path.replace('"', ''))
            picture_keys.append(p.pictureid)
        data={
            'name': product.name,
            'category': product.categoryid.cname,
            'startPrice': product.startprice,
            'inventory': product.inventory,
            'pictures': picture_list,
            "cover": cover_path.replace('"', ''),
            'description': product.description,
            "pictureKeys":picture_keys
        }
        return JsonResponse(data, safe=False)

def get_products(request):
    if request.method=='GET':
        seller_id=21
        product_status=request.GET.get('status')
        products = Products.objects.filter(sellerid=seller_id, status=product_status)
        
        bidnum = request.GET.get('bidnum')
        if bidnum:       
            products_in_bids = Bidding.objects.values_list('productid', flat=True)
            if bidnum == '0':
                products = products.exclude(productid__in=products_in_bids)
            elif bidnum == '-1':
                products = products.filter(productid__in=products_in_bids)
        
        category = request.GET.get('category')
        if category:
            category_id = int(category) + 1
            if category_id != 0:
                products = products.filter(categoryid=category_id)
        
        begin_date = request.GET.get('begin_postdate')
        end_date = request.GET.get('end_postdate')
        if begin_date and end_date:
            products = products.filter(postdate__range=(begin_date, end_date))

        product_list = []
        for p in products:
            bidnum = Bidding.objects.filter(productid=p.productid).count()
            picture = Pictures.objects.filter(pictureid=p.pictureid).first().picture
            picture_path=json.dumps(str(picture))
            p_item = {
                'productid': p.productid,
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
        
        bidstatus = request.GET.get('status')
        if bidstatus:
            bidding_list = bidding_list.filter(status=bidstatus)
        
        begin_date = request.GET.get('begin_postdate')
        end_date = request.GET.get('end_postdate')
        if begin_date and end_date:
            bidding_list = bidding_list.filter(biddate__range=(begin_date, end_date))

        count = len(bidding_list)
        data_list = []
        for bid in bidding_list: 
            product = bid.productid
            bidder = Normaluser.objects.get(userid=bid.bidderid.userid)
            bidder_name=bidder.username
            bidder_rate=bidder.rate
            final_date=bid.biddate+timedelta(days=bid.activedays)
            item={
                'biddingid': bid.biddingid,
                'productId': product.productid,
                'productName': product.name,
                'bidPrice': bid.bidprice,
                'quantity': bid.quantity,
                "bidDate": bid.biddate,
                "bidderName": bidder_name,
                "bidderRate": bidder_rate,
                "validDate": final_date,
                'biddingstatus': bid.status
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
            product = bid.productid
            picture = Pictures.objects.filter(pictureid=product.pictureid).first().picture
            picture_path=json.dumps(str(picture)).replace('"', '')
            item={
                "buyerid": bid.bidderid.userid,
                "picture": picture_path,
                "orderid": order.orderid,
                "productid": bid.productid.productid,
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
        try:
            payment = Payment.objects.get(orderid=order_id)
            payment_method=payment.paymentmethod
            payment_status=payment.paymentstatus
        except Payment.DoesNotExist:
            payment_method='No payment method'
            payment_status='No payment status'
        category=product.categoryid
        data={
            "orderid": order_id,
            "orderDate": order.orderdate,
            "buyerid": bidding.bidderid.userid,
            "quantity": bidding.quantity,
            "totalAmount": totalAmount,
            "paymentMethod": payment_method,
            "paymentStatus": payment_status,
            "productName": product.name,
            "productid": product.productid,
            "picture":picture_path,
            "startPrice": product.startprice,
            "category": category.cname
        }
        return JsonResponse(data, safe=False)

@csrf_exempt
def delete_product(request, product_id):
    try:
        Products.objects.get(pk=product_id).delete()
        return HttpResponse('success')
    except Exception as e:
        return HttpResponseNotFound('Record not found')

@csrf_exempt
def update_bid_status(request, bidding_id):
    try:
        bid = Bidding.objects.get(pk=bidding_id)
        bid.status=request.POST['status']
        bid.save()
        return HttpResponse('success')
    except Exception as e:
        return HttpResponseNotFound('Record not found')

@csrf_exempt
def add_order(request, bidding_id):
    bidding = Bidding.objects.get(pk=bidding_id)
    today = date.today()
    status = "Pending"
    new_order = Orders(
        biddingid=bidding,
        orderdate=today,
        orderstatus=status
    )
    new_order.save()
    return HttpResponse("success")

def get_product_bids(request, product_id):
    if request.method == 'GET':
        bidding_list = Bidding.objects.filter(productid=product_id, status='Pending')
        data_list = []
        for bid in bidding_list: 
            bidder = Normaluser.objects.get(userid=bid.bidderid.userid)
            final_date=bid.biddate+timedelta(days=bid.activedays)
            item={
                'biddingid': bid.biddingid,
                'bidPrice': bid.bidprice,
                'quantity': bid.quantity,
                "bidDate": bid.biddate,
                "bidderName": bidder.username,
                "bidderRate": bidder.rate,
                "validDate": final_date,
            }
            data_list.append(item)
        data={"result":data_list}
        return JsonResponse(data, safe=False)

@csrf_exempt
def add_rate(request):
    reviewer_id = 21
    if request.method=='POST':
        rate = request.POST.get('rate')
        order_id = request.POST.get('orderid')
        buyer_id = request.POST.get('buyerid')
        reviewer = Normaluser.objects.get(userid=reviewer_id)
        reviewee = Normaluser.objects.get(userid=buyer_id)
        product_id = request.POST.get('productid')
        product = Products.objects.get(productid=product_id)
        order = Orders.objects.get(orderid=order_id)
        new_review = Reviews(
            reviewerid=reviewer,
            reviewertype='Seller',
            revieweeid=reviewee,
            reviewdate=date.today(),
            productid=product,
            orderid = order,
            rate = rate
        )
        new_review.save()
        return HttpResponse('success')

@csrf_exempt
def add_shipment(request):
    print(request.POST)
    if request.method=='POST':
        order_id = request.POST.get('orderid')
        order = Orders.objects.get(orderid=order_id)
        buyer_id = request.POST.get('buyerid')
        buyer = Normaluser.objects.get(userid=buyer_id)
        address = buyer.defaultaddressid
        tracknumber = request.POST.get('track')
        new_shipment=Shipment(
            orderid=order,
            trackingnumber=tracknumber,
            addressid=address,
            status='Shipped'
        )
        new_shipment.save()
        return HttpResponse('success')