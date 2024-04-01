from django.db import models
# Create your models here.
from django.db import models
from django.contrib.auth.hashers import make_password, check_password
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):
    def create_user(self, Email, password=None, **extra_fields):
        if not Email:
            raise ValueError(_('The Email must be set'))
        Email = self.normalize_email(Email)
        user = self.model(Email=Email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, Email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)
        return self.create_user(Email, password, **extra_fields)

class NormalUser(AbstractBaseUser, PermissionsMixin):
    UserID = models.BigAutoField(primary_key=True, default=1)
    Email = models.EmailField(_('email address'), unique=True, db_column='Email')
    Fname = models.CharField(max_length=25, db_column='Fname')
    Lname = models.CharField(max_length=25, db_column='Lname')
    Username = models.CharField(max_length=50, unique=True, db_column='Username')
    DefaultAddressID = models.IntegerField(null=True, blank=True, db_column='DefaultAddressID')
    Phone = models.CharField(max_length=30, null=True, blank=True, db_column='Phone')
    Rate = models.DecimalField(max_digits=3, decimal_places=1, null=True, blank=True, db_column='Rate')
    ManageID = models.ForeignKey('AdminUser', on_delete=models.CASCADE)
    is_superuser = models.BooleanField(default=False)
    last_login = None

    objects = CustomUserManager()

    USERNAME_FIELD = 'Email'
    REQUIRED_FIELDS = ['Username']

    class Meta:
        db_table = 'NORMALUSER'

    def __str__(self):
        return self.Username
    

    def __str__(self):
        return self.Username 
    


class AdminUser(models.Model):
    UserID = models.AutoField(primary_key=True)
    Fname = models.CharField(max_length=25)
    Lname = models.CharField(max_length=25)
    Password = models.CharField(max_length=255)

    class Meta:
        db_table = 'ADMINUSER'

# manually create a admin user
#          user_id = 1  # 您需要确定这个ID是唯一的
#          admin_user = AdminUser(
#          UserID=user_id,
#          Fname='Admin',
#          Lname='Admin',
#          Password=make_password('adminpassword')
#  )