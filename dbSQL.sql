-- 1.Find products with no bids (products 4, 6, 7 have no bids). 
select *
from products
where status='Active' 
and not exists (select ProductID
				from Bidding
                where products.ProductID=Bidding.ProductID);
                
select * 
from products
where status ='Active';

-- 2. Find the product information, category name and cover picture of all ‘Active’ products of a specific seller (e.g. seller_id = 3).
select p1.ProductID, p1.Name, p1.Description, p1.StartPrice, p1.PostDate, p2.Picture, c.CName as Category
from products p1
join category c on p1.CategoryID = c.CategoryID
join pictures p2 on p1.PictureID = p2.PictureID
where SellerID = 3 and status='Active';

/* 3. For every bid that is currently pending and belongs to a specific seller(e.g. seller_id=4), 
retrieve all bid prices, quantities and the information of products and bidders*/
with br as(select b.ProductID, p.Name as ProductName, b.BidPrice, b.Quantity, u.Username as BidderName, u.Rate as BidderRate,
rank() over(partition by b.ProductID order by b.BidPrice desc, b.Quantity desc) 
from bidding b
join normaluser u on b.BidderID = u.UserID
join products p on b.ProductID = p.ProductID
where b.status='Pending' and p.SellerID=4)
select ProductID, ProductName, BidPrice, Quantity, BidderName, BidderRate
from br;

-- 4. Find the number of bids for each product of a specific seller (e.g. seller_id=1).
select ProductID, count(*) as BidNum
from bidding
where ProductID in (select ProductID
from products
where SellerID = 1)
group by ProductID;

-- 5. Find the four most recent bids of a specific user (e.g. user_id=1 as seller).
select *
from bidding
where ProductID in (select ProductID
					from products
                    where SellerID = 1)
order by BidDate desc
limit 4;

-- 6. Find the four most recent orders of a specific user (e.g. user_id=1 as seller).
select OrderID, OrderDate, OrderStatus, Picture, ProductName
from ORDERSVIEW
where SellerID=1
order by OrderDate desc
limit 4;

-- 7.List all orders that are waiting for payment by a specific buyer  (e.g. UserID=1). 
select OrderID, OrderDate, OrderStatus, ProductID
from ORDERSVIEW
where BuyerID = 1 and OrderStatus='Pending';

-- 8. Calculate the average auction price for specific seller(e.g. SellerID = 1). 
select round(avg(BidPrice), 2) as Average_BidPrice
from bidding b
where exists (select * 
				from orders
                where b.BiddingID = orders.BiddingID)
and ProductID in (select ProductID
					from products
                    where SellerID = 1);
                    
-- 9. Show the total sales for specific seller(e.g. SellerID = 1). 
select sum(TotalAmount) as TotalSale
from ORDERSVIEW
where SellerID=1;

-- 10. List the top 3 best-selling products of a specific seller(e.g. seller_id=1).
with cte as (
	select ProductID, sum(Quantity) as TotalQuantity
	from bidding b
	where exists (select BiddingID
					from orders o
					where b.BiddingID = o.BiddingID)
	group by ProductID
)

select cte.ProductID, p.Name, p.Description, p.StartPrice, c.CName, cte.TotalQuantity, p.PostDate
from cte, products p, category c
where cte.ProductID = p.ProductID and p.CategoryID = c.CategoryID and p.SellerID=1
order by TotalQuantity desc
Limit 3;

-- 11. Find out how many orders have been made by specific seller(e.g. SellerID = 1).
select count(*) as TotalOrders
from ORDERSVIEW
where SellerID=1;

-- 12. Find all bids made for a product (e.g. productid = 8) of a specific seller and arrange them from higher price to lower price.
select *
from bidding
where ProductID = 8
order by BidPrice;

-- 13. Find all messages received by a specific user (e.g. user_id=1).
select *
from messages
where ReceiverID=1;

-- 14. Get the number of active products of a seller(e.g. seller_id=3).
select count(*)
from products
where SellerID=3 and status = 'Active';

-- 15. Find the best sale category of a specific seller(e.g. seller_id=1).
select Category
from (select Category, sum(Quantity) as CategoryQuantity
		from ORDERSVIEW
        where SellerId=1
		group by category) t;

/* 16. For a specific seller(e.g. SellerID=1), find the id and total sale amount of all his products  
with a sale amount larger than 3 and arrange them for higher amount to lower amount. */
select ProductID, sum(Quantity) as TotalSales
from ORDERSVIEW
where SellerID=1
group by ProductID
having sum(Quantity) > 3
order by sum(Quantity) desc;

/* 17. Find products under a speciic Category(e.g. 'Ceramics and Glass') that meet the following requirement:
(1) seller's rate higher than 4; (2) startprice lower than a specific amount (e.g. 30); (3) sale amount 
higher than a specific amount (e.g. 2). Order the result by seller's rate, then by sale amount. */
with cte as(select ProductID, sum(Quantity) as TotalSales
			from ORDERSVIEW
            where Category = 'Ceramics and Glass'
            group by ProductID
            having sum(Quantity) >=2)
select cte.ProductID, p.Name as ProductName, p.SellerID, p.StartPrice, n.Rate as SellerRate, cte.TotalSales
from cte
join products p on cte.ProductID = p.ProductID
join normaluser n on p.SellerID = n.UserID
where n.Rate >= 4.0 and StartPrice <= 30
order by n.Rate desc, TotalSales desc;