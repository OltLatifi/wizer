from django.contrib import admin
from django.urls import path

from .views import (
    SubjectView,
    HomeworkView,
    SubjectListView,
    HomeworkListView,
    HomeworkUpdateView,
    HomeworkDeleteView,
    SubjectDeleteView,

    custom_user_register,
    )

urlpatterns = [
    # users
    path('register/', custom_user_register.as_view()),
    # path('logout/', blacklist_token_view.as_view()),
    # evrything else
    path('subject/', SubjectView.as_view()),
    path('homework/', HomeworkView.as_view()),
    path('update-homework/<int:pk>', HomeworkUpdateView.as_view()),
    path('delete-homework/<int:pk>', HomeworkDeleteView.as_view()),
    path('see-subject/', SubjectListView.as_view()),
    path('delete-subject/<int:pk>', SubjectDeleteView.as_view()),
    path('see-homework/', HomeworkListView.as_view()),
]
