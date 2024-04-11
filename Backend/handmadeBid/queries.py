from django.db import connection
from django.utils import timezone


def get_all_orders(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT ProductID, OrderID, ProductName, OrderStatus, SellingPrice, SellerID, OrderID, Picture FROM ordersview WHERE BuyerID = %s", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_orders_by_status(userID, status):
    with connection.cursor() as cursor:
        cursor.execute("SELECT ProductID, OrderID, ProductName, OrderStatus, SellingPrice, SellerID, OrderID, Picture FROM ordersview WHERE BuyerID = %s AND OrderStatus = %s", [userID, status])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

def get_order_details(order_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT o.OrderID, o.SellerID , o.OrderDate, o.TotalAmount, o.OrderStatus, o.ProductName, "
                       "o.ProductID, o.SellingPrice, o.Picture FROM ordersview o "
                       "WHERE o.OrderID = %s", [order_id])
        columns_order = [col[0] for col in cursor.description]
        order_details = [dict(zip(columns_order, row)) for row in cursor.fetchall()]

        cursor.execute("SELECT s.TrackingNumber, s.Status FROM shipment s WHERE s.OrderID = %s", [order_id])
        columns_shipment = [col[0] for col in cursor.description]
        shipment_details = [dict(zip(columns_shipment, row)) for row in cursor.fetchall()]

        return {
            'order_details': order_details,
            'shipment_details': shipment_details
        }


def get_all_bids(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT p.Name, b.Status, b.BidPrice, p.SellerID, b.BiddingID, pic.Picture "
                       "FROM BIDDING b JOIN PRODUCTS p ON b.ProductID = p.ProductID "
                       "JOIN PICTURES pic ON p.PictureID = pic.PictureID WHERE b.BidderId = %s", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_bids_by_status(userID, status):
    with connection.cursor() as cursor:
        cursor.execute("SELECT p.Name, b.Status, b.BidPrice, p.SellerID, b.BiddingID, pic.Picture "
                       "FROM BIDDING b JOIN PRODUCTS p ON b.ProductID = p.ProductID JOIN PICTURES pic ON p.PictureID = pic.PictureID WHERE b.BidderId = %s AND b.Status = %s", [userID, status])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_bid_details(order_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT b.BiddingID, p.SellerID , b.BidDate, b.BidPrice, b.BidPrice*b.Quantity AS TotalAmount, b.Quantity, "
                       "b.Status, b.ActiveDays, p.Name, b.ProductID, p.StartPrice, pic.Picture "
                       "FROM BIDDING b JOIN PRODUCTS p ON b.ProductID = p.ProductID JOIN PICTURES pic ON p.PictureID = pic.PictureID "
                       "WHERE b.BiddingID = %s", [order_id])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_overview_pay(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT OrderID, Picture FROM ordersview WHERE BuyerID = %s AND OrderStatus = %s", [userID, 'Pending'])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

def get_overview_order(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT o.OrderID, o.ProductName, o.OrderStatus, pi.Picture FROM PRODUCTS p "
                       "JOIN ordersview o ON o.ProductID=p.ProductID "
                       "JOIN PICTURES pi ON p.PictureID = pi.PictureID WHERE o.BuyerID = %s AND OrderStatus != %s ORDER BY o.OrderDate DESC LIMIT 4", [userID, 'Pending'])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_overview_bid(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT p.Name, b.Status, b.BiddingID, pic.Picture "
                       "FROM BIDDING b JOIN PRODUCTS p ON b.ProductID=p.PRODUCTID "
                       "JOIN PICTURES pic ON p.PictureID = pic.PictureID "
                       "WHERE b.BidderId = %s ORDER BY BidDate DESC LIMIT 4", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def add_review(userID, sellerID, content, ProductID, OrderID, Rate):
    date = timezone.now()
    with connection.cursor() as cursor:
        try:
            cursor.execute("INSERT INTO REVIEWS "
                       "(ReviewerID, ReviewerType, RevieweeID, Content, ReviewDate, ProductID, OrderID, Rate) "
                       "VALUES (%s, 'Buyer', %s, %s, %s, %s, %s, %s)", [userID, sellerID, content, date, ProductID, OrderID, Rate])
            return True
        except Exception as e:
            print(e)
            return False


def add_address(Fname, Lname, UserID, Street, StreetOptional, City, State, Zipcode):
    with connection.cursor() as cursor:
        try:
            cursor.execute("""
                INSERT INTO ADDRESS (Fname, Lname, UserID, Street, StreetOptional, City, State, Zipcode) 
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                """, [Fname, Lname, UserID, Street, StreetOptional, City, State, Zipcode])
            new_id = cursor.lastrowid
            cursor.execute("""
                           UPDATE NORMALUSER
                           SET DefaultAddressID = %s
                           WHERE UserID = %s
                           """, [new_id, UserID])
            connection.commit()
            return True
        except Exception as e:
            print(e)
            return False

def get_payment_item(order_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT o.OrderID, o.SellerID , o.OrderDate, o.TotalAmount, o.OrderStatus, o.ProductName, "
                       "o.ProductID, o.SellingPrice, o.Picture FROM ordersview o "
                       "WHERE o.OrderID = %s", [order_id])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

def get_default_delivery(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT a.Fname, a.Lname, a.Street, a.StreetOptional, a.City, a.State, a.Zipcode "
                       "FROM ADDRESS a JOIN NORMALUSER n ON n.DefaultAddressID = a.AddressID "
                       "WHERE n.UserID = %s", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

def set_default_delivery(userID, AddressID):
    with connection.cursor() as cursor:
        try:
            cursor.execute("UPDATE NORMALUSER SET DefaultAddressID = %s WHERE UserID = %s", [AddressID, userID])
            return True
        except Exception as e:
            print(e)
            return False


def get_all_addresses(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT a.AddressID, a.Fname, a.Lname, a.Street, a.StreetOptional, a.City, a.State, a.Zipcode "
                       "FROM ADDRESS a "
                       "WHERE a.UserID = %s", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def cancel_order(orderID):
    with connection.cursor() as cursor:
        try:
            cursor.execute("UPDATE ORDERS SET OrderStatus = %s WHERE OrderID = %s", ['Canceled', orderID])
            return True
        except Exception as e:
            print(e)
            return False


def set_order(userID, orderID, paymentmethod):
    with connection.cursor() as cursor:
        try:
            cursor.execute("""
                SELECT DefaultAddressID FROM NORMALUSER WHERE UserID = %s
            """, [userID])  # 假设你有orderID对应的userID
            result = cursor.fetchone()
            addressID = result[0] if result else None

            cursor.execute("""
                INSERT INTO PAYMENT (OrderID, PaymentStatus, PaymentMethod) 
                VALUES (%s, %s, %s)
                """, [orderID, 'Completed', paymentmethod])
            cursor.execute("""
                            INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) 
                            VALUES (%s, %s, %s, %s)
                            """, [orderID, 'Not available yet', addressID, 'Awaiting Shipment'])
            cursor.execute("""
                           UPDATE ORDERS
                           SET OrderStatus = %s
                           WHERE OrderID = %s
                           """, ['Processing', orderID])
            connection.commit()
            return True
        except Exception as e:
            print(e)
            return False


def cancel_bid(biddingID):
    with connection.cursor() as cursor:
        try:
            cursor.execute("""
            UPDATE BIDDING
            SET STATUS = %s
            WHERE BiddingID = %s
            """, ['Canceled', biddingID])
            connection.commit()
            return True
        except Exception as e:
            print(e)
            return False

def get_account_details(userID):
    with connection.cursor() as cursor:
        # 第一个查询
        cursor.execute("SELECT UserID, Username, Phone, Rate, base_user_id "
                       "FROM NORMALUSER "
                       "WHERE UserID = %s", [userID])
        columns_order = [col[0] for col in cursor.description]
        user_details_result = cursor.fetchall()

        # 如果没有找到用户，直接返回空结果
        if not user_details_result:
            return {
                'user_details': [],
                'baseuser_details': []
            }

        user_details = [dict(zip(columns_order, row)) for row in user_details_result]
        base_user_id = user_details[0].get('base_user_id')

        cursor.execute("SELECT Email, Fname, Lname FROM BASEUSER WHERE UserID = %s", [base_user_id])
        columns_shipment = [col[0] for col in cursor.description]
        baseuser_details = [dict(zip(columns_shipment, row)) for row in cursor.fetchall()]

        return {
            'user_details': user_details,
            'baseuser_details': baseuser_details
        }


def update_account_details(userID, username, phone):
    with connection.cursor() as cursor:
        try:
            cursor.execute("UPDATE NORMALUSER SET Username = %s, Phone = %s WHERE UserID = %s", [username, phone, userID])
            connection.commit()
            return True
        except Exception as e:
            print(e)
            return False
