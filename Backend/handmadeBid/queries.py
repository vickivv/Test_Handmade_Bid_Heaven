from django.db import connection

def get_all_orders(userID):
    with connection.cursor() as cursor:
        cursor.execute("SELECT ProductName, OrderStatus, SellingPrice, SellerID, OrderID, Picture FROM ordersview WHERE BuyerID = %s", [userID])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_orders_by_status(userID, status):
    with connection.cursor() as cursor:
        cursor.execute("SELECT ProductName, OrderStatus, SellingPrice, SellerID, OrderID, Picture FROM ordersview WHERE BuyerID = %s AND OrderStatus = %s", [userID, status])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]

def get_order_details(order_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT o.OrderID, o.SellerID , o.OrderDate, o.TotalAmount, o.OrderStatus, o.ProductName, "
                       "o.ProductID, o.SellingPrice, s.TrackingNumber, s.Status, o.Picture FROM ordersview o "
                       "JOIN shipment s ON s.OrderID = o.OrderID "
                       "WHERE o.OrderID = %s", [order_id])
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


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


def get_overview_order():
    with connection.cursor() as cursor:
        cursor.execute("SELECT o.OrderID, o.ProductName, o.OrderStatus, pi.Picture FROM PRODUCTS p "
                       "JOIN ordersview o ON o.ProductID=p.ProductID "
                       "JOIN PICTURES pi ON p.PictureID = pi.PictureID ORDER BY o.OrderDate DESC LIMIT 4")
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]


def get_overview_bid():
    with connection.cursor() as cursor:
        cursor.execute("SELECT p.Name, b.Status, b.BiddingID FROM BIDDING b JOIN PRODUCTS p ON b.ProductID=p.PRODUCTID ORDER BY BidDate DESC LIMIT 4")
        columns = [col[0] for col in cursor.description]
        return [dict(zip(columns, row)) for row in cursor.fetchall()]