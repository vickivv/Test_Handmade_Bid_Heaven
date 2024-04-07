-- insert values into adminuser table (adminuser's id starts with '1')



INSERT INTO ADMINUSER (UserID, Fname, Lname, Email,Password) VALUES
(11, 'Alice', 'Johnson', 'alice@gmailcom' ,  'password123'),
(12, 'Bob', 'Smith', 'bob@gmailcom' ,'password456'),
(13, 'Charlie', 'Miller','miller@gmailcom' , 'password789'),
(14, 'Diana', 'Ross', 'ross@gmailcom' ,'password012'),
(15, 'Evan', 'Wright', 'evan@gmailcom' ,'password345'),
(16, 'Fiona', 'Gallagher', 'fiona@gmailcom' ,'password678'),
(17, 'George', 'Clooney', 'george@gmailcom' ,'password901');

ALTER TABLE NORMALUSER MODIFY COLUMN is_superuser BOOLEAN NOT NULL DEFAULT 0;



-- insert values into report table
INSERT INTO REPORT (ReportID, FilePath, UpdateDate) VALUES
(1, '/reports/report01.pdf', null),
(2, '/reports/report02.pdf', null),
(3, '/reports/report03.pdf',  null),
(4, '/reports/report04.pdf', null),
(5, '/reports/report05.pdf', null),
(6, '/reports/report06.pdf', null),
(7, '/reports/report07.pdf', null);
-- when update a report, update the value of 'UpdateDate' column
update report 
set updatedate = curdate()
where ReportID = 1;

-- insert values into generates table
INSERT INTO GENERATES (UserID, ReportID, GenerateDate) VALUES
(11, 1, '2024-01-02'),
(12, 2, '2024-01-02'),
(13, 3, '2024-02-02'),
(14, 4, '2024-02-16'),
(15, 5, '2024-03-02'),
(16, 6, '2024-03-16'),
(17, 7, '2024-04-02');

-- insert values into normaluser table (normal user's id starts with '2') 
INSERT INTO NORMALUSER (UserID, Fname, Lname, Username, Password, DefaultAddressID, Email, Phone, Rate, ManageID) VALUES
(21, 'Harry', 'Potter', 'hpotter', 'magic123', 1, 'harry@hogwarts.com', '1234567890', 0.0, 11),
(22, 'Ron', 'Weasley', 'rweasley', 'magic456', 2, 'ron@hogwarts.com', '2345678901', 0.0, 12),
(23, 'Hermione', 'Granger', 'hgranger', 'magic789', 3, 'hermione@hogwarts.com', '3456789012', 0.0, 13),
(24, 'Draco', 'Malfoy', 'dmalfoy', 'magic012', 4, 'draco@hogwarts.com', '4567890123', 0.0, 14),
(25, 'Luna', 'Lovegood', 'llovegood', 'magic345', 5, 'luna@hogwarts.com', '5678901234', 0.0, 15),
(26, 'Neville', 'Longbottom', 'nlongbottom', 'magic678', 6, 'neville@hogwarts.com', '6789012345', 0.0, 16),
(27, 'Ginny', 'Weasley', 'gweasley', 'magic901', 7, 'ginny@hogwarts.com', '7890123456', 0.0, 17);

-- insert values into address table 
INSERT INTO ADDRESS (AddressID, Fname, Lname, UserID, Street, StreetOptional, City, State, Zipcode) VALUES
(1, 'Harry', 'Potter', 21, '4 Privet Drive', null, 'Little Whinging', 'Surrey', '12345'),
(2, 'Ron', 'Weasley', 22, 'The Burrow', null, 'Ottery St Catchpole', 'Devon', '23456'),
(3, 'Hermione', 'Granger', 23, 'Hogwarts Castle', 'Room 11', 'Hogsmeade', 'Highlands', '34567'),
(4, 'Draco', 'Malfoy', 24, 'Malfoy Manor', null, 'Wiltshire', null, '45678'),
(5, 'Luna', 'Lovegood', 25, 'Lovegood House', null, 'Near Ottery St Catchpole', 'Devon', '56789'),
(6, 'Neville', 'Longbottom', 26, 'Longbottom House', null, 'London', null, '67890'),
(7, 'Ginny', 'Weasley', 27, 'Weasley’s Wizard Wheezes', null, 'Diagon Alley', 'London', '78901'),
(8, 'Ginny', 'Weasley', 27, '7224 Ohio St.', null, 'Deer Park', 'NY', '11729'),
(9, 'Ron', 'Weasley', 27, '243 James Court', null, 'Oak Park', 'MI', '48237');

-- insert values into category table 
INSERT INTO CATEGORY (CategoryID, CName, Description) VALUES
(1, 'Ceramics and Glass', 'Hand crafts made with ceramics or glasses.'),
(2, 'Paper Crafts', 'Hand crafts made with paper, such as orgami.'),
(3, 'Yarn and Fiber Crafts', 'Hand knitted crafts such as crochet artwork.'),
(4, 'Upcycling Crafts', 'Eco-friendly handicrafts made from recycled waste'),
(5, 'Decorative Crafts', 'Crafts whose aim is the design and manufacture of objects that are both beautiful and functional.'),
(6, 'Fashion Crafts', 'Handmade clothing, jewelry and other fashion products.'),
(7, 'Miscellaneous Crafts', 'Other handicrafts that cannot be classified into the above categories.');

-- insert values into products table
INSERT INTO PRODUCTS (ProductID, SellerID, Name, CategoryID, Description, StartPrice, PictureID, PostDate, Status, Inventory, ManageID) VALUES
(1, 21, 'Stained Glass Flowers', 1, 'Stained glass flowers inspired by beautiful fall foliage', 20.0, 1, '2024-01-01', 'Active', 10, 11),
(2, 21, 'Blue Butterfly Lady', 1, 'Stained glass artwork', 30.0, 2, '2024-02-01', 'Active', 5, 11),
(3, 22, 'Bird Brooch', 1, 'Blue Heritage handmade ceramic floral Bird Brooch', 19.0, 3, '2024-02-01', 'Active', 30, 11),
(4, 22, 'Sunflower Butterflies', 2, '9 inch Sunflower Butterflies', 5.0, 4, '2024-02-05', 'Active', 100, 12),
(5, 23, 'Bunny', 3, 'Crochet Bunny Rabbit', 10.0, 5, '2024-02-05', 'Active', 4, 13),
(6, 23, 'Teddy Bear', 3, 'Classic Crochet Teddy Bear', 15.0, 8, '2024-02-10', 'Active', 5, 13),
(7, 24, 'Silk Scarf', 5, 'Gold Dust Wildflower Silk Scarf', 48.0, 9, '2024-03-01', 'Active', 3, 14),
(8, 24, 'Pink Scarf', 5, 'Kalee Handwoven Scarf', 35.0, 10, '2024-03-10', 'Active', 10, 14);

-- insert values into pictures table
INSERT INTO PICTURES (PictureID, ProductID, Picture) VALUES
(1, 1, 'https://i.etsystatic.com/25421725/r/il/b8ae25/3863459011/il_1588xN.3863459011_glv8.jpg'),
(2, 2, 'https://i.etsystatic.com/6706558/r/il/4d71b6/5080059054/il_1588xN.5080059054_4bgk.jpg'),
(3, 3, 'https://i.etsystatic.com/13026407/r/il/0090ef/3101972265/il_1588xN.3101972265_r8c1.jpg'),
(4, 4, 'https://i.etsystatic.com/37047015/r/il/c29484/4609730318/il_1588xN.4609730318_5wv9.jpg'),
(5, 5, 'https://i.etsystatic.com/15528295/r/il/35c9d7/4225269669/il_1588xN.4225269669_9741.jpg'),
(6, 6, 'https://i.etsystatic.com/17382265/r/il/961ad4/2791862567/il_1588xN.2791862567_o5rk.jpg'),
(7, 6, 'https://i.etsystatic.com/17382265/r/il/961ad4/2791862567/il_1588xN.2791862567_o5rk.jpg'),
(8, 6, 'https://i.etsystatic.com/17382265/r/il/961ad4/2791862567/il_1588xN.2791862567_o5rk.jpg'),
(9, 7, '/images/silk.jpg'),
(10, 8, 'https://i.etsystatic.com/24987188/r/il/54622a/2721384059/il_1588xN.2721384059_e1pd.jpg');

-- insert values into bidding table
INSERT INTO BIDDING (BiddingID, ProductID, BidderId, BidPrice, Quantity, BidDate, ActiveDays, Status, ManageID) VALUES
(1, 1, 27, 25.00, 2, '2024-01-11', 7, 'Pending', 11),
(2, 1, 26, 22.00, 8, '2024-01-16', 7, 'Pending', 11),
(3, 8, 25, 45.00, 2, '2024-03-12', 7, 'Pending', 14),
(4, 2, 24, 40.00, 4, '2024-02-02', 7, 'Pending', 11),
(5, 2, 25, 45.00, 1, '2024-02-16', 7, 'Pending', 11),
(6, 3, 27, 20.00, 2, '2024-03-02', 7, 'Pending', 11),
(7, 5, 27, 11.00, 2, '2024-03-12', 7, 'Pending', 13),
(8, 5, 26, 10.50, 1, '2024-03-12', 7, 'Pending', 13),
(9, 8, 21, 40.0, 1, '2024-03-13', 7, 'Pending', 14),
(10, 8, 27, 40.0, 2, '2024-03-14', 8, 'Pending', 14);

set SQL_SAFE_UPDATES = 0;
delete from orders;
-- insert values into orders table (meanwhile update bidding status)
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES (1, 1, '2024-01-16', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 1;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(2, 2, '2024-01-16', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 2;
update products
set status = 'Sold out'
where ProductID = 1;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(3, 5, '2024-02-20', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 5;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(4, 4, '2024-02-08', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 4;
update products
set status = 'Sold out'
where ProductID = 2;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(5, 6, '2024-03-05', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 6;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(6, 7, '2024-03-18', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 7;
INSERT INTO ORDERS (OrderID, BiddingID, OrderDate, OrderStatus) VALUES(7, 8, '2024-03-18', 'Processing');
update bidding 
set status = 'Accepted'
where BiddingID = 8;

-- insert values into shipment table (meanwhile update order status)
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (1, 'TRACK123', 7, 'Delivered');
update orders
set orderstatus = 'Delivered'
where OrderID = 1;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (2, 'TRACK222', 6, 'Delivered');
update orders
set orderstatus = 'Delivered'
where OrderID = 2;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (3, 'TRACK789', 5, 'Delivered');
update orders
set orderstatus = 'Delivered'
where OrderID = 3;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (4, 'TRACK012', 4, 'Delivered');
update orders
set orderstatus = 'Delivered'
where OrderID = 4;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (5, 'TRACK345', 7, 'Delivered');
update orders
set orderstatus = 'Delivered'
where OrderID = 5;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (6, 'TRACK678', 7, 'Returned');
update orders
set orderstatus = 'Refunded'
where OrderID = 6;
INSERT INTO SHIPMENT (OrderID, TrackingNumber, AddressID, Status) VALUES (7, 'TRACK901', 6, 'Awaiting Shipment');

-- insert values into payment table
INSERT INTO PAYMENT (OrderID, PaymentStatus, PaymentMethod) VALUES
(1, 'Completed', 'Credit/Debit card'),
(2, 'Completed', 'E-Wallet'),
(3, 'Completed', 'Check'),
(4, 'Completed', 'Credit/Debit card'),
(5, 'Completed', 'E-Wallet'),
(6, 'Refunded', 'Check'),
(7, 'Completed', 'Credit/Debit card');

-- insert values into messages table
INSERT INTO MESSAGES (MessageID, AdminSenderID, SenderID, AdminReceiverID, ReceiverID, Content, CreateDate, ProductID, OrderID) VALUES
(1, 11, NULL, NULL, 27, 'Welcome to the wizarding marketplace!', '2024-01-01', NULL, NULL),
(2, NULL, 27, 11, NULL, 'Thank you! Excited to be here.', '2024-01-02', NULL, NULL),
(3, NULL, 21, NULL, 27, 'Interested in the Stained Glass Flowers?', '2024-01-10', 1, NULL),
(4, NULL, 27, NULL, 21, 'Yes, is it still available?', '2024-01-10', 1, NULL),
(5, NULL, 25, NULL, 21, 'Do you have more Stained Glass Flowers in stock?', '2024-01-16', 1, NULL),
(6, 11, NULL, NULL, 27, 'Your order has been shipped.', '2024-01-18', NULL, 1),
(7, NULL, 27, 11, NULL, 'Thank you for the update!', '2024-01-19', NULL, 1);

-- insert values into reviews table
INSERT INTO REVIEWS (ReviewID, ReviewerID, ReviewerType, RevieweeID, Content, ReviewDate, ProductID, OrderID, Rate) VALUES
(1, 27, 'Buyer', 21, 'Great seller, fast delivery.', '2024-01-21', 1, 1, 5.0),
(2, 21, 'Seller', 27, 'Prompt payment, excellent buyer.', '2024-01-21', 1, 1, 5.0),
(3, 26, 'Buyer', 21, 'Item as described, highly recommend.', '2024-02-01', 1, 2, 4.3),
(4, 21, 'Seller', 26, 'Great communication, a pleasure to do business with.', '2024-02-02', 1, 2, 4.5),
(5, 25, 'Buyer', 21, 'Fast shipping, item exactly as described.', '2024-03-10', 2, 3, 4.8),
(6, 27, 'Buyer', 23, 'Had issues with the product, but the seller resolved them quickly.', '2024-04-01', 5, 6, 3.9),
(7, 21, 'Seller', 25, 'Quick payment, highly recommend this buyer.', '2024-03-11', 2, 3, 5.0),
(8, 27, 'Buyer', 22, 'Not in good quality.', '2024-03-20', 3, 5, 3.5);