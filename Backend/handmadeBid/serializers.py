from rest_framework import serializers
from .models import Pictures


class PictureSerializer(serializers.ModelSerializer):
    class Meta:
        model=Pictures
        image_url=Pictures.picture.url
        serialized_data={
            'image_url': image_url
        }