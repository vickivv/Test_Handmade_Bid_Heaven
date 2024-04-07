from rest_framework import serializers
from .models import NormalUser,AdminUser,BaseUser
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate
import logging


class NormalUserSerializer(serializers.ModelSerializer):
    Email = serializers.EmailField(write_only=True)  
    Fname = serializers.CharField(write_only=True) 
    Lname = serializers.CharField(write_only=True)  
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = NormalUser
        fields = ['Username', 'Email', 'Fname', 'Lname', 'password', 'Phone', 'DefaultAddressID', 'Rate', 'ManageID']
        extra_kwargs = {
            'password': {'write_only': True},
            'ManageID': {'required': False},
            'Email': {'write_only': True},
            'Fname': {'write_only': True},
            'Lname': {'write_only': True},
        }

    def create(self, validated_data):
        # Extract base user data
        base_user_data = {
            'Email': validated_data.pop('Email', None),
            'Fname': validated_data.pop('Fname', None),
            'Lname': validated_data.pop('Lname', None),
            'password': validated_data.pop('password', None),
        }
        
        # Create BaseUser
        base_user = BaseUser.objects.create_user(
            Email=base_user_data['Email'], 
            password=base_user_data['password'],
            Fname=base_user_data['Fname'],
            Lname=base_user_data['Lname']
        )
        
        # If ManageID is not provided, assign a default one.
        manage_id = validated_data.get('ManageID')
        if not manage_id:
            default_admin = AdminUser.objects.first()
            if default_admin:
                validated_data['ManageID'] = default_admin
            else:
                raise serializers.ValidationError("No AdminUser available to assign as ManageID.")

        # Create NormalUser with the remaining data and link to the created BaseUser.
        normal_user = NormalUser.objects.create(base_user=base_user, **validated_data)
        
        return normal_user




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        try:
            user = NormalUser.objects.get(Username=username)
            if check_password(password, user.base_user.Password):  # Assuming Password is stored in BaseUser
                data["user"] = user
            else:
                raise serializers.ValidationError("Invalid username or password.")
        except NormalUser.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password.")

        return data


    
class AdminUserSerializer(serializers.ModelSerializer):
    Fname = serializers.CharField(source='base_user.Fname')
    Lname = serializers.CharField(source='base_user.Lname')
    Email = serializers.EmailField(source='base_user.Email')
    Password = serializers.CharField(source='base_user.Password', write_only=True)

    class Meta:
        model = AdminUser
        fields = ['Fname', 'Lname', 'Email', 'Password']

    def create(self, validated_data):
        base_user_data = validated_data.pop('base_user', None)
        password = base_user_data.pop('Password', None)
        admin_user = AdminUser.objects.create(**validated_data)
        if base_user_data:
            base_user = BaseUser.objects.create(**base_user_data, is_superuser=False, is_staff=True)
            if password:
                base_user.set_password(password)
                base_user.save()
            admin_user.base_user = base_user
            admin_user.save()
        return admin_user

class AdminLoginSerializer(serializers.Serializer):
    Email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        Email = data.get("Email")
        password = data.get("password")

        try:
            admin_user = AdminUser.objects.get(base_user__Email=Email)
            if check_password(password, admin_user.base_user.password):
                data["user"] = admin_user
            else:
                raise serializers.ValidationError("Invalid email or password.")
        except AdminUser.DoesNotExist:
            raise serializers.ValidationError("Invalid email or password.")

        return data
