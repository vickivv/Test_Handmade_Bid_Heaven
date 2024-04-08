



-- create tables


CREATE TABLE BASEUSER (
    UserID INT NOT NULL AUTO_INCREMENT,
    Email VARCHAR(255) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    Fname VARCHAR(25),
    Lname VARCHAR(25),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    is_staff BOOLEAN NOT NULL DEFAULT FALSE,
    is_superuser BOOLEAN NOT NULL DEFAULT FALSE,
    last_login DATETIME NULL,
    PRIMARY KEY (UserID)
);
-- Adminuser and normal user tables have already created, if migrate before


CREATE TABLE ADMINUSER (
    UserID INT NOT NULL AUTO_INCREMENT,
    base_user_id INT UNIQUE NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (base_user_id) REFERENCES BASEUSER(UserID) ON DELETE CASCADE
);


create table REPORT(
	ReportID int not null auto_increment primary key ,
    FilePath varchar(2083),
    UpdateDate date
);

create table GENERATES(
	UserID int not null,
    ReportID int not null,
    GenerateDate date, 
    foreign key (UserID) references ADMINUSER(UserID),
    foreign key (ReportID) references REPORT(ReportID),
    primary key (UserID, ReportID)
);

CREATE TABLE NORMALUSER (
    UserID INT NOT NULL AUTO_INCREMENT,
    base_user_id INT UNIQUE NOT NULL,
    Username VARCHAR(50) UNIQUE,
    DefaultAddressID INT,
    Phone VARCHAR(30),
    Rate DECIMAL(2, 1),
    ManageID INT NOT NULL,
    PRIMARY KEY (UserID),
    FOREIGN KEY (base_user_id) REFERENCES BASEUSER(UserID) ON DELETE CASCADE,
    FOREIGN KEY (ManageID) REFERENCES ADMINUSER(UserID) ON DELETE CASCADE
);


create table ADDRESS (
	AddressID int not null primary key AUTO_INCREMENT,
	Fname varchar(25),
	Lname varchar(25),
    UserID int not null,
    Street varchar(255) not null,
    StreetOptional varchar(255),
    City varchar(100),
    State varchar(100),
    Zipcode varchar(20),
    foreign key (UserID) references NORMALUSER(UserID)
);

create table CATEGORY (
	CategoryID int not null primary key,
    CName varchar(50),
    Description varchar(255)
);

create table PRODUCTS (
	ProductID int not null auto_increment primary key,
    SellerID int not null,
    Name varchar(100),
    CategoryID int not null,
    Description varchar(255),
    StartPrice decimal(7, 2),
    PictureID int not null,
    PostDate date,
    Status enum('Active', 'Sold out') not null,
    Inventory int not null,
    ManageID int not null,
    foreign key (CategoryID) references CATEGORY(CategoryID),
    foreign key (SellerID) references NORMALUSER(UserID),
    foreign key (ManageID) references ADMINUSER(UserID)
);

create table PICTURES (
	PictureID int not null auto_increment primary key,
    ProductID int,
    Picture varchar(2083),
    foreign key (ProductID) references PRODUCTS(ProductID)
);

create table BIDDING (
	BiddingID int not null primary key AUTO_INCREMENT,
    ProductID int not null,
    BidderId int not null,
    BidPrice decimal(7, 2) not null,
    Quantity int not null,
    BidDate date not null,
    ActiveDays int,
    Status enum('Pending', 'Accepted', 'Rejected', 'Canceled', 'Expired') not null,
    ManageID int not null,
    foreign key (ProductID) references PRODUCTS(ProductID),
    foreign key (BidderID) references NORMALUSER(UserID),
    foreign key (ManageID) references ADMINUSER(UserID)
);

create table ORDERS (
	OrderID int not null primary key AUTO_INCREMENT,
    BiddingID int not null,
    OrderDate date,
    OrderStatus enum('Pending', 'Processing', 'Shipped', 'Delivered', 'Completed', 'Canceled', 'Refunded', 'Failed') not null,
    foreign key (BiddingID) references BIDDING(BiddingID)
);

create table SHIPMENT (
	OrderID int not null primary key,
    TrackingNumber varchar(50) not null,
    AddressID int not null,
    Status enum('Awaiting Shipment', 'Shipped', 'In Transit', 'Out for Delivery', 'Delivered', 'Delayed', 'Returned') not null,
    foreign key (OrderID) references ORDERS(OrderID)
);

create table PAYMENT (
	OrderID int not null primary key,
    PaymentStatus enum('Pending', 'Completed', 'Failed', 'Canceled', 'Refunding', 'Refunded') not null,
    -- PaymentMethod enum('Credit/Debit card', 'E-Wallet', 'Check') not null,
    PaymentMethod enum('Credit/Debit card', 'Paypal') not null,
	foreign key (OrderID) references ORDERS(OrderID)
);

