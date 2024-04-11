-- drop procedure
drop procedure if exists GetReviews;
drop procedure  if exists GetHistoryOrders;
drop procedure if exists GetProducts;

-- drop triggers
drop trigger if exists rate_update;
drop trigger if exists check_quantity;


-- drop Views if they exist
drop view if exists ORDERSVIEW;
drop view if exists AVGSELLPRICE;
drop view if exists BESTSELL;


-- drop tables
drop table   if exists ADMIN_TOKEN
drop  table  if exists MESSAGES;
drop  table  if exists REVIEWS;
drop  table  if exists  SHIPMENT;
drop  table  if exists  PAYMENT;

drop  table  if exists ORDERS;
drop  table  if exists BIDDING;
drop  table  if exists PICTURES;
drop  table  if exists PRODUCTS;
drop  table  if exists ADDRESS;
drop  table  if exists NORMALUSER ;
drop  table  if exists GENERATES;
drop  table  if exists REPORT;
drop  table  if exists CATEGORY;
drop  table  if exists ADMINUSER;

DROP TABLE IF EXISTS BASEUSER;









