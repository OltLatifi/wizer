from django.contrib import admin
from django.urls import path

from .views import SubjectView, HomeworkView

urlpatterns = [
    path('subject/', SubjectView.as_view()),
    path('homework/', HomeworkView.as_view()),
]
