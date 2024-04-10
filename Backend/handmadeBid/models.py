from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.hashers import make_password

class CustomUserManager(BaseUserManager):
    def create_user(self, Email, password=None, **extra_fields):
        if not Email:
            raise ValueError(_('The Email must be set'))
        Email = self.normalize_email(Email)
        user = self.model(Email=Email, **extra_fields)
        user.set_password(password)  
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        user = self.create_user(Email, password, **extra_fields)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)
        return user


class BaseUser(AbstractBaseUser, PermissionsMixin):
    UserID= models.AutoField(primary_key=True)
    Email = models.EmailField(_('email address'), unique=True, db_column='Email')
    Fname = models.CharField(max_length=25, db_column='Fname')
    Lname = models.CharField(max_length=25, db_column='Lname')
    # Password = models.CharField(max_length=255, db_column='Password')
    is_superuser = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    last_login = models.DateTimeField(('last login'), blank=True, null=True)

    objects = CustomUserManager()

    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['Fname', 'Lname']

    class Meta:
        db_table = 'BASEUSER'

    def __str__(self):
        return self.Email
    
   
class AdminUser(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE, related_name='admin_user')
    UserID= models.AutoField(primary_key=True,default=1)
    

    class Meta:
        db_table = 'ADMINUSER'

    def __str__(self):
        return self.base_user.Email


class NormalUser(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE)
    UserID= models.AutoField(primary_key=True)
    Username = models.CharField(max_length=50, unique=True, db_column='Username')
    DefaultAddressID = models.IntegerField(null=True, blank=True, db_column='DefaultAddressID')
    Phone = models.CharField(max_length=30, null=True, blank=True, db_column='Phone')
    Rate = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True, db_column='Rate')
    ManageID = models.ForeignKey(
    AdminUser, 
    on_delete=models.CASCADE, 
    related_name='managed_users',
    db_column='ManageID' 
)



    class Meta:
        db_table = 'NORMALUSER'

    def __str__(self):
          return self.base_user.Email

# manually create a admin user
#          user_id = 1  
#          admin_user = AdminUser(
#          UserID=user_id,
#          Fname='Admin',
#          Lname='Admin',
#          Email ='admin1@handmade.com'
#          Password=make_password('adminpassword')
#  )


