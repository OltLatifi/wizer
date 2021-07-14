from django.contrib import admin
from django.urls import path

from .views import SubjectView, HomeworkView, SubjectListView, HomeworkListView

urlpatterns = [
    path('subject/', SubjectView.as_view()),
    path('homework/', HomeworkView.as_view()),
    path('see-subject/', SubjectListView.as_view()),
    path('see-homework/', HomeworkListView.as_view()),
]
