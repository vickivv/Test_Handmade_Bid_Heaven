-- 1.Find products with no bids (products 4, 6, 7 have no bids). 
select *
from products
where status='Active' 
and not exists (select ProductID
				from Bidding
                where products.ProductID=Bidding.ProductID);

-- 2. Query all auction items that are currently marked as active (product 1 and 2 are sold out).
select *
from products
where status='Active';

-- 3. Find all products posted by a specific seller, identified by their seller id (e.g. SellerID = 21 posted 2 products). 
select p1.ProductID, p1.Name, p1.Description, p1.StartPrice, p1.PostDate, p2.Picture, c.CName as Category
from products p1
join category c on p1.CategoryID = c.CategoryID
join pictures p2 on p1.ProductID = p2.ProductID
where SellerID = 21;

/* 4. For every auction item that is currently pending and belongs to a specific seller (e.g. SellerID=24), 
retrieve all bid prices, quantities and the information of producrts and bidders. For each product, rank these
information from higher bid price to lower bid price.*/
with br as(select b.ProductID, p.Name as ProductName, b.BidPrice, b.Quantity, u.Username as BidderName, u.Rate as BidderRate,
rank() over(partition by b.ProductID order by b.BidPrice desc, b.Quantity desc) 
from bidding b
join normaluser u on b.BidderID = u.UserID
join products p on b.ProductID = p.ProductID
where b.status='Pending' and p.SellerID=24)
select ProductID, ProductName, BidPrice, Quantity, BidderName, BidderRate
from br;

-- 5. List information of all closed auctions with a final bid amount less than a specified price (e.g. 20).
select distinct p.ProductID, p.Name as ProductName, c.CName as Category, p.Description, p.postDate, pic.Picture
from Products p
join Bidding b on p.ProductID=b.ProductID
join Category c on c.CategoryID=p.CategoryID
left join Pictures pic on pic.ProductID=p.ProductID
where b.Status='Accepted' and b.BidPrice < 20;

-- 6. For each auction item of a specific seller (e.g. SelerID=21), show the number of bids made. 
select ProductID, count(*) as BidNum
from bidding
where ProductID in (select ProductID
from products
where SellerID = 21)
group by ProductID;

-- 7. List all the auction items that a user (e.g. userId=27) has won and show the order status.
select OrderID, OrderDate, OrderStatus, ProductID, ProductName, SellingPrice, Quantity, TotalAmount, SellerID
from ORDERSVIEW
where BuyerID = 27;

-- 8. List all orders that are processing for specific buyer (e.g. UserID=26). 
select OrderID, OrderDate, OrderStatus, ProductID
from ORDERSVIEW
where BuyerID = 26 and OrderStatus='Processing';

-- 9. Calculate the average auction price for specific seller(e.g. SellerID = 21). 
select round(avg(BidPrice), 2) as Average_BidPrice
from bidding b
where exists (select * 
				from orders
                where b.BiddingID = orders.BiddingID)
and ProductID in (select ProductID
					from products
                    where SellerID = 21);
                    
-- 10. Show the total sales (orders whose status is delivered or completed) for specific seller(e.g. SellerID = 21). 
select sum(TotalAmount) as TotalSale
from ORDERSVIEW
where SellerID=21 and OrderStatus in ('Delivered', 'Completed');

-- 11. Find a report created at a specific date(e.g.2024-01-02).
select ReportID, FilePath
from report
where ReportID in (select ReportID
					from generates
                    where generatedate='2024-01-02');

-- 12. List the top 3 best-selling products (order status shows Delivered or Completed)
with cte as (select ProductID, sum(Quantity) as TotalQuantity
from bidding b
where exists (select BiddingID
				from orders o
				where b.BiddingID = o.BiddingID and o.OrderStatus in ('Delivered', 'Completed'))
group by ProductID)
select cte.ProductID, p.Name, p.Description, p.StartPrice, c.CName, cte.TotalQuantity, p.PostDate
from cte, products p, category c
where cte.ProductID = p.ProductID and p.CategoryID = c.CategoryID
order by TotalQuantity desc
Limit 3;

-- 13. Find out how many orders have been made by specific seller(e.g. SellerID = 21).
select count(*) as TotalOrders
from ORDERSVIEW
where OrderStatus in ('Shipped', 'Delivered', 'Completed') and SellerID=21;

/* 14. Determine the most popular category for auction items
(defined as the category whose items have the highest total sale quantity)*/ 
select Category
from (select Category, sum(Quantity) as CategoryQuantity
		from ORDERSVIEW
		group by category
		order by 2 desc
		Limit 1) t;
        
-- 15. Find review content and reviewerType for a specific seler (e.g. SellerId=21).
select Content
from reviews
where RevieweeID=21; 

-- 16. Find all review contents and reviewers' username for a product. 
select r.Content, n.Username
from reviews r, normaluser n
where r.ProductID=1 and Content is not null and ReviewerType='Buyer' and r.ReviewerID=n.UserID;

/* 17. For a specific seller(e.g. SellerID=21), find the id and total sale amount of all his products  
with a sale amount larger than 5 and arrange them for higher amount to lower amount. */
select ProductID, sum(Quantity) as TotalSales
from ORDERSVIEW
where SellerID=21
group by ProductID
having sum(Quantity) > 5
order by sum(Quantity) desc;

/* 18. Find products under a speciic Category(e.g. 'Ceramics and Glass') that meet the following requirement:
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