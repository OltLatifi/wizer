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

# create
class SubjectView(generics.CreateAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class HomeworkView(generics.CreateAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# list
class SubjectListView(generics.ListAPIView):
    serializer_class = SubjectSerializer
    def get_queryset(self):
        queryset = Subject.objects.filter(user=self.request.user)
        return queryset


class HomeworkListView(generics.ListAPIView):
    serializer_class = HomeworkSerializer
    def get_queryset(self):
        queryset = Homework.objects.filter(user=self.request.user)
        return queryset


# update
class HomeworkUpdateView(generics.UpdateAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer
    

# delete
class HomeworkDeleteView(generics.DestroyAPIView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

class SubjectDeleteView(generics.DestroyAPIView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer


# authentication stuff

class custom_user_register(APIView):
    permission_classes = [AllowAny,]

    def post(self, request):
        serializer = register_serializer(data=request.data)
        if serializer.is_valid():
            new_user = serializer.save()
            if new_user:
                return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
