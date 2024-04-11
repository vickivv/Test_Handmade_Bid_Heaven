from django.db import connection
from django.utils import timezone
import traceback



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

# Message 
def send_message(from_email, to_email, subject_type, product_info, order_info, content):
    with connection.cursor() as cursor:
        try:
            #get sender's type and base_user_id from email
            cursor.execute("SELECT UserID, is_staff FROM BASEUSER WHERE Email=%s", [from_email])
            sender_base_user_id, sender_is_staff = cursor.fetchone()
            sender_type = 'Admin' if sender_is_staff else 'Normal'

            ##get receiver's type and base_user_id from email
            cursor.execute("SELECT UserID, is_staff FROM BASEUSER WHERE Email=%s", [to_email])
            print("Backend to email:",to_email)
            receiver_base_user_id, receiver_is_staff = cursor.fetchone()
            print("receiver_base_user_id at backend :",receiver_base_user_id)
            receiver_type = 'Admin' if receiver_is_staff else 'Normal'

            # get sender_id from base_user_id
            if sender_type == 'Normal':
                cursor.execute("SELECT UserID FROM NORMALUSER WHERE base_user_id =%s", [sender_base_user_id])
                sender_user_id = cursor.fetchone()[0]
                admin_sender_id = None
            else:
                cursor.execute("SELECT UserID FROM ADMINUSER WHERE base_user_id=%s", [sender_base_user_id])
                admin_sender_id = cursor.fetchone()[0]
                sender_user_id = None

           # get receiver_id from base_user_id
            if receiver_type == 'Normal':
                cursor.execute("SELECT UserID FROM NORMALUSER WHERE base_user_id=%s", [receiver_base_user_id])
                receiver_user_id = cursor.fetchone()[0]
                admin_receiver_id = None
            else:
                cursor.execute("SELECT UserID FROM ADMINUSER WHERE base_user_id=%s", [receiver_base_user_id])
                admin_receiver_id = cursor.fetchone()[0]
                receiver_user_id = None

            product_id = None
            order_id = None

            if subject_type == 'Product':
                if product_info:
                    cursor.execute("SELECT ProductID FROM PRODUCTS WHERE Name=%s", [product_info])
                    product_id_result = cursor.fetchone()
                    if product_id_result:
                        product_id = product_id_result[0]
            elif subject_type == 'Order':
                if order_info:
                    cursor.execute("SELECT OrderID FROM ORDERS WHERE OrderID=%s", [order_info])
                    order_id_result = cursor.fetchone()
                    if order_id_result:
                        order_id = order_id_result[0]
                    else:
                        order_id = None
            else:
                raise ValueError(f"Unknown subject type: {subject_type}")

            # insert info
            cursor.execute("""
                INSERT INTO MESSAGES (AdminSenderID, SenderID, AdminReceiverID, ReceiverID, Content, ProductID, OrderID, CreateDate, SubjectType)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, [admin_sender_id, sender_user_id, admin_receiver_id, receiver_user_id, content, product_id, order_id, timezone.now(), subject_type])


            connection.commit()
            return True
        except Exception as e:
            print(traceback.format_exc())
            return False
        
def get_messages_by_user_id(user_id):
    with connection.cursor() as cursor:
        try:
            cursor.execute("""
                 SELECT
                    m.MESSAGEID AS messageId,
                    COALESCE(sender_base.Email, admin_sender_base.Email) AS sender_email,
                    COALESCE(receiver_base.Email, admin_receiver_base.Email) AS receiver_email,
                    m.Content,
                    m.CreateDate,
                    COALESCE(p.Name, '') AS product_info,
                    COALESCE(o.OrderID, '') AS order_info,
                    m.SubjectType
                FROM MESSAGES m
                LEFT JOIN NORMALUSER s_normal ON m.SenderID = s_normal.UserID
                LEFT JOIN BASEUSER sender_base ON s_normal.base_user_id = sender_base.UserID
                LEFT JOIN ADMINUSER s_admin ON m.AdminSenderID = s_admin.UserID
                LEFT JOIN BASEUSER admin_sender_base ON s_admin.base_user_id = admin_sender_base.UserID
                LEFT JOIN NORMALUSER r_normal ON m.ReceiverID = r_normal.UserID
                LEFT JOIN BASEUSER receiver_base ON r_normal.base_user_id = receiver_base.UserID
                LEFT JOIN ADMINUSER r_admin ON m.AdminReceiverID = r_admin.UserID
                LEFT JOIN BASEUSER admin_receiver_base ON r_admin.base_user_id = admin_receiver_base.UserID
                LEFT JOIN PRODUCTS p ON m.ProductID = p.ProductID
                LEFT JOIN ORDERS o ON m.OrderID = o.OrderID
                WHERE s_normal.UserID = %s OR s_admin.UserID = %s OR r_normal.UserID = %s OR r_admin.UserID = %s
            """, [user_id, user_id, user_id, user_id])
            results = cursor.fetchall()
            print(f"Query executed successfully for User ID: {user_id}, results obtained: {len(results)}")
            messages = []
            for result in results:
                # Ensure that either sender or receiver is not NULL
                if result[1] is not None and result[2] is not None:
                    message = {
                        'messageId':result[0],
                        'sender_email': result[1],
                        'receiver_email': result[2],
                        'content': result[3],
                        'create_date': result[4].strftime("%Y-%m-%d %H:%M:%S") if result[3] else "",
                        'product_info': result[5],
                        'order_info': result[6],
                        'subject_type': result[7]
                    
                    }
                    messages.append(message)
            return messages
        except Exception as e:
            print(e)
            return []






def delete_message_by_id(message_id):
    with connection.cursor() as cursor:
        try:
            cursor.execute(""" 
    DELETE FROM MESSAGES WHERE MESSAGEID = %s

    """
        ,[message_id])
            connection.commit()
            return True
        except Exception as e:
            print(traceback.format_exc())
            return False