# Message 
class Messages(models.Model):
    admin_sender = models.ForeignKey('AdminUser', on_delete=models.CASCADE, related_name='sent_admin_messages', null=True, blank=True)
    sender = models.ForeignKey('NormalUser', on_delete=models.CASCADE, related_name='sent_normal_messages', null=True, blank=True)
    admin_receiver = models.ForeignKey('AdminUser', on_delete=models.CASCADE, related_name='received_admin_messages', null=True, blank=True)
    receiver = models.ForeignKey('NormalUser', on_delete=models.CASCADE, related_name='received_normal_messages', null=True, blank=True)
    content = models.TextField()
    create_date = models.DateTimeField(auto_now_add=True)
    product = models.ForeignKey('Products', on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey('Orders', on_delete=models.SET_NULL, null=True)
    subject_type = models.CharField(max_length=10, choices=[('Product', 'Product'), ('Order', 'Order')],db_column='subject_type')
    
    class Meta:
        db_table = 'MESSAGES'






class Address(models.Model):
    addressid = models.AutoField(primary_key=True)  # Field name made lowercase.
    userid = models.ForeignKey('NormalUser', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    street = models.CharField(db_column='Street', max_length=255)  # Field name made lowercase.
    streeoptional = models.CharField(db_column='StreeOptional', max_length=255, blank=True, null=True)  # Field name made lowercase.
    city = models.CharField(db_column='City', max_length=100, blank=True, null=True)  # Field name made lowercase.
    state = models.CharField(db_column='State', max_length=100, blank=True, null=True)  # Field name made lowercase.
    zipcode = models.CharField(db_column='Zipcode', max_length=20, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'ADDRESS'

class Bidding(models.Model):
    biddingid = models.AutoField(primary_key=True)  # Field name made lowercase.
    productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='ProductID')  # Field name made lowercase.
    bidderid = models.ForeignKey('NormalUser', models.DO_NOTHING, db_column='BidderId')  # Field name made lowercase.
    bidprice = models.DecimalField(db_column='BidPrice', max_digits=7, decimal_places=2)  # Field name made lowercase.
    quantity = models.IntegerField(db_column='Quantity')  # Field name made lowercase.
    biddate = models.DateField(db_column='BidDate')  # Field name made lowercase.
    activedays = models.IntegerField(db_column='ActiveDays', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=8)  # Field name made lowercase.
    manageid = models.ForeignKey(AdminUser, models.DO_NOTHING, db_column='ManageID')  # Field name made lowercase.

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


# class Generates(models.Model):
#     userid = models.OneToOneField(AdminUser, models.DO_NOTHING, db_column='UserID', primary_key=True)  # Field name made lowercase.
#     reportid = models.ForeignKey('Report', models.DO_NOTHING, db_column='ReportID')  # Field name made lowercase.
#     generatedate = models.DateField(db_column='GenerateDate', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'GENERATES'
#         unique_together = (('userid', 'reportid'),)


# class Messages(models.Model):
#     messageid = models.IntegerField(db_column='MessageID', primary_key=True)  # Field name made lowercase.
#     adminsenderid = models.ForeignKey(AdminUser, models.DO_NOTHING, db_column='AdminSenderID', blank=True, null=True,related_name='sent_message')  # Field name made lowercase.
#     senderid = models.ForeignKey('NormalUser', models.DO_NOTHING, db_column='SenderID', blank=True, null=True,related_name='sent_message')  # Field name made lowercase.
#     adminreceiverid = models.ForeignKey(AdminUser, models.DO_NOTHING, db_column='AdminReceiverID', blank=True, null=True, related_name='received_message')  # Field name made lowercase.
#     receiverid = models.ForeignKey('NormalUser', models.DO_NOTHING, db_column='ReceiverID', blank=True, null=True, related_name='received_message')  # Field name made lowercase.
#     content = models.CharField(db_column='Content', max_length=1000, blank=True, null=True)  # Field name made lowercase.
#     createdate = models.DateField(db_column='CreateDate', blank=True, null=True)  # Field name made lowercase.
#     productid = models.ForeignKey('Products', models.DO_NOTHING, db_column='ProductID', blank=True, null=True)  # Field name made lowercase.
#     orderid = models.ForeignKey('Orders', models.DO_NOTHING, db_column='OrderID', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'MESSAGES'

class Orders(models.Model):
    orderid = models.AutoField(primary_key=True)  # Field name made lowercase.
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
    pictureid = models.AutoField(primary_key=True)  # Field name made lowercase.
    productid = models.IntegerField(db_column='ProductID', null=True)  # Field name made lowercase.
    picture = models.ImageField(upload_to='photos')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PICTURES'
        

class Products(models.Model):
    productid = models.AutoField(primary_key=True)  # Field name made lowercase.
    sellerid = models.ForeignKey(NormalUser, models.DO_NOTHING, db_column='SellerID')  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100, blank=True, null=True)  # Field name made lowercase.
    categoryid = models.ForeignKey(Category, models.DO_NOTHING, db_column='CategoryID')  # Field name made lowercase.
    description = models.CharField(db_column='Description', max_length=255, blank=True, null=True)  # Field name made lowercase.
    startprice = models.DecimalField(db_column='StartPrice', max_digits=7, decimal_places=2, blank=True, null=True)  # Field name made lowercase.
    pictureid = models.IntegerField(db_column='PictureID')  # Field name made lowercase.
    postdate = models.DateField(db_column='PostDate', blank=True, null=True)  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=8)  # Field name made lowercase.
    inventory = models.IntegerField(db_column='Inventory')  # Field name made lowercase.
    manageid = models.ForeignKey(AdminUser, models.DO_NOTHING, db_column='ManageID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'PRODUCTS'


# class Report(models.Model):
#     reportid = models.IntegerField(db_column='ReportID', primary_key=True)  # Field name made lowercase.
#     filepath = models.CharField(db_column='FilePath', max_length=2083, blank=True, null=True)  # Field name made lowercase.
#     updatedate = models.DateField(db_column='UpdateDate', blank=True, null=True)  # Field name made lowercase.

#     class Meta:
#         managed = False
#         db_table = 'REPORT'


class Reviews(models.Model):
    reviewid = models.AutoField(primary_key=True) # Field name made lowercase.
    reviewerid = models.ForeignKey(NormalUser, models.DO_NOTHING, db_column='ReviewerID', related_name='sent_review')  # Field name made lowercase.
    reviewertype = models.CharField(db_column='ReviewerType', max_length=6)  # Field name made lowercase.
    revieweeid = models.ForeignKey(NormalUser, models.DO_NOTHING, db_column='RevieweeID',related_name='get_review')  # Field name made lowercase.
    content = models.CharField(db_column='Content', max_length=1000, blank=True, null=True)  # Field name made lowercase.
    reviewdate = models.DateField(db_column='ReviewDate', blank=True, null=True)  # Field name made lowercase.
    productid = models.ForeignKey(Products, models.DO_NOTHING, db_column='ProductID', blank=True, null=True)  # Field name made lowercase.
    orderid = models.ForeignKey(Orders, models.DO_NOTHING, db_column='OrderID', blank=True, null=True)  # Field name made lowercase.
    rate = models.DecimalField(db_column='Rate', max_digits=2, decimal_places=1, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'REVIEWS'


class Shipment(models.Model):
    orderid = models.ForeignKey(Orders, models.DO_NOTHING, db_column='OrderID')  # Field name made lowercase.
    trackingnumber = models.CharField(db_column='TrackingNumber', max_length=50)  # Field name made lowercase.
    addressid = models.IntegerField(db_column='AddressID')  # Field name made lowercase.
    status = models.CharField(db_column='Status', max_length=17)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'SHIPMENT'
