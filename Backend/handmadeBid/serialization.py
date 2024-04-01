from rest_framework import serializers
from .models import NormalUser,AdminUser
from django.contrib.auth.hashers import make_password,check_password
from django.contrib.auth import authenticate
import logging



class NormalUserSerializer(serializers.ModelSerializer):
    Password = serializers.CharField(write_only=True)

    class Meta:
        model = NormalUser
        fields = [ 'Fname', 'Lname', 'Username', 'Password', 'Email', 'Phone', 'DefaultAddressID', 'Rate', 'ManageID']
        extra_kwargs = {
            'Password': {'write_only': True},
            'ManageID': {'required': False},
    
        }

    def create(self, validated_data):
        password = validated_data.pop('Password', None)

        # Check if ManageID is provided
        manage_id = validated_data.get('ManageID', None)
        if not manage_id:
            # Here, choose a default AdminUser. This is just an example.
            # You might want to implement a more sophisticated logic.
            default_admin = AdminUser.objects.first()
            if default_admin:
                validated_data['ManageID'] = default_admin
            else:
                # Handle the case where no AdminUser exists
                # This could involve raising an error or creating a new AdminUser
                raise serializers.ValidationError("No AdminUser available to assign as ManageID.")
            

        user = NormalUser(** validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def validate_Email(self, value):
        if NormalUser.objects.filter(Email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def validate_Username(self, value):
        if NormalUser.objects.filter(Username=value).exists():
            raise serializers.ValidationError("A user with that username already exists.")
        return value




class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        username = data.get("username")
        password = data.get("password")

        try:
            user = NormalUser.objects.get(Username=username)  
            if check_password(password, user.Password):
                data["user"] = user
            else:
                raise serializers.ValidationError("Invalid username or password.")
        except NormalUser.DoesNotExist:
            raise serializers.ValidationError("Invalid username or password.")

        return data

    
class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdminUser
        fields = ['UserID', 'Fname', 'Lname', 'Password']

    def validate_Password(self, value):
     
        return value