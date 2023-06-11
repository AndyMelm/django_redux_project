from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.views import (
    PasswordResetView,
    PasswordResetDoneView,
    PasswordResetConfirmView,
    PasswordResetCompleteView,
)
from django.views.generic.base import RedirectView
from . import views

urlpatterns = [
    path('', views.index),
    path("login/", TokenObtainPairView.as_view()),
    path("reset_password/", PasswordResetView.as_view(), name="reset_password"),
    path("reset_password_sent/", PasswordResetDoneView.as_view(),name="password_reset_done"),
    path("reset/<uidb64>/<token>/", PasswordResetConfirmView.as_view(),name="password_reset_confirm"),
    path("reset_password_complete/", RedirectView.as_view(url="http://localhost:3000/login/"), name="password_reset_complete"),
    path('register/', views.register),
    path('journal/', views.JournalView.as_view()),
    path('journal/<pk>/', views.JournalView.as_view()),
    path('get_user_id/', views.get_user_id),

    
    
]
