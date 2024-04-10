# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Address(models.Model):
    addressid = models.IntegerField(db_column='AddressID', primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('Normaluser', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    street = models.CharField(db_column='Street', max_length=255)  # Field name made lowercase.
    streeoptional = models.CharField(db_column='StreeOptional', max_length=255, blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', max_length=100, blank=True, null=True)  # Field name made lowercase.
    state = models.CharField(db_column='State', max_length=100, blank=True, null=True)  # Field name made lowercase.
    zipcode = models.CharField(db_column='Zipcode', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ADDRESS'


class Adminuser(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    base_user = models.OneToOneField('Baseuser', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'ADMINUSER'


class AdminToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    admin_user_id = models.IntegerField()
    created = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'ADMIN_TOKEN'


class Baseuser(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    email = models.CharField(db_column='Email', unique=True, max_length=255)  # Field name made lowercase.
    password = models.CharField(db_column='Password', max_length=255)  # Field name made lowercase.
    fname = models.CharField(db_column='Fname', max_length=25, blank=True, null=True)  # Field name made lowercase.
    lname = models.CharField(db_column='Lname', max_length=25, blank=True, null=True)  # Field name made lowercase.
    is_active = models.IntegerField()
    is_staff = models.IntegerField()
    is_superuser = models.IntegerField()
    last_login = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'BASEUSER'


class Bidding(models.Model):
    biddingid = models.IntegerField(db_column='BiddingID', primary_key=True)  # Field name made lowercase.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='ProductID')  # Field name made lowercase.
    bidderid = models.ForeignKey('Normaluser', models.DO_NOTHING, db_column='BidderId')  # Field name made lowercase.
    bidprice = models.DecimalField(db_column='BidPrice', max_digits=7, decimal_places=2)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity')  # Field name made lowercase.
    biddate = models.DateField(db_column='BidDate')  # Field name made lowercase.
    activedays = models.IntegerField(db_column='ActiveDays', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=8)  # Field name made lowercase.
    manageid = models.ForeignKey(Adminuser, models.DO_NOTHING, db_column='ManageID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'BIDDING'


class Category(models.Model):
    categoryid = models.IntegerField(db_column='CategoryID', primary_key=True)  # Field name made lowercase.
    cname = models.CharField(db_column='CName', max_length=50, blank=True, null=True)  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'CATEGORY'


class Generates(models.Model):
    userid = models.OneToOneField(Adminuser, models.DO_NOTHING, db_column='UserID', primary_key=True)  # Field name made lowercase. The composite primary key (UserID, ReportID) found, that is not supported. The first column is selected.
    reportid = models.ForeignKey('Report', models.DO_NOTHING, db_column='ReportID')  # Field name made lowercase.
    generatedate = models.DateField(db_column='GenerateDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'GENERATES'
        unique_together = (('userid', 'reportid'),)


class Messages(models.Model):
    messageid = models.IntegerField(db_column='MessageID', primary_key=True)  # Field name made lowercase.
    adminsenderid = models.ForeignKey(Adminuser, models.DO_NOTHING, db_column='AdminSenderID', blank=True, null=True)  # Field name made lowercase.
    senderid = models.ForeignKey('Normaluser', models.DO_NOTHING, db_column='SenderID', blank=True, null=True)  # Field name made lowercase.
    adminreceiverid = models.ForeignKey(Adminuser, models.DO_NOTHING, db_column='AdminReceiverID', related_name='messages_adminreceiverid_set', blank=True, null=True)  # Field name made lowercase.
    receiverid = models.ForeignKey('Normaluser', models.DO_NOTHING, db_column='ReceiverID', related_name='messages_receiverid_set', blank=True, null=True)  # Field name made lowercase.
    content = models.CharField(db_column='Content', max_length=1000, blank=True, null=True)  # Field name made lowercase.
    createdate = models.DateField(db_column='CreateDate', blank=True, null=True)  # Field name made lowercase.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='ProductID', blank=True, null=True)  # Field name made lowercase.
    orderid = models.ForeignKey('Orders', models.DO_NOTHING, db_column='OrderID', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'MESSAGES'


class Normaluser(models.Model):
    userid = models.AutoField(db_column='UserID', primary_key=True)  # Field name made lowercase.
    base_user = models.OneToOneField(Baseuser, models.DO_NOTHING)
    username = models.CharField(db_column='Username', unique=True, max_length=50, blank=True, null=True)  # Field name made lowercase.
    defaultaddressid = models.IntegerField(db_column='DefaultAddressID', blank=True, null=True)  # Field name made lowercase.
    phone = models.CharField(db_column='Phone', max_length=30, blank=True, null=True)  # Field name made lowercase.
    rate = models.DecimalField(db_column='Rate', max_digits=2, decimal_places=1, blank=True, null=True)  # Field name made lowercase.
    manageid = models.ForeignKey(Adminuser, models.DO_NOTHING, db_column='ManageID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'NORMALUSER'


class Orders(models.Model):
    orderid = models.IntegerField(db_column='OrderID', primary_key=True)  # Field name made lowercase.
    biddingid = models.ForeignKey(Bidding, models.DO_NOTHING, db_column='BiddingID')  # Field name made lowercase.
    orderdate = models.DateField(db_column='OrderDate', blank=True, null=True)  # Field name made lowercase.
    orderstatus = models.CharField(db_column='OrderStatus', max_length=10)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ORDERS'


class Payment(models.Model):
    orderid = models.OneToOneField(Orders, models.DO_NOTHING, db_column='OrderID', primary_key=True)  # Field name made lowercase.
    paymentstatus = models.CharField(db_column='PaymentStatus', max_length=9)  # Field name made lowercase.
    paymentmethod = models.CharField(db_column='PaymentMethod', max_length=17)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PAYMENT'


class Pictures(models.Model):
    pictureid = models.IntegerField(db_column='PictureID', primary_key=True)  # Field name made lowercase.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='ProductID')  # Field name made lowercase.
    picture = models.CharField(db_column='Picture', max_length=2083, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PICTURES'


class Products(models.Model):
    productid = models.IntegerField(db_column='ProductID', primary_key=True)  # Field name made lowercase.
    sellerid = models.ForeignKey(Normaluser, models.DO_NOTHING, db_column='SellerID')  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    categoryid = models.ForeignKey(Category, models.DO_NOTHING, db_column='CategoryID')  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)  # Field name made lowercase.
    startprice = models.DecimalField(db_column='StartPrice', max_digits=7, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    pictureid = models.IntegerField(db_column='PictureID')  # Field name made lowercase.
    postdate = models.DateField(db_column='PostDate', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=8)  # Field name made lowercase.
    inventory = models.IntegerField(db_column='Inventory')  # Field name made lowercase.
    manageid = models.ForeignKey(Adminuser, models.DO_NOTHING, db_column='ManageID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCTS'


class Report(models.Model):
    reportid = models.IntegerField(db_column='ReportID', primary_key=True)  # Field name made lowercase.
    filepath = models.CharField(db_column='FilePath', max_length=2083, blank=True, null=True)  # Field name made lowercase.
    updatedate = models.DateField(db_column='UpdateDate', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REPORT'


class Reviews(models.Model):
    reviewid = models.IntegerField(db_column='ReviewID', primary_key=True)  # Field name made lowercase.
    reviewerid = models.ForeignKey(Normaluser, models.DO_NOTHING, db_column='ReviewerID')  # Field name made lowercase.
    reviewertype = models.CharField(db_column='ReviewerType', max_length=6)  # Field name made lowercase.
    revieweeid = models.ForeignKey(Normaluser, models.DO_NOTHING, db_column='RevieweeID', related_name='reviews_revieweeid_set')  # Field name made lowercase.
    content = models.CharField(db_column='Content', max_length=1000, blank=True, null=True)  # Field name made lowercase.
    reviewdate = models.DateField(db_column='ReviewDate', blank=True, null=True)  # Field name made lowercase.
    productid = models.ForeignKey(Products, models.DO_NOTHING, db_column='ProductID', blank=True, null=True)  # Field name made lowercase.
    orderid = models.ForeignKey(Orders, models.DO_NOTHING, db_column='OrderID', blank=True, null=True)  # Field name made lowercase.
    rate = models.DecimalField(db_column='Rate', max_digits=2, decimal_places=1, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REVIEWS'


class Shipment(models.Model):
    orderid = models.OneToOneField(Orders, models.DO_NOTHING, db_column='OrderID', primary_key=True)  # Field name made lowercase.
    trackingnumber = models.CharField(db_column='TrackingNumber', max_length=50)  # Field name made lowercase.
    addressid = models.IntegerField(db_column='AddressID')  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=17)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SHIPMENT'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class AuthtokenToken(models.Model):
    key = models.CharField(primary_key=True, max_length=40)
    created = models.DateTimeField()
    user_id = models.BigIntegerField(unique=True)

    class Meta:
        managed = False
        db_table = 'authtoken_token'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user_id = models.BigIntegerField()

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