create table MESSAGES(
	MessageID int not null primary key,
    AdminSenderID int,
    SenderID int,
    AdminReceiverID int,
    ReceiverID int,
    Content varchar(1000),
    CreateDate date,
    ProductID int,
    OrderID int,
    foreign key (AdminSenderID) references ADMINUSER(UserID),
    foreign key (SenderID) references NORMALUSER(UserID),
    foreign key (AdminReceiverID) references ADMINUSER(UserID),
    foreign key (ReceiverID) references NORMALUSER(UserID),
    foreign key (ProductID) references PRODUCTS(ProductID),
    foreign key (OrderID) references ORDERS(OrderID)
);

create table REVIEWS (
	ReviewID int not null primary key AUTO_INCREMENT,
    ReviewerID int not null,
    ReviewerType enum('Seller', 'Buyer') not null,
    RevieweeID int not null,
    Content varchar(1000),
    ReviewDate date,
    ProductID int,
    OrderID int,
    Rate decimal(2, 1),
    foreign key (ReviewerID) references NORMALUSER(UserID),
    foreign key (RevieweeID) references NORMALUSER(UserID),
    foreign key (ProductID) references PRODUCTS(ProductID),
    foreign key (OrderID) references ORDERS(OrderID)
);

CREATE TABLE ADMIN_TOKEN (
  `key` VARCHAR(40) NOT NULL,
  `admin_user_id` INT NOT NULL,
  `created` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (`key`),
  CONSTRAINT `fk_admin_user` FOREIGN KEY (`admin_user_id`) REFERENCES `ADMINUSER` (`UserID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


-- create view
-- orders view: OrderID, BiddingID, ProductID, PCategory, SellerID, BuyerID, SellingPrice, Quantity, TotalAmount, OrderDate, OrderStatus, ManageID
-- average selling price view: ProductID, Category, AvgPrice, SellerID
-- best selling view: ProductID, TotalQuantity, TotalProfit, Category, SellerID
create view ORDERSVIEW as
select o.OrderID, b.BiddingID, p.ProductID, p.Name as ProductName, c.CName as Category, p.SellerID, b.BidderID as BuyerID, b.BidPrice as SellingPrice, b.Quantity, b.BidPrice * b.Quantity as TotalAmount, o.OrderDate, o.OrderStatus, b.ManageID, pic.Picture
from ORDERS o join BIDDING b on o.BiddingID = b.BiddingID
	 join PRODUCTS p on b.ProductID = p.ProductID
     join CATEGORY c on c.CategoryID = p.CategoryID
     join PICTURES pic on p.PictureID = pic.PictureID
;
create view AVGSELLPRICE as
select ProductID, Category, avg(SellingPrice), SellerID
from ORDERSVIEW
group by ProductID
;
create view BESTSELL as
select ProductID, sum(Quantity) as TotalQuantity, sum(TotalAmount) as TotalProfit, Category, SellerID
from ORDERSVIEW
where OrderStatus = 'Shipped' or OrderStatus = 'Delivered' or OrderStatus = 'Completed'
group by ProductID
order by TotalQuantity
;


-- create triggers
-- update user's rate when a new rate on this user is made
-- check if the quantity in a new bidding is less or equal to the inventory
delimiter $$

create trigger rate_update
after insert on REVIEWS
for each row
begin
	update NORMALUSER
    set Rate = (
        select avg(rate)
        from REVIEWS
        where RevieweeID = new.RevieweeID
    )
    where UserID = new.RevieweeID;
end$$

create trigger check_quantity
before insert on BIDDING
for each row
begin 
	declare availableInventory INT;
    select inventory into availableInventory
    from PRODUCTS
    where ProductID = new.ProductID;

    if NEW.quantity > availableInventory then
        signal sqlstate '45000' set message_text = 'The quantity of the bid exceeds available inventory.';
    end if;
end$$

delimiter ;

-- create procedures
-- get all reviews from buyer on a particular product based on ProductID
-- get history orders that belongs to a particular buyer based on UserID
-- get all products that belongs to a particular seller based on UserID
DELIMITER $$

create procedure GetReviews(in ProID int)
begin
    select Content, ReviewDate
    from REVIEWS
    where ProductID = ProID and ReviewerType = 'Buyer';
end$$

create procedure GetHistoryOrders(in id int)
begin
	select OrderID, ProductID, TotalAmount, OrderDate
    from ORDERSVIEW
    where BuyerID = id and (OrderStatus != 'Canceled' or OrderStatus != 'Refunded' or OrderStatus != 'Failed');
end$$

create procedure GetProducts(in id int)
begin
	select *
    from PRODUCTS
    where SellerID = id;
end$$

DELIMITER ;


