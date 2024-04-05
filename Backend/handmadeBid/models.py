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
    UserID= models.BigAutoField(primary_key=True)
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
    UserID= models.BigAutoField(primary_key=True,default=1)
    

    class Meta:
        db_table = 'ADMINUSER'

    def __str__(self):
        return self.base_user.Email


class NormalUser(models.Model):
    base_user = models.OneToOneField(BaseUser, on_delete=models.CASCADE)
    UserID= models.BigAutoField(primary_key=True)
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
#          user_id = 1  # 您需要确定这个ID是唯一的
#          admin_user = AdminUser(
#          UserID=user_id,
#          Fname='Admin',
#          Lname='Admin',
#          Email ='admin1@handmade.com'
#          Password=make_password('adminpassword')
#  )