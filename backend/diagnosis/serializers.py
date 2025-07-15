from rest_framework import serializers
from .models import DiagnosisImage, CustomUser, Prediction
from django.contrib.auth.hashers import make_password

class DiagnosisImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiagnosisImage
        fields = '__all__'
        
# for fetching Prediction data
class PredictionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prediction
        fields = '__all__'
        read_only_fields = ['user']


class RegisterSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ['email', 'password', 'role', 'full_name']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        full_name = validated_data.pop('full_name')  # remove before passing to create_user
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            username=validated_data['email'],
            password=validated_data['password'],
            role=validated_data['role'],
        )
        user.first_name = full_name
        user.save()
        return user


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)
