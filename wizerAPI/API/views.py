# tools
from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny, IsAuthenticated

# needed for data
from django.contrib.auth.models import User
from .serializers import SubjectSerializer, HomeworkSerializer, register_serializer
from .models import Subject, Homework

# authentication stuff
from django.contrib.auth import login
from rest_framework.authtoken.serializers import AuthTokenSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken



class SubjectView(generics.CreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


class HomeworkView(generics.CreateAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer


class SubjectListView(generics.ListAPIView):
    queryset = Homework.objects.all()
    serializer_class = SubjectSerializer


class HomeworkListView(generics.ListAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer


class custom_user_register(APIView):
    permission_classes = [AllowAny,]

    def post(self, request):
        serializer = register_serializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class blacklist_token_view(APIView):
    permission_classes = [AllowAny,]

    def post(self, request):
        try:
            refresh_token = request.data.get['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except:
            return Response(status=status.HTTP_400_BAD_REQUEST)