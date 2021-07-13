from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Subject, Homework

from rest_framework.response import Response
from django.contrib.auth import authenticate


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = "__all__"

class HomeworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Homework
        fields = "__all__"
    
    # overiding this class to show the value of the subject field and not just the id
    # since the serializer relationships were'nt working
    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['subject'] = SubjectSerializer(instance.subject).data
        return rep



# jwt login
class user_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')



class register_serializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if instance is not None:
            instance.set_password(password)
        instance.save()
        return instance


class login_serializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Incorrect Credentials")

